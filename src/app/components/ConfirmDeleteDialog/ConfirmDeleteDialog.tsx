import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Button } from "@/components/Button/Button";
import { COLORS } from "@/constants/Colors";
import { SongItem } from "@/components/SongItem/SongItem";
import { Song } from "@/interfaces/Song";
import { PlaylistService } from "@/services/playlistService";
import React, { useCallback } from "react";
import { ConfirmDeleteDialogProps } from "./ConfirmDeleteDialog.types";
import { useToastsContext } from "@/hooks/useToastsContext/useToastsContext";

export function ConfirmDeleteDialog({
  id,
  service,
  testID,
  onDeleteItem,
  closeDialog,
}: ConfirmDeleteDialogProps) {
  const toasts = useToastsContext();

  const isPlaylist = service instanceof PlaylistService;

  const item = service.getById(id);

  const deleteItem = useCallback(() => {
    service.delete(id);

    if (onDeleteItem) onDeleteItem();

    const toastMessage = isPlaylist
      ? "Playlist deleted with success"
      : "Song deleted with success";

    toasts.success(toastMessage, 3000);
  }, [id, onDeleteItem]);

  const showToastOnCancel = useCallback(() => {
    const toastMessage = isPlaylist
      ? "Playlist not deleted"
      : "Song not deleted";

    toasts.info(toastMessage, 3000);
  }, []);

  const handleOnCloseDialog = useCallback(
    (closedByExternalButton?: boolean) => {
      if (closedByExternalButton) return;

      showToastOnCancel();
    },
    [],
  );

  return (
    <BaseDialog
      open={true}
      title={`Delete this ${isPlaylist ? "playlist" : "song"}?`}
      setOpen={closeDialog}
      onDialogClose={handleOnCloseDialog}
      testID={testID}
    >
      {!isPlaylist ? <SongItem song={item as Song} /> : <></>}
      <Button
        title="Delete"
        closeDialog
        onPress={deleteItem}
        buttonStyles={{ backgroundColor: COLORS.red, marginTop: 15 }}
        testID="delete-button"
      />
      <Button
        title="Cancel"
        closeDialog
        buttonStyles={{
          backgroundColor: COLORS.transparentWhite,
          marginTop: 20,
        }}
        onPress={showToastOnCancel}
        testID="cancel-button"
      />
    </BaseDialog>
  );
}
