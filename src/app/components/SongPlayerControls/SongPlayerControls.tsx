import { COLORS } from "@/constants";
import { SongPlayerControlContext } from "@/contexts/songPlayerControl/songPlayerControlContext";
import { SongPlayerControl } from "@/hooks/useSongPlayerControl/useSongPlayerControl";
import { FontAwesome } from "@expo/vector-icons";
import { useContext, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { XStack, YStack } from "tamagui";
import { Button } from "../Button/Button";
import { formatSecondsToTime } from "@/helpers";

export function SongPlayerControls() {
  const { currentSongPlaying } = useContext(
    SongPlayerControlContext,
  ) as SongPlayerControl;

  const playedTime = useMemo(() => {
    const rounded = Math.round(currentSongPlaying?.playedSeconds ?? 0);
    const formatted = formatSecondsToTime(rounded);

    return formatted;
  }, [currentSongPlaying?.playedSeconds]);

  const totalTime = useMemo(
    () => formatSecondsToTime(currentSongPlaying?.song.duration ?? 0),
    [currentSongPlaying?.song.duration],
  );

  if (!currentSongPlaying?.song) return null;

  const removeDefaultButtonStyles = {
    width: "auto",
    backgroundColor: "none",
    padding: 0,
  };

  return (
    <View style={styles.container}>
      <YStack alignItems="center" className="song-info">
        <Text style={styles.songTitle}>{currentSongPlaying.song.title}</Text>
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
  songTitle: {
    fontSize: 16,
    fontFamily: "LatoBold",
    color: COLORS.white,
  },
  songDuration: {
    fontSize: 14,
    color: COLORS.grey,
    fontFamily: "LatoRegular",
  },
});
