import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Button } from "@/components/Button/Button";
import { COLORS } from "@/constants/Colors";
import { SongItem } from "@/components/SongItem/SongItem";
import { Song } from "@/interfaces/Song";
import { PlaylistService } from "@/services/playlistService/playlistService";
import React, { useCallback } from "react";
import { ConfirmDeleteDialogProps } from "./ConfirmDeleteDialog.type";

export function ConfirmDeleteDialog({
  id,
  service,
  onDeleteItem,
  closeDialog,
}: ConfirmDeleteDialogProps) {
  const isPlaylist = service instanceof PlaylistService;

  const item = service.getById(id);

  const deleteItem = useCallback(() => {
    service.delete(id);

    if (onDeleteItem) onDeleteItem();
  }, [service, id, onDeleteItem]);

  return (
    <BaseDialog
      open={true}
      setOpen={closeDialog}
      title={`Delete this ${isPlaylist ? "playlist" : "song"}?`}
    >
      {!isPlaylist ? <SongItem song={item as Song} /> : <></>}
      <Button
        title="Cancel"
        closeDialog
        buttonStyles={{
          backgroundColor: COLORS.transparentWhite,
          marginTop: 20,
        }}
      />
      <Button
        title="Delete"
        closeDialog
        onPress={deleteItem}
        buttonStyles={{ backgroundColor: COLORS.red, marginTop: 15 }}
      />
    </BaseDialog>
  );
}
