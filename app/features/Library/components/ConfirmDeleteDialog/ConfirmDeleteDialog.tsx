/* eslint-disable react-hooks/exhaustive-deps */
import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Button } from "@/components/Button/Button";
import { SongItem } from "@/features/Library/components/SongItem/SongItem";
import { SONGS_DIRECTORY } from "@/constants/AppDirectories";
import { COLORS } from "@/constants/Colors";
import { useStorage } from "@/hooks/useStorage/useStorage";
import { Song } from "@/interfaces/Song";
import * as FileSystem from "expo-file-system";
import React, { useCallback } from "react";
import { ConfirmDeleteDialogProps } from "./ConfirmDeleteDialog.type";
import { Playlist } from "@/interfaces/Playlist";

export function ConfirmDeleteDialog({
  id,
  isPlaylist,
  onDeleteItem,
  setOpen,
}: ConfirmDeleteDialogProps) {
  const storage = useStorage();

  const itemName = isPlaylist ? "playlists" : "songs";

  const items = storage.getItem<(Song | Playlist)[]>(itemName) || [];
  const item = items.find((currentItem) => currentItem.id === id);

  const deleteItem = useCallback(() => {
    if (!isPlaylist) {
      const path = SONGS_DIRECTORY + id + ".mp3";
      FileSystem.deleteAsync(path);
    }

    const updatedItems = items.filter((currentItem) => id !== currentItem.id);

    storage.setItem(itemName, updatedItems);

    if (onDeleteItem) onDeleteItem();
  }, [isPlaylist, items, storage, itemName, id, onDeleteItem]);

  return (
    <BaseDialog
      open={true}
      setOpen={setOpen}
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
