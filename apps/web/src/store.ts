import { create } from "zustand";
import { WaitingList } from "./types";

const useStore = create<{
  waitingList: WaitingList[];
  addWaitingList: (newWaitingList: WaitingList) => void;
}>()((set) => ({
  waitingList: [],
  addWaitingList: (newWaitingList: WaitingList) =>
    set((state) => ({
      waitingList: [...state.waitingList, newWaitingList],
    })),
}));

export default useStore;
