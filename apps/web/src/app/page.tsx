// src/app/page.tsx
import {
  fetchEntriesByWaitingListId,
  fetchWaitingListByDate,
} from "@/actions/waitingList";
import DashboardLayout from "../components/layout/DashboardLayout";
import WaitingList from "@/components/WaitingList";
import PuppyForm from "@/components/PuppyForm";
import DaySelector from "@/components/DaySelector";
import Button from "@/components/ui/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@/lib/icons";

const today = new Date().toISOString().split("T")[0] as string;

export default async function Home() {
  // Date format: 2025-04-13
  const waitingList = await fetchWaitingListByDate(today);
  const entries = await fetchEntriesByWaitingListId(waitingList.id);
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button>
            <ChevronLeftIcon className="w-4 h-4" /> Prev
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">
            Today's Waiting List
          </h1>
          <Button>
            <ChevronRightIcon className="w-4 h-4" /> Next
          </Button>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              0 Waiting
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              0 Served
            </span>
          </div>
        </div>

        <DaySelector initialDate={waitingList?.date} />

        {entries.length > 0 ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <PuppyForm waitingListId={waitingList.id.toString()} />
              </div>
              <div className="lg:col-span-2">
                <WaitingList
                  waitingList={waitingList}
                  waitingListEntries={entries}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p>No waiting list created for today yet.</p>
            <p>Please select a date and create a new waiting list.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
