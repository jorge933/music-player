import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog/ConfirmDeleteDialog";
import { SongItem } from "@/components/SongItem/SongItem";
import { COLORS } from "@/constants/Colors";
import { useStorage } from "@/hooks/useStorage/useStorage";
import { Song } from "@/interfaces/Song";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { YGroup, YStack } from "tamagui";

export function MusicsScreen() {
  const storage = useStorage();

  const songsInStorage = storage.getItem<string>("songs") || "[]";
  const songs: Song[] = JSON.parse(songsInStorage);

  const [$deleteSongDialog, setDeleteSongDialog] =
    useState<React.JSX.Element | null>();

  const showDialog = useCallback((id: string) => {
    setDeleteSongDialog(
      <ConfirmDeleteDialog id={id} setOpen={() => setDeleteSongDialog(null)} />,
    );
  }, []);

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
