import { createContext } from "react";
import { SongPlayerControlContextProps } from "./songPlayerControlContext.types";

export const SongPlayerControlContext =
  createContext<SongPlayerControlContextProps | null>(null);
