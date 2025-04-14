"use client";

import useStore from "../store";

export default function NoWaitLists() {
  const waitingList = useStore((state) => state.waitingList);
  return !waitingList || !waitingList.id ? (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <p>No waiting list created for today yet.</p>
      <p>Please select a date and create a new waiting list.</p>
    </div>
  ) : null;
}
