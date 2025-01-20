import { createContext } from "react";
import { DownloadContextType } from "./downloadContext.types";

export const DownloadSongContext = createContext<DownloadContextType | null>(
  null,
);
