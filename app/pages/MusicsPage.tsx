import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog/ConfirmDeleteDialog";
import { SongItem } from "@/components/SongItem/SongItem";
import { COLORS } from "@/constants/Colors";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { YGroup, YStack } from "tamagui";
import { FontAwesome5 } from "@expo/vector-icons";
import { Button } from "@/components/Button/Button";
import { SongService } from "@/services/songService/songService";

export function MusicsPage() {
  const songService = new SongService();

  const songs = songService.getAll();

  const [$deleteSongDialog, setDeleteSongDialog] =
    useState<React.JSX.Element | null>();

  const showDialog = useCallback((id: string) => {
    setDeleteSongDialog(
      <ConfirmDeleteDialog
        id={id}
        service={songService}
        closeDialog={() => setDeleteSongDialog(null)}
      />,
    );
  }, []);

  const $noSongsDownloaded = (
    <YStack {...styles.errorMessageContainer}>
      <Text style={styles.noSongsDownloaded}>No Songs Downloaded!</Text>
    </YStack>
  );

  const generateDeleteButton = useCallback(
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
      />
    ),
    [showDialog],
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
              children={
                <SongItem
                  song={song}
                  actionButton={generateDeleteButton(song.id)}
                />
              }
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
