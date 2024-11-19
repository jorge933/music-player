import BaseDialog from "@/components/BaseDialog/BaseDialog";
import Button from "@/components/Button/Button";
import { COLORS } from "@/constants/Colors";
import { Playlist } from "@/interfaces/Playlist";
import { Song } from "@/interfaces/Song";
import { StorageContext } from "@/services/Storage/Storage.service";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { YGroup } from "tamagui";
import { SongItem } from "../SongItem/SongItem";
import { AddSongDialogProps } from "./AddSongDialog.types";

export function AddSongDialog({ playlistId, setOpen }: AddSongDialogProps) {
  const storageService = useContext(StorageContext);

  const containerRef = useRef(null);

  const getItem = (key: string) => {
    const itemInStorage = storageService.getItem<string>(key);
    const item = JSON.parse(itemInStorage);

    return item;
  };

  const songs: Song[] = getItem("songs");
  const playlists: Playlist[] = getItem("playlists");

  const playlistToAddSong = playlists.find((item) => item.id === playlistId);

  const addSong = (songId: string) => {
    const alreadyAdded = playlistToAddSong?.songs.includes(songId);

    console.log(alreadyAdded);
    if (alreadyAdded) return;

    const playlistUpdated = playlists.map((item) => {
      if (item.id === playlistId) {
        item.songs.push(songId);
      }

      return item;
    });

    const playlistsSerialized = JSON.stringify(playlistUpdated);

    storageService.setItem("playlists", playlistsSerialized);
  };

  const generateActionButton = (songId: string) => {
    const alreadyAdded = playlistToAddSong?.songs.includes(songId);

    const iconName = alreadyAdded ? "playlist-add-check" : "playlist-add";
    const buttonColor = alreadyAdded ? COLORS.green : COLORS.white;

    return (
      <Button
        icon={<MaterialIcons name={iconName} size={22} color={buttonColor} />}
        onPress={() => addSong(songId)}
        buttonStyles={styles.actionButton}
      />
    );
  };

  return (
    <BaseDialog
      title="Add Song"
      open={true}
      setOpen={setOpen}
      contentStyles={styles.contentDialogStyles}
    >
      <ScrollView>
        <YGroup alignItems="center" ref={containerRef}>
          {songs.map((song) => (
            <YGroup.Item key={song.id}>
              <SongItem
                song={song}
                actionButton={generateActionButton(song.id)}
              />
            </YGroup.Item>
          ))}
        </YGroup>
      </ScrollView>
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
});
