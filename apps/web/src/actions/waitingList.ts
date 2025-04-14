"use server";

import { WaitingList, WaitingListEntry } from "@/types";

const API_ENDPOINT = process.env.GRAPHQL_API_ENDPOINT!;
if (!API_ENDPOINT) {
  throw new Error("Missing API endpoint");
}

export async function fetchWaitingLists(
  query: string,
  variables?: Record<string, any>
): Promise<WaitingList[]> {
  const response = await fetch(`${API_ENDPOINT}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any auth headers if needed
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

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  return data.data.waitingLists;
}

export async function fetchWaitingListByDate(
  date: string
): Promise<WaitingList> {
  const query = `
    query GetWaitingListByDate {
      getByDate(date: "${date}") {
        id
        date
        createdAt
      }
    }
  `;
  const response = await fetch(`${API_ENDPOINT}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any auth headers if needed
      // 'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
    }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  return data.data.getByDate;
}

export async function fetchEntriesByWaitingListId(
  waitingListId: number
): Promise<WaitingListEntry[]> {
  const query = `
    query GetEntriesByWaitingList {
      findByWaitingListId(waitingListId: ${waitingListId}) {
        id
        position
        puppy {
          id
          ownerName
          arrivalTime
          puppyName
          serviceRequested
          serviced
        }
        waitingList {
          id
          date
          createdAt
        }
      }
    }
  `;
  const response = await fetch(`${API_ENDPOINT}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any auth headers if needed
      // 'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      query,
    }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  return data.data.findByWaitingListId;
}
