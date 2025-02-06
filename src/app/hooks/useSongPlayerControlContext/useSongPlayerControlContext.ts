import { useContext } from "react";

import { useMemo } from "react";
import { SongPlayerControl } from "../useSongPlayerControl/useSongPlayerControl";
import { SongPlayerControlContext } from "@/contexts/songPlayerControl/songPlayerControlContext";

export function useSongPlayerControlContext() {
  const songPlayerControl = useContext(
    SongPlayerControlContext,
  ) as SongPlayerControl;

  return songPlayerControl;
}
