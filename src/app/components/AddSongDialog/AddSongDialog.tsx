import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Button } from "@/components/Button/Button";
import { SongItem } from "@/components/SongItem/SongItem";
import { COLORS } from "@/constants/Colors";
import { PlaylistService } from "@/services/playlistService";
import { SongService } from "@/services/songService";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { YGroup } from "tamagui";
import { AddSongDialogProps } from "./AddSongDialog.types";

export function AddSongDialog({
  playlistId,
  setOpen,
  onClose,
}: AddSongDialogProps) {
  const playlistService = new PlaylistService();
  const songService = new SongService();

  const allSongs = songService.getAll();

  const [currentPlaylist, setCurrentPlaylist] = useState(
    playlistService.getById(playlistId),
  );

  const updatePlaylistSongs = useCallback(
    (songId: string) => {
      playlistService.updateSongList(playlistId, songId);

      setCurrentPlaylist(playlistService.getById(playlistId));
    },
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
          testID="button"
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
