import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Button } from "@/components/Button/Button";
import { SongItem } from "@/components/SongItem/SongItem";
import { COLORS } from "@/constants/Colors";
import { useStorage } from "@/hooks/useStorage/useStorage";
import { Playlist } from "@/interfaces/Playlist";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { YGroup } from "tamagui";
import { AddSongDialogProps } from "./AddSongDialog.types";
import { PlaylistService } from "@/services/playlist/playlistService";
import { SongService } from "@/services/song/songService";

export function AddSongDialog({
  playlistId,
  setOpen,
  onClose,
}: AddSongDialogProps) {
  const storage = useStorage();
  const playlistService = new PlaylistService();
  const songService = new SongService();

  const allSongs = songService.getAll();
  const [allPlaylists] = useState<Playlist[]>(
    storage.getItem<Playlist[]>("playlists") || [],
  );

  const currentPlaylist = useMemo(
    () => allPlaylists.find((item) => item.id === playlistId),
    [allPlaylists, playlistId],
  );

  const updatePlaylistSongs = useCallback(
    (songId: string) => playlistService.updateSongList(playlistId, songId),
    [playlistId],
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
