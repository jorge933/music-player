import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Button } from "@/components/Button/Button";
import { SongItem } from "@/features/Library/components/SongItem/SongItem";
import { COLORS } from "@/constants/Colors";
import { useStorage } from "@/hooks/useStorage/useStorage";
import { Playlist } from "@/interfaces/Playlist";
import { Song } from "@/interfaces/Song";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { YGroup } from "tamagui";
import { AddSongDialogProps } from "./AddSongDialog.types";

export function AddSongDialog({
  playlistId,
  setOpen,
  onClose,
}: AddSongDialogProps) {
  const storage = useStorage();

  const getItem = useCallback(
    (key: string) => {
      const itemInStorage = storage.getItem<string>(key);
      const item = JSON.parse(itemInStorage);

      return item;
    },
    [storage],
  );

  const allSongs: Song[] = getItem("songs");
  const [allPlaylists, setAllPlaylists] = useState<Playlist[]>(
    getItem("playlists"),
  );

  const currentPlaylist = useMemo(
    () => allPlaylists.find((item) => item.id === playlistId),
    [allPlaylists, playlistId],
  );

  const updatePlaylistSongs = useCallback(
    (songId: string) => {
      const alreadyAdded = currentPlaylist?.songs.includes(songId);

      const updatedPlaylists = allPlaylists.map((playlist) => {
        if (playlist.id !== playlistId) return playlist;

        const updatedSongs = !alreadyAdded
          ? [...playlist.songs, songId]
          : playlist.songs.filter((id) => id !== songId);

        return { ...playlist, songs: updatedSongs };
      });

      setAllPlaylists(updatedPlaylists);

      const playlistsSerialized = JSON.stringify(updatedPlaylists);

      storage.setItem("playlists", playlistsSerialized);
    },
    [allPlaylists, currentPlaylist?.songs, playlistId, storage],
  );

  const generateActionButton = useCallback(
    (songId: string) => {
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
    },
    [currentPlaylist, updatePlaylistSongs],
  );

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
