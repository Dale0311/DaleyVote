import { create } from 'zustand';
import { CurrentUser } from '../types';
interface CurrentUserState {
  currentUser: CurrentUser<string> | object;
  setCurrentUser: (user: CurrentUser<string>) => void;
}

export const useCurrentUserStore = create<CurrentUserState>()((set) => ({
  currentUser: {},
  setCurrentUser: (user: CurrentUser<string>) =>
    set(() => ({ currentUser: user })),
}));
