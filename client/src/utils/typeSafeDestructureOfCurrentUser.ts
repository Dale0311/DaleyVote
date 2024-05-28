import { CurrentUser } from '../types';

export const typeSafeDestructureOfCurrentUser = (
  currentUser: object | CurrentUser<string>
) => {
  if (currentUser && typeof currentUser === 'object' && '_id' in currentUser) {
    return { ...currentUser };
  }
};
