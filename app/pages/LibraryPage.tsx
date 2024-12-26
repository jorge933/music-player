/* eslint-disable react-hooks/exhaustive-deps */
import { COLORS } from "@/constants/Colors";
import { PlaylistFormDialog } from "@/components/PlaylistFormDialog/PlaylistFormDialog";
import { useStorage } from "@/hooks/useStorage/useStorage";
import { Playlist } from "@/interfaces/Playlist";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text } from "react-native";
import { Button, XStack, YStack } from "tamagui";
import { PlaylistCard } from "@/components/PlaylistCard/PlaylistCard";

export function LibraryPage() {
  const storage = useStorage();

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const goToMusicsPage = () => router.navigate("/library/musics");

  const playlists = storage.getItem<Playlist[]>("playlists") || [];

  const numColumns = 2;
  const formatData = useCallback((data: Playlist[]): Playlist[] => {
    const hasEnoughElements = data.length % numColumns === 0;
    if (!hasEnoughElements) {
      const firstIndex = data[0];

      return formatData([...data, { ...firstIndex, id: 0 }]);
    }

    return data;
  }, []);

  const formattedData = useMemo(
    () => formatData(playlists),
    [playlists, formatData],
  );

  const $playlists = (
    <FlatList
      numColumns={numColumns}
      scrollEnabled={false}
      keyExtractor={(playlist: Playlist) => playlist.id.toString()}
      data={formattedData}
      renderItem={({ item: playlist }) => <PlaylistCard {...playlist} />}
    />
  );
  const $noPlaylistsCreated = (
    <YStack {...styles.noPlaylistCreatedMessageContainer}>
      <Text style={styles.noPlaylistCreatedMessage}>No Playlists Created!</Text>
    </YStack>
  );

  return (
    <>
      {dialogIsOpen ? <PlaylistFormDialog setOpen={setDialogIsOpen} /> : <></>}
      <ScrollView style={styles.screen}>
        <XStack {...styles.actionButtons}>
          <Button style={styles.button} onPress={() => setDialogIsOpen(true)}>
            <FontAwesome6 name="add" size={22} color={COLORS.white} />
            <Text style={styles.actionName}>New Playlist</Text>
          </Button>

          <Button style={styles.button} onPress={goToMusicsPage}>
            <MaterialIcons name="headset" size={22} color={COLORS.white} />
            <Text style={styles.actionName}>Your Musics</Text>
          </Button>
        </XStack>

        {!!formattedData.length ? $playlists : $noPlaylistsCreated}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
  },
  actionButtons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
    paddingBottom: 20,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
  },
  button: {
    width: 110,
    height: 110,
    backgroundColor: COLORS.secondaryBlack,
    borderRadius: 5,
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  actionName: {
    fontFamily: "LatoBold",
    color: COLORS.white,
    textAlign: "center",
  },
  noPlaylistCreatedMessage: {
    fontFamily: "LatoSemiBold",
    fontSize: 14,
    color: COLORS.white,
    margin: "auto",
  },
  noPlaylistCreatedMessageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
