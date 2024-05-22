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
