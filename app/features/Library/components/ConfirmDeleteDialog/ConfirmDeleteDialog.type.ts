import { BaseCrudMethods as BaseCrudMethods } from "@/interfaces/BaseCrudMethods";
import { Playlist } from "@/interfaces/Playlist";
import { Song } from "@/interfaces/Song";
import React from "react";

export interface ConfirmDeleteDialogProps {
  id: string | number;
  service: BaseCrudMethods<Playlist | Song>;
  onDeleteItem?: () => void;
  closeDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
