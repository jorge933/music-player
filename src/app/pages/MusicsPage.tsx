import { Button } from "@/components/Button/Button";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog/ConfirmDeleteDialog";
import { MessageContainer } from "@/components/MessageContainer/MessageContainer";
import { SongItem } from "@/components/SongItem/SongItem";
import { TextInputWithValidations } from "@/components/TextInputWithValidations/TextInputWithValidations";
import { COLORS } from "@/constants/Colors";
import { useFormControl } from "@/hooks/useFormControl/useFormControl";
import { useLazyLoadData } from "@/hooks/useLazyLoadData/useLazyLoadData";
import { Song } from "@/interfaces/Song";
import { SongService } from "@/services/songService";
import { executeCallbackOnScroll } from "@/utils/executeCallbackOnScroll";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export function MusicsPage() {
  const songService = new SongService();

  const [songs, setSongs] = useState(songService.getAll());
  const [$deleteSongDialog, setDeleteSongDialog] =
    useState<React.JSX.Element | null>();

  const control = useFormControl(null);
  const { value } = control;

  const filteredSongs = useMemo(
    () => (value ? songService.filterSongsByName(value) : songs),
    [value, songs]
  );

  const getData = useCallback(
    (init: number, limit: number) => filteredSongs.slice(init, init + limit),
    [filteredSongs]
  );
  const limit = 10;
  const { data: lazySongs, getDataAndUpdate } = useLazyLoadData<Song>(
    getData,
    limit,
    [filteredSongs]
  );

  const showDialog = useCallback((id: string) => {
    const song = songService.getById(id);

    const $songItem = <SongItem song={song as Song} />;

    setDeleteSongDialog(
      <ConfirmDeleteDialog
        id={id}
        service={songService}
        closeDialog={() => setDeleteSongDialog(null)}
        onDeleteItem={() => setSongs(songService.getAll())}
        infoToastMessage="Song not deleted"
        successToastMessage="Song deleted with success"
        title="Confirm the deletion of this song?"
        children={$songItem}
      />
    );
  }, []);

  const generateDeleteSongButton = useCallback(
    (id: string) => (
      <Button
        icon={<FontAwesome5 name="trash" size={18} color={COLORS.red} />}
        onPress={() => showDialog(id)}
        buttonStyles={{
          width: "auto",
          backgroundColor: "none",
          paddingVertical: 10,
          paddingLeft: 10,
          paddingRight: 0,
        }}
        testID="deleteSongButton"
      />
    ),
    [showDialog]
  );

  const $noSongsDownloaded = (
    <MessageContainer>
      <Text style={styles.noSongsDownloaded}>No Songs Downloaded!</Text>
    </MessageContainer>
  );

  const scrollPercentageToCall = 42;
  const handleScroll = executeCallbackOnScroll(
    getDataAndUpdate,
    scrollPercentageToCall
  );

  const $songs = (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={20}
      contentContainerStyle={styles.songsContainer}
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
          actionButton={generateDeleteSongButton(song.id)}
          playlistId={0}
          key={song.id}
        />
      ))}

      {!filteredSongs.length && (
        <MessageContainer>
          <Text style={styles.noSongsDownloaded}>No songs found!</Text>
        </MessageContainer>
      )}
    </ScrollView>
  );

  return (
    <>
      {$deleteSongDialog}

      {!songs.length ? $noSongsDownloaded : $songs}
    </>
  );
}

const styles = StyleSheet.create({
  songsContainer: {
    paddingHorizontal: 20,
    display: "flex",
    alignItems: "center",
  },
  noSongsDownloaded: {
    fontFamily: "LatoSemiBold",
    fontSize: 14,
    color: COLORS.white,
    margin: "auto",
  },
  errorMessageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
