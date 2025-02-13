import { COLORS } from "@/constants/Colors";
import { ITEM_STYLES } from "@/constants/ItemStyles";
import { formatSecondsToTime } from "@/helpers/formatSecondsToTime/formatSecondsToTime";
import { Foundation } from "@expo/vector-icons";
import { useCallback, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { XStack, YStack } from "tamagui";
import { SongItemProps } from "./SongItem.types";
import { useSongPlayerControl } from "@/hooks/useSongPlayerControl/useSongPlayerControl";
import { useSongPlayerControlContext } from "@/hooks/useSongPlayerControlContext/useSongPlayerControlContext";

export function SongItem({
  song,
  actionButton,
  listPosition,
  playlistId,
}: SongItemProps) {
  const playerControl = useSongPlayerControlContext();

  const { title, duration, id } = song;
  const formattedDuration = useMemo(() => formatSecondsToTime(duration), []);

  const { currentSongPlaying } = playerControl;
  const isSameSong = song.id === currentSongPlaying?.song.id;
  const isSamePlaylist = playlistId === currentSongPlaying?.playlistId;
  const isPlaying = isSameSong && isSamePlaylist;

  const $icon = (
    <Foundation
      name={isPlaying ? "graph-bar" : "play-circle"}
      size={20}
      color={COLORS.green}
      testID="icon-play"
    />
  );
  const $listPosition = <Text style={styles.listPosition}>{listPosition}</Text>;

  const color = isPlaying ? COLORS.green : COLORS.white;

  const handleTouchEnd = useCallback(() => {
    if (typeof playlistId !== "number") return;

    playerControl.play(id, playlistId);
  }, []);

  return (
    <View style={[ITEM_STYLES.item, styles.item]} onTouchEnd={handleTouchEnd}>
      <XStack alignItems="center">
        {listPosition && !isPlaying ? $listPosition : $icon}
        <YStack style={styles.informations}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[ITEM_STYLES.title, { color }]}
          >
            {title}
          </Text>

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={ITEM_STYLES.subInformation}
          >
            {formattedDuration}
          </Text>
        </YStack>
      </XStack>

      {actionButton}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
  },
  informations: {
    ...ITEM_STYLES.informations,
    width: "80%",
    marginLeft: 10,
  },
  listPosition: {
    color: COLORS.grey,
    fontSize: 16,
    fontFamily: "LatoRegular",
  },
});
