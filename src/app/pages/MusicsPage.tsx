import { Button } from "@/components/Button/Button";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog/ConfirmDeleteDialog";
import { LazyDataScroll } from "@/components/LazyDataScroll/LazyDataScroll";
import { SongItem } from "@/components/SongItem/SongItem";
import { COLORS } from "@/constants/Colors";
import { Song } from "@/interfaces/Song";
import { SongService } from "@/services/songService";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { YStack } from "tamagui";

export function MusicsPage() {
  const songService = new SongService();

  const [songs, setSongs] = useState(songService.getAll());

  const [$deleteSongDialog, setDeleteSongDialog] =
    useState<React.JSX.Element | null>();

  const showDialog = useCallback((id: string) => {
    setDeleteSongDialog(
      <ConfirmDeleteDialog
        id={id}
        service={songService}
        closeDialog={() => setDeleteSongDialog(null)}
        onDeleteItem={() => setSongs(songService.getAll())}
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
    <YStack {...styles.errorMessageContainer}>
      <Text style={styles.noSongsDownloaded}>No Songs Downloaded!</Text>
    </YStack>
  );

  const getData = useCallback(
    (init: number, limit: number) => songs.slice(init, init + limit),
    [songs],
  );

  const render = useCallback(
    (song: Song) => (
      <SongItem
        song={song}
        actionButton={generateDeleteSongButton(song.id)}
        key={song.id}
      />
    ),
    [generateDeleteSongButton],
  );

  return (
    <>
      {$deleteSongDialog}

      {!songs.length ? (
        $noSongsDownloaded
      ) : (
        <LazyDataScroll
          getData={getData}
          render={render}
          limit={10}
          contentContainerStyle={{
            display: "flex",
            alignItems: "center",
          }}
          dependencies={[songs]}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
