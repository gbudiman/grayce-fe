export interface IUser {
  id: number;
  name: string;
  careJourneyIds: number[];
  careJourneyId: number | null;
}

export interface IUsers {
  byId: { [id: string]: IUser };
}
