import { create } from 'zustand';
import { Position } from '../types';

// create a setter position
interface CreateRoomState {
  positions: Position[];
  setPosition: (newPosition: Position) => void;
}

export const useCreateRoom = create<CreateRoomState>()((set) => ({
  positions: [],
  setPosition: (newPosition) =>
    set((state) => {
      const dataExist = state.positions.find(
        (pos) => pos.title === newPosition.title
      );

      let updatedPos;

      // if data exist
      if (dataExist) {
        // update the existing data
        updatedPos = state.positions.map((pos) =>
          pos.title === newPosition.title ? newPosition : pos
        );
      } else {
        // else just add as new data
        updatedPos = [...state.positions, newPosition];
      }

      return { positions: updatedPos };
    }),
}));
