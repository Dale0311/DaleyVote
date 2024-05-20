export type CurrentUser<T> = {
  username: T;
  _id: T;
  email: T;
  imageUrl: T;
  createdAt: Date;
  updateAt: Date;
};

export type Candidate = {
  img: ArrayBuffer | string;
  name: string;
};
i need a way for me to store my uploaded img properties in img. which are: {public_id, secure_url}
its workin, but i need to create a way for user to delete the img whenever the user click the "edit" button

export type Position = {
  id: string;
  title: string;
  candidates: Candidate[];
};
