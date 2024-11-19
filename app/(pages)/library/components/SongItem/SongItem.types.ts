import { Song } from "@/interfaces/Song";
import React from "react";

export interface SongItemProps {
  song: Song;
  deleteSong?: (id: string) => void;
  actionButton?: React.JSX.Element;
}
