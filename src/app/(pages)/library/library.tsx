import CreatePlaylistDialog from "@/components/CreatePlaylistDialog/CreatePlaylistDialog";
import PlaylistItem from "@/components/PlaylistItem/PlaylistItem";
import { COLORS } from "@/constants/Colors";
import { Playlist } from "@/interfaces/Playlist";
import { StorageContext } from "@/services/Storage/Storage.service";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text } from "react-native";
import { Button, XStack } from "tamagui";

export default function Library() {
  const storageService = useContext(StorageContext);

  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const goToMusicsPage = () => router.navigate("/library/musics");

  const playlistsInStorage =
    storageService.getItem<string>("playlists") || "[]";
  const playlists: Playlist[] = JSON.parse(playlistsInStorage);

  const numColumns = 2;
  const formatData = (data: Playlist[]): Playlist[] => {
    const hasEnoughElements = data.length % numColumns === 0;
    if (!hasEnoughElements) {
      const firstIndex = data[0];

      data.push({ ...firstIndex, id: 0 });

      return formatData(data);
    }

    return data;
  };
  const formattedData = formatData(playlists);

  return (
    <>
      {dialogIsOpen ? (
        <CreatePlaylistDialog setOpen={setDialogIsOpen} />
      ) : (
        <></>
      )}
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

        <FlatList
          numColumns={2}
          style={styles.list}
          scrollEnabled={false}
          keyExtractor={(playlist: Playlist) => playlist.id.toString()}
          data={formattedData}
          renderItem={({ item: playlist }) => <PlaylistItem {...playlist} />}
        />
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
  list: {},
});
