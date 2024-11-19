import React from "react";

export interface AddSongDialogProps {
  playlistId: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
