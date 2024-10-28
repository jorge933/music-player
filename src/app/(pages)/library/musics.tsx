import SongItem from "@/components/SongItem/SongItem";
import { Song } from "@/interfaces/Song";
import { StorageContext } from "@/services/Storage/Storage.service";
import { useContext } from "react";
import { ScrollView, View } from "react-native";
import { YGroup } from "tamagui";

export default function Musics() {
  const storageService = useContext(StorageContext);
  const songsInStorage = storageService.getItem("songs") || "[]";
  const songs: Song[] = JSON.parse(songsInStorage);

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
          <YGroup.Item children={<SongItem {...song} />} key={song.id} />
        ))}
      </YGroup>
    </ScrollView>
  );
}
