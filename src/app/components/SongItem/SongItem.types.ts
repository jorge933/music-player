import { Song } from "@/interfaces/Song";
import React from "react";

export interface SongItemProps {
  song: Song;
  playlistId?: number;
  listPosition?: number;
  actionButton?: React.JSX.Element;
}
