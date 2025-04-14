export const GET_ENTRIES_BY_WAITING_LIST_ID = (waitingListId: number) => `
  query GetEntriesByWaitingList($waitingListId: Int!) {
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
