export const GET_ENTRIES_BY_WAITING_LIST_ID = (waitingListId: number) => `
  query GetEntriesByWaitingList {
    findByWaitingListId(waitingListId: ${waitingListId}) {
      id
      position
      puppy {
        id
        ownerName
        arrivalTime
        puppyName
        serviceRequested
        serviced
      }
      waitingList {
        id
        date
        createdAt
      }
    }
  }
`;

export const CREATE_WAITING_LIST_MUTATION = (date: string) => `
  mutation CreateWaitingList {
    createWaitingList(input: {date: "${date}"}) {
      id
      date
    }
  }`;

export const CREATE_WAITING_ENTRY = (
  waitingListId: number,
  position: number,
  createdAt: string
) => `
mutation CreateEntries {
  createWaitingListEntry(
    input: {position: ${position}, createdAt: "${createdAt}"}
    waitingListId: ${waitingListId}
  ) {
    id
    position
    createdAt
  }
}`;

export const CREATE_PUPPY_MUTATION = ({
  ownerName,
  puppyName,
  serviceRequested,
  arrivalTime,
  waitingListId,
}: {
  ownerName: string;
  puppyName: string;
  serviceRequested: string;
  arrivalTime: string;
  waitingListId: number;
}) => `
  mutation CreatePuppy {
    createPuppy(input: {ownerName: "${ownerName}", puppyName: "${puppyName}", serviceRequested: "${serviceRequested}", arrivalTime: "${arrivalTime}"}, waitingListId: ${waitingListId}) {
      id
      ownerName
      arrivalTime
      puppyName
      serviceRequested
    }
  }`;

export const GET_WAITING_LIST_BY_DATE = (date: string) => `
  query GetWaitingListByDate {
    getByDate(date: "${date}") {
      id
      date
      createdAt
    }
  }`;

export const GET_WAITING_LIST_BY_ID = (id: number) => `
  query GetWaitingListById($id: Int!) {
    getById(id: ${id}) {
      id
      date
      createdAt
    }
  }`;
