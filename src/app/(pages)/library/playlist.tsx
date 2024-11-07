import { COLORS } from "@/constants/Colors";
import { Playlist } from "@/interfaces/Playlist";
import { StorageContext } from "@/services/Storage/Storage.service";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { XStack, YStack } from "tamagui";

export default function PlaylistPage() {
  const storageService = useContext(StorageContext);

  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  const convertedId = Number(id);

  const playlistsInStorage = storageService.getItem<string>("playlists");
  const playlists: Playlist[] = JSON.parse(playlistsInStorage);
  const playlist = playlists.find(
    (playlist) => playlist.id == convertedId,
  ) as Playlist;

  const imageSource = playlist.imageUrl
    ? { uri: playlist.imageUrl }
    : require("../../../assets/images/choose-playlist-image.jpg");
  const songsLength = playlist.songs.length;
  const singularOrPlural = songsLength > 1 ? " musics" : " music";

  const hasDescription = !!playlist.description;

  return (
    <View style={styles.view}>
      <XStack>
        <Image source={imageSource} style={styles.image} resizeMode="stretch" />
        <YStack
          {...styles.informations}
          justifyContent={hasDescription ? "space-between" : "flex-start"}
        >
          <Text style={styles.name}>{playlist.name}</Text>

          {playlist.description && (
            <Text
              style={styles.description}
              numberOfLines={8}
              lineBreakMode="tail"
              ellipsizeMode="tail"
              textBreakStrategy="highQuality"
            >
              {playlist.description}
            </Text>
          )}

          <Text
            style={{
              ...styles.musicsAdded,
              marginTop: !hasDescription ? 20 : 0,
            }}
          >
            {songsLength + singularOrPlural}
          </Text>
        </YStack>
      </XStack>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  image: {
    width: 150,
    height: 200,
  },
  informations: {
    marginLeft: 10,
  },
  name: {
    color: COLORS.white,
    fontFamily: "LatoBold",
    fontSize: 20,
  },
  description: {
    maxWidth: "75%",
    color: COLORS.grey,
    fontFamily: "LatoRegular",
    fontSize: 10,
    marginVertical: 20,
  },
  musicsAdded: {
    color: COLORS.white,
    fontFamily: "LatoSemiBold",
    fontSize: 16,
  },
});
