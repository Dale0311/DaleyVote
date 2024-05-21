import { CurrentUser } from '../types';

// prop type must be type of object or CurrentUser type
// it returns a boolean where it checks all the three condition
// 1. checks weather it is truthy value
// 2. checks weather it is a type of object
// 3. checks weather it has an _id prop
// if 1st-2nd are true and 3 condition is true then it is a type of CurrentUser because it has a prop called _id

type DestructuredType<T> = (
  currentUser: object | CurrentUser<T>
) => CurrentUser<T> | object;

type FnType<T> = (
  currentUser: object | CurrentUser<T>
) => currentUser is CurrentUser<T>;

export const isCurrentUserType: FnType<string> = (
  currentUser
): currentUser is CurrentUser<string> => {
  return currentUser && typeof currentUser === 'object' && '_id' in currentUser;
};

export const typeSafeDestructureOfCurrentUser: DestructuredType<string> = (
  currentUser
) => {
  const isTrue = isCurrentUserType(currentUser);
  if (isTrue) {
    const { _id, createdAt, email, imageUrl, updateAt, username } =
      currentUser as CurrentUser<string>;
    return { _id, createdAt, email, imageUrl, updateAt, username };
  }
  return {};
};
