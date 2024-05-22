import { CurrentUser } from '../types';

// prop type must be type of object or CurrentUser type
// it returns a boolean where it checks all the three condition
// 1. checks weather it is truthy value
// 2. checks weather it is a type of object
// 3. checks weather it has an _id prop
// if 1st-2nd are true and 3 condition is true then it is a type of CurrentUser because it has a prop called _id

export const typeSafeDestructureOfCurrentUser = (
  currentUser: object | CurrentUser<string>
) => {
  if (currentUser && typeof currentUser === 'object' && '_id' in currentUser) {
    return { ...currentUser };
  }
};
