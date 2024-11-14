import SongItem from "@/(pages)/library/components/SongItem/SongItem";
import { COLORS } from "@/constants/Colors";
import { Song } from "@/interfaces/Song";
import { StorageContext } from "@/services/Storage/Storage.service";
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { YGroup, YStack } from "tamagui";
import ConfirmDeleteDialog from "./components/ConfirmDeleteDialog/ConfirmDeleteDialog";

export default function Musics() {
  const storageService = useContext(StorageContext);

  const songsInStorage = storageService.getItem<string>("songs") || "[]";
  const parsedSongs: Song[] = JSON.parse(songsInStorage);

  const [songs, setSongs] = useState(parsedSongs);

  const [$deleteSongDialog, setDeleteSongDialog] =
    useState<React.JSX.Element | null>();

  const onDeleteSong = (id: string) => {
    const songsFiltered = songs.filter((song) => song.id !== id);

    setSongs(songsFiltered);
  };
  const showDialog = (id: string) => {
    setDeleteSongDialog(
      <ConfirmDeleteDialog
        id={id}
        onDeleteItem={() => onDeleteSong(id)}
        onClose={() => setDeleteSongDialog(null)}
      />,
    );
  };

  const $noSongsDownloaded = (
    <YStack {...styles.errorMessageContainer}>
      <Text style={styles.noSongsDownloaded}>No Songs Downloaded!</Text>
    </YStack>
  );

  return (
    <>
      {$deleteSongDialog}
      {!songs.length ? $noSongsDownloaded : <></>}
      <ScrollView>
        <YGroup
          $sm={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {songs.map((song) => (
            <YGroup.Item
              children={<SongItem song={song} deleteSong={showDialog} />}
              key={song.id}
            />
          ))}
        </YGroup>
      </ScrollView>
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
