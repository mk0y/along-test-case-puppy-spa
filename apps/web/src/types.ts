export interface Puppy {
  id: number;
  arrivalTime: Date;
  ownerName: string;
  puppyName: string;
  serviceRequested: string;
  serviced: boolean;
}

export interface WaitingList {
  id: number;
  date: string;
  createdAt: Date;
  entries: WaitingListEntry[];
}

export interface WaitingListEntry {
  id: number;
  position: number;
  createdAt: Date;
  waitingList: WaitingList;
  puppy: Puppy;
}
