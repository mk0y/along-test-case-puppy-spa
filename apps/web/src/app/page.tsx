// src/app/page.tsx
import { fetchTodaysWaitingList } from "@/actions/graphql";
import DashboardLayout from "../components/layout/DashboardLayout";
import DaySelector from "@/components/DaySelector";
import Button from "@/components/ui/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@/lib/icons";
import NoWaitLists from "@/components/NoWaitLists";
import WaitListOps from "@/components/WaitListOps";

export default async function Home() {
  const waitingList = await fetchTodaysWaitingList();
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

        <DaySelector />
        <WaitListOps todaysList={waitingList} />
        <NoWaitLists />
      </div>
    </DashboardLayout>
  );
}
