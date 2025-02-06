import { COLORS } from "@/constants";
import { formatSecondsToTime } from "@/helpers";
import { useSongPlayerControlContext } from "@/hooks/useSongPlayerControlContext/useSongPlayerControlContext";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { XStack, YStack } from "tamagui";
import { Button } from "../Button/Button";

export function SongPlayerControls() {
  const player = useSongPlayerControlContext();

  const { currentSongPlaying } = player;

  const playedTime = useMemo(() => {
    const rounded = Math.round(currentSongPlaying?.playedSeconds ?? 0);
    const formatted = formatSecondsToTime(rounded);

    return formatted;
  }, [currentSongPlaying?.playedSeconds]);

  const totalTime = useMemo(
    () => formatSecondsToTime(currentSongPlaying?.song.duration ?? 0),
    [currentSongPlaying?.song.duration],
  );

  const translateX = useRef(new Animated.Value(0)).current;
  const title = currentSongPlaying?.song.title || "";

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: -(title.length * 9),
          duration: title.length * 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [currentSongPlaying?.song.title]);

  if (!currentSongPlaying?.song) return null;

  const removeDefaultButtonStyles = {
    width: "auto",
    backgroundColor: "none",
    padding: 0,
  };

  return (
    <View style={styles.container}>
      <YStack style={styles.songInfo} className="song-info" position="relative">
        <Animated.Text
          style={[
            styles.songTitle,
            { transform: [{ translateX }], width: title.length * 10 },
          ]}
          numberOfLines={1}
        >
          {title}
        </Animated.Text>

        <Text
          style={styles.songDuration}
        >{`${playedTime} - ${totalTime}`}</Text>
      </YStack>

      <XStack alignItems="center" className="controls-container">
        <Button
          className="back"
          icon={
            <FontAwesome name="step-backward" size={20} color={COLORS.white} />
          }
          buttonStyles={removeDefaultButtonStyles}
          onPress={player.skipToPrevious}
        />

        <Button
          className="pause-or-resume"
          icon={<FontAwesome name="pause" size={20} color={COLORS.white} />}
          buttonStyles={removeDefaultButtonStyles}
        />
        <Button
          className="forward"
          icon={
            <FontAwesome name="step-forward" size={20} color={COLORS.white} />
          }
          buttonStyles={removeDefaultButtonStyles}
          onPress={player.skipToNext}
        />
      </XStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    margin: "auto",
    backgroundColor: "#6e6565",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  songInfo: {
    width: "50%",
    overflow: "hidden",
    alignItems: "flex-start",
  },
  songTitle: {
    fontSize: 16,
    fontFamily: "LatoBold",
    color: COLORS.white,
    textAlign: "left",
    transform: [{ translateX: -200 }],
  },
  songDuration: {
    fontSize: 14,
    color: COLORS.grey,
    fontFamily: "LatoRegular",
  },
});
