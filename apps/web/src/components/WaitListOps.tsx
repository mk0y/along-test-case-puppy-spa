"use client";

import { WaitingList } from "@/types";
import PuppyForm from "./PuppyForm";
import WaitingListEntries from "./WaitingListEntries";
import { useCallback } from "react";
import useStore from "@/store";

export default function WaitListOps({
  todaysList,
}: {
  todaysList: WaitingList;
}) {
  const { waitingList } = useStore();
  const currentList = useCallback(() => {
    return todaysList;
  }, [todaysList]);
  return todaysList.id ? (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PuppyForm waitingListId={todaysList.id.toString()} />
        </div>
        <div className="lg:col-span-2">
          <WaitingListEntries
            waitingList={todaysList}
            waitingListEntries={todaysList.entries}
          />
        </div>
      </div>
    </>
  ) : null;
}
