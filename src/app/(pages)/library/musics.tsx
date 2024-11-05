import DeleteSongModal from "@/components/DeleteSongModal/DeleteSongModal";
import SongItem from "@/components/SongItem/SongItem";
import { DOWNLOAD_DIRECTORY } from "@/constants/AppDirectories";
import { COLORS } from "@/constants/Colors";
import { Song } from "@/interfaces/Song";
import { StorageContext } from "@/services/Storage/Storage.service";
import * as FileSystem from "expo-file-system";
import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { YGroup, YStack } from "tamagui";

export default function Musics() {
  const storageService = useContext(StorageContext);

  const songsInStorage = storageService.getItem("songs") || "[]";
  const parsedSongs: Song[] = JSON.parse(songsInStorage);

  const [songs, setSongs] = useState(parsedSongs);

  const [$deleteSongModal, setDeleteSongModal] =
    useState<React.JSX.Element | null>();

  const onDeleteSong = (id: string) => {
    const songsFiltered = songs.filter((song) => song.id !== id);

    setSongs(songsFiltered);
  };
  const showModal = (id: string) => {
    setDeleteSongModal(
      <DeleteSongModal id={id} onDeleteSong={() => onDeleteSong(id)} />,
    );
  };

  const $noSongsDownloaded = (
    <YStack {...styles.errorMessageContainer}>
      <Text style={styles.noSongsDownloaded}>No Songs Downloaded!</Text>
    </YStack>
  );

  return (
    <>
      {$deleteSongModal}
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
              children={<SongItem song={song} deleteSong={showModal} />}
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
