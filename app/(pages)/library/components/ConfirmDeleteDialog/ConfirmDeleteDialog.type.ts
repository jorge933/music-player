import React from "react";

export interface ConfirmDeleteDialogProps {
  id: string | number;
  isPlaylist?: boolean;
  onDeleteItem: () => unknown;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
