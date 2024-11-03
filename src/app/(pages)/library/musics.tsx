import SongItem from "@/components/SongItem/SongItem";
import { DOWNLOAD_DIRECTORY } from "@/constants/AppDirectories";
import { Song } from "@/interfaces/Song";
import { StorageContext } from "@/services/Storage/Storage.service";
import * as FileSystem from "expo-file-system";
import { useContext, useState } from "react";
import { ScrollView } from "react-native";
import { YGroup } from "tamagui";

export default function Musics() {
  const storageService = useContext(StorageContext);

  const songsInStorage = storageService.getItem("songs") || "[]";
  const parsedSongs: Song[] = JSON.parse(songsInStorage);

  const [songs, setSongs] = useState(parsedSongs);

  const deleteSong = (id: string) => {
    const path = DOWNLOAD_DIRECTORY + id + ".mp3";
    FileSystem.deleteAsync(path).then(() => {
      const updatedSongs = songs.filter((song) => id !== song.id);
      const songsStringify = JSON.stringify(updatedSongs);

      storageService.setItem("songs", songsStringify);
      setSongs(updatedSongs);
    });
  };

  return (
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
            children={<SongItem song={song} deleteSong={deleteSong} />}
            key={song.id}
          />
        ))}
      </YGroup>
    </ScrollView>
  );
}
