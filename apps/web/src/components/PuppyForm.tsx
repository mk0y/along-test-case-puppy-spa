// src/app/components/PuppyForm.tsx
"use client";

import { useCallback, useTransition, useState } from "react";
import { createWaitingListEntry } from "@/actions/graphql";
import useStore from "@/store";
import { cn } from "@/lib/utils";

export default function PuppyForm() {
  const [isPending, startTransition] = useTransition();
  const waitingList = useStore((state) => state.waitingList);
  const addWaitingListEntry = useStore((state) => state.addWaitingListEntry);
  const [formData, setFormData] = useState({
    puppyName: "",
    ownerName: "",
    serviceRequested: "",
  });

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!waitingList) return;
      startTransition(async () => {
        const entries = waitingList.entries ?? [];
        const waitingListEntry = await createWaitingListEntry({
          waitingListId: waitingList.id,
          position: entries.length + 1,
          createdAt: new Date().toISOString(),
          ownerName: formData.ownerName,
          puppyName: formData.puppyName,
          serviceRequested: formData.serviceRequested,
          arrivalTime: new Date().toISOString(),
        });
        addWaitingListEntry(waitingListEntry);
        setFormData({
          puppyName: "",
          ownerName: "",
          serviceRequested: "",
        });
      });
    },
    [formData, waitingList, addWaitingListEntry, startTransition]
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Puppy</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Puppy Name
            </label>
            <input
              type="text"
              value={formData.puppyName}
              onChange={(e) =>
                setFormData({ ...formData, puppyName: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Owner Name
            </label>
            <input
              type="text"
              value={formData.ownerName}
              onChange={(e) =>
                setFormData({ ...formData, ownerName: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Service Requested:
          </label>
          <textarea
            value={formData.serviceRequested}
            onChange={(e) =>
              setFormData({ ...formData, serviceRequested: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
          />
        </div>
        <button
          disabled={isPending}
          type="submit"
          onClick={handleSubmit}
          className={cn(
            "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
            {
              "opacity-50 cursor-not-allowed": isPending,
            }
          )}
        >
          Add to Waiting List
        </button>
      </form>
    </div>
  );
}
