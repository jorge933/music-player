import { useContext } from "react";

import { SongPlayerControlContext } from "@/contexts/songPlayerControl/songPlayerControlContext";
import { SongPlayerControlContextProps } from "@/contexts/songPlayerControl/songPlayerControlContext.types";

export function useSongPlayerControlContext() {
  const songPlayerControl = useContext(
    SongPlayerControlContext,
  ) as SongPlayerControlContextProps;

  return songPlayerControl;
}
