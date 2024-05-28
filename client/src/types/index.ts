export type CurrentUser<T> = {
  username: T;
  _id: T;
  email: T;
  imageUrl: T;
  createdAt: Date;
  updatedAt: Date;
};

export type Candidate = {
  _id?: string;
  img: ArrayBuffer | string;
  name: string;
};

export type Position = {
  _id: string;
  title: string;
  candidates: Candidate[];
};

export type ConfigRoomData = {
  title: string;
  expiration: Date;
  createdById?: string;
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
  votingDetails: TPositionForRoom[];
  updatedAt: string;
};

export type TCandidateWithImgObj = {
  img: {
    public_id: string;
    secure_url: string;
  };
  name: string;
  _id: string;
};

export type TPositionForRoom = Omit<Position, "candidates"> & {
  candidates: TCandidateWithImgObj[];
};
