export type CurrentUser<T> = {
  username: T;
  _id: T;
  email: T;
  imageUrl: T;
  createdAt: Date;
  updateAt: Date;
};

export type Candidate = {
  img: File | null;
  name: string;
};

export type Position = {
  title: string;
  candidates: Candidate[];
};
