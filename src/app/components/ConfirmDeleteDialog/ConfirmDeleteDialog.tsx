import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Button } from "@/components/Button/Button";
import { SongItem } from "@/components/SongItem/SongItem";
import { COLORS } from "@/constants/Colors";
import { useToastsContext } from "@/hooks/useToastsContext/useToastsContext";
import { Song } from "@/interfaces/Song";
import { PlaylistService } from "@/services/playlistService";
import { AntDesign } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { DialogHeader } from "../DialogHeader/DialogHeader";
import { ConfirmDeleteDialogProps } from "./ConfirmDeleteDialog.types";

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

  const title = isPlaylist
    ? "Confirm deletion of this playlist?"
    : "Confirm the deletion of this song?";
  const $customHeader = (
    <>
      <AntDesign
        name="warning"
        size={40}
        color={COLORS.white}
        style={{
          paddingTop: 9,
          paddingHorizontal: 12,
          paddingBottom: 13,
          margin: "auto",
          backgroundColor: COLORS.yellow,
          borderRadius: 50,
        }}
      />

      <DialogHeader title={title} />
    </>
  );

  return (
    <BaseDialog
      open={true}
      setOpen={closeDialog}
      onDialogClose={handleOnCloseDialog}
      testID={testID}
      customHeader={$customHeader}
    >
      {!isPlaylist ? <SongItem song={item as Song} /> : <></>}
      <Button
        title="Delete"
        closeDialog
        onPress={deleteItem}
        buttonStyles={{ backgroundColor: COLORS.yellow, marginTop: 15 }}
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
