import DeleteSongModal from "@/components/DeleteSongModal/DeleteSongModal";
import SongItem from "@/components/SongItem/SongItem";
import { DOWNLOAD_DIRECTORY } from "@/constants/AppDirectories";
import { Song } from "@/interfaces/Song";
import { StorageContext } from "@/services/Storage/Storage.service";
import * as FileSystem from "expo-file-system";
import React, { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { YGroup } from "tamagui";

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
    console.log(123);
    setDeleteSongModal(
      <DeleteSongModal id={id} onDeleteSong={() => onDeleteSong(id)} />,
    );
  };

  return (
    <>
      {$deleteSongModal}
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
