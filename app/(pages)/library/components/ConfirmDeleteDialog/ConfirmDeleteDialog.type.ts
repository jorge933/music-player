export interface ConfirmDeleteDialogProps {
  id: string | number;
  onDeleteItem: () => unknown;
  onClose: () => unknown;
  isPlaylist?: boolean;
}
