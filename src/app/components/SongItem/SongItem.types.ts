import { Song } from "@/interfaces/Song";
import React from "react";

export interface SongItemProps {
  song: Song;
  isPlaying: boolean;
  listPosition?: number;
  actionButton?: React.JSX.Element;
}
