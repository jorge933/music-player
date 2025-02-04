import { MessageContainer } from "@/components/MessageContainer/MessageContainer";
import { Button } from "@/components/Button/Button";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog/ConfirmDeleteDialog";
import { SongItem } from "@/components/SongItem/SongItem";
import { COLORS } from "@/constants/Colors";
import { useLazyLoadData } from "@/hooks/useLazyLoadData/useLazyLoadData";
import { Song } from "@/interfaces/Song";
import { SongService } from "@/services/songService";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { executeCallbackOnScroll } from "@/utils/executeCallbackOnScroll";

export function MusicsPage() {
  const songService = new SongService();

  const [songs, setSongs] = useState(songService.getAll());

  const [$deleteSongDialog, setDeleteSongDialog] =
    useState<React.JSX.Element | null>();

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
      />,
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
    [showDialog],
  );

  const $noSongsDownloaded = (
    <MessageContainer>
      <Text style={styles.noSongsDownloaded}>No Songs Downloaded!</Text>
    </MessageContainer>
  );

  const getData = useCallback(
    (init: number, limit: number) => songs.slice(init, init + limit),
    [songs],
  );

  const { data, getDataAndUpdate } = useLazyLoadData<Song>(getData, 10, [
    songs,
  ]);

  const scrollPercentageToCall = 42;
  const handleScroll = executeCallbackOnScroll(
    getDataAndUpdate,
    scrollPercentageToCall,
  );

  return (
    <>
      {$deleteSongDialog}

      {!songs.length && $noSongsDownloaded}

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={40}
        contentContainerStyle={styles.songsContainer}
      >
        {data.map((song) => (
          <SongItem
            song={song}
            actionButton={generateDeleteSongButton(song.id)}
            key={song.id}
          />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  songsContainer: {
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
