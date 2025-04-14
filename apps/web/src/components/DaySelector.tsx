// src/app/components/DaySelector.tsx
"use client";

import { createWaitingList } from "@/actions/graphql";
import { useCallback, useTransition, useState } from "react";
import { Drawer } from "vaul";
import useStore from "@/store";
import { cn } from "@/lib/utils";

const currentDate = new Date().toISOString().split("T")[0];

export default function DaySelector() {
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const setWaitingList = useStore((state) => state.setWaitingList);
  const requestError = useStore((state) => state.requestError);
  const setRequestError = useStore((state) => state.setRequestError);

  const handleCreateNewDay = useCallback(async () => {
    startTransition(async () => {
      try {
        const response = await createWaitingList({ date: selectedDate });
        setWaitingList(response);
      } catch (error: unknown) {
        setRequestError((error as Error)?.message);
        setTimeout(() => {
          setRequestError(null);
        }, 2000);
      }
    });
  }, [selectedDate, startTransition, setWaitingList]);

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
        <Drawer.Root open={!!requestError}>
          <Drawer.Trigger
            disabled={isPending}
            onClick={handleCreateNewDay}
            className={cn(
              "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
              {
                "opacity-50 cursor-not-allowed": isPending,
              }
            )}
          >
            Create new list
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
              <div className="p-4 bg-white rounded-t-[10px] flex-1">
                <div
                  aria-hidden
                  className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"
                />
                <div className="max-w-md mx-auto">
                  <Drawer.Title className="font-medium mb-4 text-gray-900 text-red-500">
                    Error occurred
                  </Drawer.Title>
                  <p className="text-gray-600 mb-2">{requestError}</p>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
    </div>
  );
}
