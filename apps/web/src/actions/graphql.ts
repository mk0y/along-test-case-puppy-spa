"use server";

import { Puppy, WaitingList, WaitingListEntry } from "@/types";
import {
  CREATE_PUPPY_MUTATION,
  CREATE_WAITING_ENTRY,
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

export async function fetchTodaysWaitingList(
  variables?: Record<string, any>
): Promise<WaitingList> {
  const today = new Date().toISOString().split("T")[0] as string;
  const query = GET_WAITING_LIST_BY_DATE(today);
  try {
    const waitingList = await executeGraphQLQuery<WaitingList>(
      query,
      variables,
      "getByDate"
    );
    const waitingEntries = await executeGraphQLQuery<WaitingListEntry[]>(
      GET_ENTRIES_BY_WAITING_LIST_ID(waitingList.id),
      variables,
      "findByWaitingListId"
    );
    return { ...waitingList, entries: waitingEntries };
  } catch (error) {
    throw (error as Error).message;
  }
}

export async function createWaitingList(
  variables: Record<string, any>
): Promise<WaitingList> {
  const query = CREATE_WAITING_LIST_MUTATION(variables.date);
  try {
    const result = await executeGraphQLQuery<WaitingList>(
      query,
      variables,
      "createWaitingList"
    );
    if (result.id) {
      return result;
    }
    throw new Error("Waiting list already exists");
  } catch (error) {
    throw (error as Error).message;
  }
}

export async function createWaitingListEntry(
  variables: Record<string, any>
): Promise<WaitingListEntry> {
  const query = CREATE_WAITING_ENTRY(
    variables.waitingListId,
    variables.position,
    variables.createdAt
  );
  const puppyQuery = CREATE_PUPPY_MUTATION({
    ownerName: variables.ownerName,
    puppyName: variables.puppyName,
    serviceRequested: variables.serviceRequested,
    arrivalTime: variables.arrivalTime,
    waitingListId: variables.waitingListId,
  });
  try {
    const entryResult = await executeGraphQLQuery<WaitingListEntry>(
      query,
      variables,
      "createWaitingListEntry"
    );
    const puppyResult = await executeGraphQLQuery<Puppy>(
      puppyQuery,
      variables,
      "createPuppy"
    );
    return { ...entryResult, puppy: puppyResult };
  } catch (error) {
    throw (error as Error).message;
  }
}
