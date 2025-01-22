import { BaseCrudMethods } from "@/interfaces/BaseCrudMethods";
import { Playlist } from "@/interfaces/Playlist";
import { Song } from "@/interfaces/Song";

export interface ConfirmDeleteDialogProps {
  id: string | number;
  service: BaseCrudMethods<Playlist | Song>;
  testID?: string;
  onDeleteItem?: () => void;
  closeDialog: (newValue: boolean) => void;
}
