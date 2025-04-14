import { create } from "zustand";
import { WaitingList, WaitingListEntry } from "./types";

const useStore = create<{
  waitingList: WaitingList | null;
  setWaitingList: (newWaitingList: WaitingList) => void;
  requestError: string | null;
  setRequestError: (error: string | null) => void;
  addWaitingListEntry: (newWaitingListEntry: WaitingListEntry) => void;
}>()((set) => ({
  waitingList: null,
  requestError: null,
  setWaitingList: (newWaitingList: WaitingList) =>
    set(() => ({
      waitingList: newWaitingList,
    })),
  setRequestError: (error: string | null) =>
    set(() => {
      return {
        requestError: error,
      };
    }),
  addWaitingListEntry: (newWaitingListEntry: WaitingListEntry) =>
    set((state) => {
      const currentEntries = state.waitingList?.entries || [];
      return {
        ...state,
        waitingList: {
          ...(state.waitingList || {}),
          entries: [...currentEntries, newWaitingListEntry],
        } as WaitingList,
      };
    }),
}));

export default useStore;
