import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Button } from "@/components/Button/Button";
import { SongItem } from "@/components/SongItem/SongItem";
import { COLORS } from "@/constants/Colors";
import { PlaylistService } from "@/services/playlistService";
import { SongService } from "@/services/songService";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { YGroup } from "tamagui";
import { MessageContainer } from "../MessageContainer/MessageContainer";
import { AddSongDialogProps } from "./AddSongDialog.types";
import { useLazyLoadData } from "@/hooks/useLazyLoadData/useLazyLoadData";
import { executeCallbackOnScroll } from "@/utils/executeCallbackOnScroll";
import { useFormControl } from "@/hooks/useFormControl/useFormControl";
import { TextInputWithValidations } from "../TextInputWithValidations/TextInputWithValidations";

export function AddSongDialog({
  playlistId,
  setOpen,
  onClose,
}: AddSongDialogProps) {
  const playlistService = new PlaylistService();
  const songService = new SongService();

  const [songs] = useState(songService.getAll());

  const control = useFormControl(null);
  const { value } = control;

  const filteredSongs = useMemo(
    () => (value ? songService.filterSongsByName(value) : songs),
    [value, songs],
  );

  const getData = useCallback(
    (init: number, limit: number) => filteredSongs.slice(init, init + limit),
    [filteredSongs],
  );
  const limit = 10;
  const { data: lazySongs, getDataAndUpdate } = useLazyLoadData(
    getData,
    limit,
    [filteredSongs],
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
    <ScrollView
      onScroll={handleScroll}
      style={{ width: "95%" }}
      contentContainerStyle={{
        paddingHorizontal: 20,
      }}
    >
      <TextInputWithValidations
        control={control}
        inputProps={{
          placeholder: "Search Music...",
          placeholderTextColor: COLORS.transparentWhite,
          selectionColor: COLORS.transparentGreen,
          testID: "input",
        }}
        inputContainerStyles={{
          width: "100%",
          marginTop: 30,
        }}
        inputStyles={{ paddingVertical: 15 }}
        resetButton
      />

      {lazySongs.map((song) => (
        <SongItem
          song={song}
          actionButton={generateActionButton(song.id)}
          key={song.id}
        />
      ))}

      {!lazySongs.length ? (
        <MessageContainer style={{ height: "80%" }}>
          <Text style={styles.noSongsDownloaded}>No songs found!</Text>
        </MessageContainer>
      ) : (
        <></>
      )}
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
      {songs.length ? $songs : $noSongsDownloaded}
    </BaseDialog>
  );
}

const styles = StyleSheet.create({
  contentDialogStyles: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 0,
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
