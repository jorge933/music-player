import { GestureResponderEvent, Image, StyleSheet, Text } from "react-native";
import { XStack, YStack } from "tamagui";
import { Button } from "../Button/Button";
import { SimpleLineIcons } from "@expo/vector-icons";
import { PlaylistHeaderProps } from "./PlaylistHeader.types";
import { COLORS } from "@/constants";
import { useMemo } from "react";
import { Song } from "@/interfaces";
import { formatSecondsToPlaylistDuration } from "@/helpers/formatSecondsToPlaylistDuration";

export function PlaylistHeader({
  playlist,
  songService,
  imageSource,
  toggleOptions,
}: PlaylistHeaderProps) {
  const playlistDurationInSeconds = useMemo(() => {
    const duration = playlist?.songs.reduce((total, songId) => {
      const { duration } = songService.getById(songId) as Song;

      return duration + total;
    }, 0);

    return duration;
  }, [playlist]) as number;

  const formattedDuration = formatSecondsToPlaylistDuration(
    playlistDurationInSeconds,
  );

  const songsLength = playlist.songs.length;

  const singularOrPlural = songsLength > 1 ? " musics" : " music";

  const handleToggleOptionsPress = (event: GestureResponderEvent) => {
    event.preventDefault();

    toggleOptions();
  };

  return (
    <XStack width="100%" testID="playlist-details">
      <Image
        source={imageSource}
        alt="Playlist Image"
        testID="image"
        style={styles.image}
        resizeMode="stretch"
      />

      <YStack
        {...styles.informations}
        justifyContent={playlist.description ? "space-between" : "flex-start"}
        className="informations"
      >
        <XStack {...styles.informationsTop}>
          <Text style={styles.name} numberOfLines={1} lineBreakMode="tail">
            {playlist.name}
          </Text>

          <Button
            testID="toggle-options-button"
            buttonStyles={styles.optionsButton}
            icon={
              <SimpleLineIcons
                name="options-vertical"
                size={22}
                color={COLORS.white}
                style={{ marginRight: 20, marginLeft: 10 }}
              />
            }
            onPress={handleToggleOptionsPress}
          />
        </XStack>

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
            marginTop: !playlist.description ? 20 : 0,
          }}
        >
          {songsLength + singularOrPlural}
          {formattedDuration && `, ${formattedDuration}`}
        </Text>
      </YStack>
    </XStack>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "50%",
    height: 220,
  },
  informations: {
    width: "60%",
    marginLeft: 10,
  },
  informationsTop: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    maxWidth: "75%",
    color: COLORS.white,
    fontFamily: "LatoBold",
    fontSize: 20,
  },
  optionsButton: {
    width: "auto",
    backgroundColor: "none",
    paddingLeft: 10,
    position: "absolute",
    right: 0,
  },
  description: {
    maxWidth: "70%",
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
