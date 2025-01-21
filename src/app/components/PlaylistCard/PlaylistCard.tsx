import { COLORS } from "@/constants/Colors";
import { Playlist } from "@/interfaces/Playlist";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { YStack } from "tamagui";

export const PlaylistCard = React.memo(function PlaylistCard({
  imageUri: imageUrl,
  id,
  name,
  songs,
}: Playlist) {
  const router = useRouter();

  const isEmpty = id === 0;
  const image = imageUrl
    ? { uri: imageUrl }
    : require("@assets/images/default-playlist-image.jpg");
  const singularOrPlural = songs.length > 1 ? "musics" : "music";

  const emptyStyles = isEmpty ? styles.empty : {};

  const goToPlaylistPage = useCallback(() => {
    if (isEmpty) return;

    router.push({
      pathname: "/(tabs)/playlist",
      params: { id },
    });
  }, [id, isEmpty]);

  return (
    <YStack
      {...styles.card}
      {...emptyStyles}
      onPress={goToPlaylistPage}
      testID="playlist-card"
    >
      <Image
        source={image}
        style={styles.image}
        alt="Playlist Image"
        testID="image"
      />

      <Text style={styles.name}>{name}</Text>

      <Text style={styles.numberOfSongsAdded}>
        {`${songs.length} ${singularOrPlural}`}
      </Text>
    </YStack>
  );
});

const styles = StyleSheet.create({
  card: {
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
