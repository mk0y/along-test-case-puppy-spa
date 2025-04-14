// src/app/components/DaySelector.tsx
"use client";

import { useState } from "react";
// import { graphqlRequest } from '../lib/graphqlClient';

export default function DaySelector({ initialDate }: { initialDate?: string }) {
  const [selectedDate, setSelectedDate] = useState(
    initialDate || new Date().toISOString().split("T")[0]
  );

  const handleCreateNewDay = async () => {
    // try {
    //   const { createWaitingList } = await graphqlRequest(CREATE_WAITING_LIST_MUTATION, {
    //     date: selectedDate,
    //   });
    //   onDateSelect(selectedDate);
    // } catch (error) {
    //   console.error('Error creating waiting list:', error);
    // }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex items-baseline gap-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-1 block rounded-md border-gray-500 shadow-md px-1.5 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={handleCreateNewDay}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create New Day
        </button>
      </div>
    </div>
  );
}
