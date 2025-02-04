import { BaseCrudMethods } from "@/interfaces/BaseCrudMethods";
import { Playlist } from "@/interfaces/Playlist";
import { Song } from "@/interfaces/Song";
import { ReactElement } from "react";

export interface ConfirmDeleteDialogProps {
  id: string | number;
  service: BaseCrudMethods<Playlist | Song>;
  title: string;
  infoToastMessage: string;
  successToastMessage: string;
  playlistId?: number;
  children?: ReactElement;
  testID?: string;
  onDeleteItem?: () => void;
  closeDialog: (newValue: boolean) => void;
}
