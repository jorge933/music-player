import { DOWNLOAD_DIRECTORY } from "@/constants/AppDirectories";
import { Song } from "@/interfaces/Song";
import { StorageContext } from "@/services/Storage/Storage.service";
import * as FileSystem from "expo-file-system";
import { useContext, useState } from "react";
import { DeleteSongDialogProps } from "./DeleteSongDialog.type";
import BaseDialog from "../BaseDialog/BaseDialog";
import SongItem from "../SongItem/SongItem";
import Button from "../Button/Button";
import { COLORS } from "@/constants/Colors";

export default function DeleteSongDialog({
  id,
  onDeleteSong,
  onClose,
}: DeleteSongDialogProps) {
  const storageService = useContext(StorageContext);
  const songsInStorage = storageService.getItem("songs") || "[]";
  const songs: Song[] = JSON.parse(songsInStorage);
  const song = songs.find((song) => song.id === id) as Song;

  const [open, setOpen] = useState(true);

  const deleteSong = () => {
    const path = DOWNLOAD_DIRECTORY + id + ".mp3";
    FileSystem.deleteAsync(path).then(() => {
      const updatedSongs = songs.filter((song) => id !== song.id);
      const songsStringify = JSON.stringify(updatedSongs);

      storageService.setItem("songs", songsStringify);
    });
    onDeleteSong();
  };

  return (
    <BaseDialog
      open={open}
      setOpen={setOpen}
      onDialogClose={onClose}
      title="Delete this song?"
    >
      <SongItem song={song} />
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
        onPress={deleteSong}
        buttonStyles={{ backgroundColor: COLORS.red, marginTop: 15 }}
      />
    </BaseDialog>
  );
}
