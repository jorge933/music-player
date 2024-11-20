import BaseDialog from "@/components/BaseDialog/BaseDialog";
import Button from "@/components/Button/Button";
import { COLORS } from "@/constants/Colors";
import { Playlist } from "@/interfaces/Playlist";
import { Song } from "@/interfaces/Song";
import { StorageContext } from "@/services/Storage/Storage.service";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useRef, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { YGroup } from "tamagui";
import { SongItem } from "../SongItem/SongItem";
import { AddSongDialogProps } from "./AddSongDialog.types";

export function AddSongDialog({
  playlistId,
  setOpen,
  onClose,
}: AddSongDialogProps) {
  const storageService = useContext(StorageContext);

  const getItem = (key: string) => {
    const itemInStorage = storageService.getItem<string>(key);
    const item = JSON.parse(itemInStorage);

    return item;
  };

  const allSongs: Song[] = getItem("songs");
  const [allPlaylists, setAllPlaylists] = useState<Playlist[]>(
    getItem("playlists"),
  );

  const currentPlaylist = allPlaylists.find((item) => item.id === playlistId);

  const updatePlaylistSongs = (songId: string) => {
    const shouldAdd = currentPlaylist?.songs.includes(songId);

    const updatedPlaylists = allPlaylists.map((playlist) => {
      if (playlist.id !== playlistId) return playlist;

      const updatedSongs = shouldAdd
        ? [...playlist.songs, songId]
        : playlist.songs.filter((id) => id !== songId);

      return { ...playlist, songs: updatedSongs };
    });

    setAllPlaylists(updatedPlaylists);

    const playlistsSerialized = JSON.stringify(updatedPlaylists);

    storageService.setItem("playlists", playlistsSerialized);
  };

  const generateActionButton = (songId: string) => {
    const alreadyAdded = currentPlaylist?.songs.includes(songId);

    const iconName = alreadyAdded ? "playlist-add-check" : "playlist-add";
    const buttonColor = alreadyAdded ? COLORS.green : COLORS.white;

    return (
      <Button
        icon={<MaterialIcons name={iconName} size={22} color={buttonColor} />}
        onPress={() => updatePlaylistSongs(songId)}
        buttonStyles={styles.actionButton}
      />
    );
  };

  return (
    <BaseDialog
      title="Add Song"
      open={true}
      setOpen={setOpen}
      onDialogClose={onClose}
      contentStyles={styles.contentDialogStyles}
    >
      <ScrollView>
        <YGroup alignItems="center">
          {allSongs.map((song) => (
            <YGroup.Item key={song.id}>
              <SongItem
                song={song}
                actionButton={generateActionButton(song.id)}
              />
            </YGroup.Item>
          ))}
        </YGroup>
      </ScrollView>
    </BaseDialog>
  );
}

const styles = StyleSheet.create({
  contentDialogStyles: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.black,
  },
  actionButton: {
    width: "auto",
    backgroundColor: "none",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
