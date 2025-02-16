import { COLORS } from "@/constants";
import { formatSecondsToTime } from "@/helpers";
import { useSongPlayerControlContext } from "@/hooks/useSongPlayerControlContext/useSongPlayerControlContext";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { XStack, YStack } from "tamagui";
import { Button } from "../Button/Button";
import { PlayerControlsModal } from "../PlayerControlsModal/PlayerControlsModal";

export function PlayerControlsBar() {
  const player = useSongPlayerControlContext();

  const [controlsModalIsOpen, setControlsModalIsOpen] = useState(false);

  const { currentSongPlaying } = player;

  const playedTime = useMemo(() => {
    const rounded = Math.round(currentSongPlaying?.playedSeconds ?? 0);
    const formatted = formatSecondsToTime(rounded);

    return formatted;
  }, [currentSongPlaying?.playedSeconds]);

  const totalTime = useMemo(
    () => formatSecondsToTime(currentSongPlaying?.song.duration ?? 0),
    [currentSongPlaying?.song.duration]
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
      ])
    ).start();
  }, [currentSongPlaying?.song.title]);

  if (!currentSongPlaying?.song) return null;

  const removeDefaultButtonStyles = {
    width: "auto",
    backgroundColor: "none",
    padding: 0,
  };

  const { isPlaying } = currentSongPlaying;
  const pauseIcon = <FontAwesome name="pause" size={20} color={COLORS.white} />;
  const playIcon = <FontAwesome name="play" size={20} color={COLORS.white} />;

  return (
    <>
      {controlsModalIsOpen && (
        <PlayerControlsModal setOpen={setControlsModalIsOpen} />
      )}

      <View
        style={styles.container}
        onTouchEnd={() => setControlsModalIsOpen(true)}
      >
        <XStack style={{ alignItems: "center", gap: 10, width: "45%" }}>
          <AntDesign name="caretup" size={18} color={COLORS.white} />
          <YStack
            style={styles.songInfo}
            className="song-info"
            position="relative"
          >
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
        </XStack>

        <XStack
          alignItems="center"
          onTouchEnd={(event) => event.stopPropagation()}
          className="controls-container"
        >
          <Button
            className="back"
            icon={
              <FontAwesome
                name="step-backward"
                size={20}
                color={COLORS.white}
              />
            }
            buttonStyles={removeDefaultButtonStyles}
            onPress={player.skipToPrevious}
          />

          <Button
            className="pause-or-resume"
            icon={isPlaying ? pauseIcon : playIcon}
            buttonStyles={removeDefaultButtonStyles}
            onPress={player.pauseOrResume}
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
    </>
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
    width: "100%",
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
