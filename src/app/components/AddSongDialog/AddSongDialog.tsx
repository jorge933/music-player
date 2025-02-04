import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Button } from "@/components/Button/Button";
import { SongItem } from "@/components/SongItem/SongItem";
import { COLORS } from "@/constants/Colors";
import { PlaylistService } from "@/services/playlistService";
import { SongService } from "@/services/songService";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { YGroup } from "tamagui";
import { MessageContainer } from "../MessageContainer/MessageContainer";
import { AddSongDialogProps } from "./AddSongDialog.types";
import { useLazyLoadData } from "@/hooks/useLazyLoadData/useLazyLoadData";
import { executeCallbackOnScroll } from "@/utils/executeCallbackOnScroll";

export function AddSongDialog({
  playlistId,
  setOpen,
  onClose,
}: AddSongDialogProps) {
  const playlistService = new PlaylistService();
  const songService = new SongService();

  const [allSongs] = useState(songService.getAll());

  const getData = (init: number, limit: number) =>
    allSongs.slice(init, init + limit);
  const limit = 10;
  const { data: lazySongs, getDataAndUpdate } = useLazyLoadData(
    getData,
    limit,
    [allSongs],
  );

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

  const handleScroll = executeCallbackOnScroll(getDataAndUpdate);
  const $songs = (
    <ScrollView onScroll={handleScroll}>
      <YGroup alignItems="center">
        {lazySongs.map((song) => (
          <YGroup.Item key={song.id}>
            <SongItem
              song={song}
              actionButton={generateActionButton(song.id)}
            />
          </YGroup.Item>
        ))}
      </YGroup>
    </ScrollView>
  );

  const $noSongsDownloaded = (
    <MessageContainer style={{ height: "80%" }}>
      <Text style={styles.noSongsDownloaded}>No Songs Downloaded!</Text>
    </MessageContainer>
  );

  return (
    <BaseDialog
      title="Add Song"
      open={true}
      setOpen={setOpen}
      onDialogClose={onClose}
      contentStyles={styles.contentDialogStyles}
    >
      {allSongs.length ? $songs : $noSongsDownloaded}
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
  noSongsDownloaded: {
    fontFamily: "LatoSemiBold",
    fontSize: 14,
    color: COLORS.white,
    margin: "auto",
  },
});
