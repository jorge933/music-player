import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Button } from "@/components/Button/Button";
import { SongItem } from "@/features/Library/components/SongItem/SongItem";
import { DOWNLOAD_DIRECTORY } from "@/constants/AppDirectories";
import { COLORS } from "@/constants/Colors";
import { useStorage } from "@/hooks/useStorage/useStorage";
import { Song } from "@/interfaces/Song";
import * as FileSystem from "expo-file-system";
import React, { useCallback } from "react";
import { ConfirmDeleteDialogProps } from "./ConfirmDeleteDialog.type";

export function ConfirmDeleteDialog({
  id,
  isPlaylist,
  onDeleteItem,
  setOpen,
}: ConfirmDeleteDialogProps) {
  const storage = useStorage();

  const itemName = isPlaylist ? "playlists" : "songs";

  const itemsInStorage = storage.getItem<string>(itemName) || "[]";
  const items: Song[] = JSON.parse(itemsInStorage);
  const item = items.find((currentItem) => currentItem.id === id) as Song;

  const deleteItem = useCallback(() => {
    if (!isPlaylist) {
      const path = DOWNLOAD_DIRECTORY + id + ".mp3";
      FileSystem.deleteAsync(path);
    }

    const updatedItems = items.filter((currentItem) => id !== currentItem.id);
    const itemsStringify = JSON.stringify(updatedItems);

    storage.setItem(itemName, itemsStringify);

    if (onDeleteItem) onDeleteItem();
  }, [isPlaylist, items, storage, itemName, id, onDeleteItem]);

  return (
    <BaseDialog
      open={true}
      setOpen={setOpen}
      title={`Delete this ${isPlaylist ? "playlist" : "song"}?`}
    >
      {!isPlaylist ? <SongItem song={item} /> : <></>}
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
