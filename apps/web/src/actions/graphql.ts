"use server";

import { WaitingList, WaitingListEntry } from "@/types";
import {
  CREATE_WAITING_LIST_MUTATION,
  GET_ENTRIES_BY_WAITING_LIST_ID,
  GET_WAITING_LIST_BY_DATE,
} from "./queries";

const API_ENDPOINT = process.env.GRAPHQL_API_ENDPOINT!;
if (!API_ENDPOINT) {
  throw new Error("Missing API endpoint");
}

async function executeGraphQLQuery<T>(
  query: string,
  variables?: Record<string, any>,
  path?: string
): Promise<T> {
  const response = await fetch(`${API_ENDPOINT}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  // Return empty result if nothing was found
  let data = await response.json();
  if (!data.data) return [] as T;

  return path ? getNestedProperty(data.data, path) : data.data;
}

function getNestedProperty(obj: any, path: string): any {
  return path.split(".").reduce((prev, curr) => prev && prev[curr], obj);
}

// export async function fetchWaitingListsEntries(
//   variables?: Record<string, any>
// ): Promise<WaitingListEntry[]> {
//   const query = GET_ENTRIES_BY_WAITING_LIST_ID;
//   return executeGraphQLQuery<WaitingListEntry[]>(query, variables, "findByWaitingListId");
// }

export async function fetchTodaysWaitingList(
  variables?: Record<string, any>
): Promise<WaitingList> {
  const today = new Date().toISOString().split("T")[0] as string;
  const query = GET_WAITING_LIST_BY_DATE(today);
  return executeGraphQLQuery<WaitingList>(query, variables, "getByDate");
}

export async function createWaitingList(
  variables: Record<string, any>
): Promise<WaitingList> {
  const query = CREATE_WAITING_LIST_MUTATION(variables.date);
  return executeGraphQLQuery<WaitingList>(query, variables, "create");
}

// export async function fetchWaitingListById(
//   variables?: Record<string, any>
// ): Promise<WaitingList> {
//   const query = GET_WAITING_LIST_BY_ID;
//   return executeGraphQLQuery<WaitingList>(query, variables, "getById");
// }
