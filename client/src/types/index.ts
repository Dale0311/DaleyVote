export type CurrentUser<T> = {
  username: T;
  _id: T;
  email: T;
  imageUrl: T;
  createdAt: Date;
  updateAt: Date;
};

export type Candidate = {
  img: Blob | null;
  name: string;
};

export type Position = {
  id: string;
  title: string;
  candidates: Candidate[];
};
