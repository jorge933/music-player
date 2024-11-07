import { COLORS } from "@/constants/Colors";
import { Playlist } from "@/interfaces/Playlist";
import { router } from "expo-router";
import { Image, StyleSheet, Text } from "react-native";
import { YStack } from "tamagui";

export default function PlaylistItem({ imageUrl, id, name, songs }: Playlist) {
  const isEmpty = id === 0;
  let image;

  imageUrl
    ? (image = { uri: imageUrl })
    : (image = require("../../../assets/images/choose-playlist-image.jpg"));

  const songsLength = songs.length;
  const singularOrPlural = songsLength > 1 ? " musics" : " music";

  const emptyStyles = isEmpty ? styles.empty : {};

  const goToPlaylistPage = () => {
    if (isEmpty) return;

    router.push({
      pathname: "/(pages)/library/playlist" as `${string}:${string}`,
      params: { id },
    });
  };

  return (
    <YStack {...styles.item} {...emptyStyles} onPress={goToPlaylistPage}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.numberOfSongsAdded}>
        {songsLength + singularOrPlural}
      </Text>
    </YStack>
  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: "auto",
    marginBottom: 20,
  },
  empty: {
    opacity: 0,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  name: {
    color: COLORS.white,
    fontFamily: "LatoSemiBold",
    marginLeft: 5,
  },
  numberOfSongsAdded: {
    color: COLORS.grey,
    fontFamily: "LatoRegular",
    marginLeft: 5,
  },
});
