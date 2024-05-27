import { TRoomConfig } from "../types"

const typeSafeDestructureForRoomConfig = (roomConfig: TRoomConfig | null) => {
  if(roomConfig && typeof roomConfig === "object" && "_id" in roomConfig){
    return roomConfig
  }
}

export default typeSafeDestructureForRoomConfig