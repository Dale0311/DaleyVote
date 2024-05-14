import { create } from 'zustand';
import { Position } from '../types';
// create a setter position
interface CreateRoomState {
  positions: Position[];
  setPosition: (newPosition: Position) => void;
  removePosition: (id: string) => void;
}

export const useCreateRoom = create<CreateRoomState>()((set) => ({
  positions: [],
  setPosition: (newPosition) =>
    set((state) => ({ positions: [...state.positions, newPosition] })),

  removePosition: (id) => {
    set((state) => {
      const updatedPos = state.positions.filter((pos) => pos.id !== id);
      return { positions: updatedPos };
    });
  },
}));
