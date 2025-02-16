import { createContext } from "react";
import { PlayerControlModalContextProps } from "./playerControlModalContext.types";

export const PlayerControlModalContext =
  createContext<PlayerControlModalContextProps | null>(null);
