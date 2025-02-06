import { SongPlayerControl } from "@/hooks/useSongPlayerControl/useSongPlayerControl";
import { createContext } from "react";

export const SongPlayerControlContext = createContext<SongPlayerControl | null>(
  null,
);
