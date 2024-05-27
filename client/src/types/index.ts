export type CurrentUser<T> = {
  username: T;
  _id: T;
  email: T;
  imageUrl: T;
  createdAt: Date;
  updatedAt: Date;
};

export type Candidate = {
  img: ArrayBuffer | string;
  name: string;
};

export type Position = {
  id: string;
  title: string;
  candidates: Candidate[];
};

export type ConfigRoomData = {
  title: string;
  expiration: Date;
  votingDetails: Position[];
};


// types for room
type TParticipant<T> = {
  _id: T;
  userId: T;
  socketId: T;
  votes?: Array<string>;
};

export type TRoomConfig = {
  success: boolean;
  __v?: number;
  _id: string;
  code: string;
  createdAt: string;
  createdById: string;
  expiration: string;
  participants: TParticipant<string>[]; // or Array<TParticipant<string>> |s
  title: string;
  votingDetails: Position[]
  updatedAt: string;
};