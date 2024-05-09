import { create } from 'zustand';
import { CurrentUser } from '../types';
interface CurrentUserState {
  currentUser: CurrentUser<string> | object;
  token: string;
  setToken: (token: string) => void;
  setCurrentUser: (user: CurrentUser<string>) => void;
}

export const useCurrentUserStore = create<CurrentUserState>()((set) => ({
  currentUser: {},
  token: '',
  setToken: (token) => set(() => ({ token })),
  setCurrentUser: (user) => set(() => ({ currentUser: user })),
}));
