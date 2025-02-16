/* eslint-disable react-hooks/exhaustive-deps */
import { useSongPlayerControlContext } from "@/hooks/useSongPlayerControlContext/useSongPlayerControlContext";
import { BaseDialog } from "../BaseDialog/BaseDialog";
import { useEffect, useMemo, useRef, useState } from "react";
import { PlaylistService, SongService } from "@/services";
import { Playlist } from "@/interfaces";
import { Image, StyleSheet, Text } from "react-native";
import { DialogHeader } from "../DialogHeader/DialogHeader";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import { XStack, YStack } from "tamagui";
import { Slider } from "@react-native-assets/slider";
import { Button } from "../Button/Button";
import { formatSecondsToTime } from "@/helpers";

export function PlayerControlsModal({
  setOpen,
}: {
  setOpen: (newValue: boolean) => void;
}) {
  const player = useSongPlayerControlContext();
  const playlistService = new PlaylistService();
  const songService = new SongService();

  const {
    currentSongPlaying: { playedSeconds, isPlaying, song, playlistId },
  } = player;

  const [playedSecondsState, setPlayedSeconds] = useState(playedSeconds);
  const isSliding = useRef(false);

  useEffect(() => {
    if (!isSliding.current) setPlayedSeconds(playedSeconds);
  }, [playedSeconds]);

  const playlist = useMemo((): Playlist => {
    if (playlistId === 0) {
      const songs = songService.getAll().map(({ id }) => id);
      return {
        id: 0,
        name: "All Songs",
        songs,
      };
    } else return playlistService.getById(playlistId) as Playlist;
  }, [playlistId]);

  const imageSource = playlist.imageUri
    ? { uri: playlist.imageUri }
    : require("@assets/images/default-playlist-image.jpg");

  const closeDialogIcon = (
    <Button
      buttonStyles={{
        ...styles.removeDefaultButtonStyles,
        position: "absolute",
        right: 0,
      }}
      icon={<AntDesign name="caretdown" size={18} color={COLORS.white} />}
      closeDialog
    />
  );
  const header = (
    <DialogHeader icon={closeDialogIcon} title="Player Controls" />
  );

  const handleOnCompleteSliding = (value: number) => {
    player.seekTo(value);

    isSliding.current = false;
  };

  const formattedPlayedSeconds = formatSecondsToTime(
    Math.round(playedSecondsState)
  );
  const formattedDuration = useMemo(
    () => formatSecondsToTime(song.duration),
    []
  );

  const baseIconProperties = { size: 24, color: COLORS.white };
  const pauseIcon = <FontAwesome name="pause" {...baseIconProperties} />;
  const playIcon = <FontAwesome name="play" {...baseIconProperties} />;

  const actionButtonStyles = {
    ...styles.removeDefaultButtonStyles,
    ...styles.actionButton,
  };

  return (
    <BaseDialog
      open={true}
      setOpen={setOpen}
      customHeader={header}
      contentStyles={styles.modalContent}
    >
      <YStack width="100%">
        <Text style={styles.songInformations}>
          Playing{" "}
          <Text style={styles.title} numberOfLines={3}>
            {song.title}
          </Text>{" "}
          from <Text style={styles.title}>{playlist.name}</Text>
        </Text>

        <Image source={imageSource} style={styles.image} />

        <XStack style={styles.positionControlContainer}>
          <Text style={styles.songPlayedSeconds}>{formattedPlayedSeconds}</Text>

          <Slider
            style={{ width: "75%" }}
            maximumValue={song.duration}
            value={playedSecondsState}
            step={1}
            trackStyle={{ backgroundColor: COLORS.transparentWhite }}
            thumbTintColor={COLORS.green}
            onSlidingStart={() => (isSliding.current = true)}
            onSlidingComplete={handleOnCompleteSliding}
            onValueChange={setPlayedSeconds}
          />

          <Text style={styles.songPlayedSeconds}>{formattedDuration}</Text>
        </XStack>

        <XStack style={styles.controlsContainer} className="controls-container">
          <Button
            icon={<FontAwesome name="step-backward" {...baseIconProperties} />}
            buttonStyles={{ ...actionButtonStyles, paddingHorizontal: 15 }}
            onPress={player.skipToPrevious}
          />

          <Button
            icon={isPlaying ? pauseIcon : playIcon}
            buttonStyles={{ ...actionButtonStyles, paddingVertical: 11 }}
            onPress={player.pauseOrResume}
          />

          <Button
            icon={<FontAwesome name="step-forward" {...baseIconProperties} />}
            buttonStyles={{ ...actionButtonStyles, paddingHorizontal: 15 }}
            onPress={player.skipToNext}
          />
        </XStack>
      </YStack>
    </BaseDialog>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },
  removeDefaultButtonStyles: {
    width: "auto",
    backgroundColor: COLORS.transparentWhite,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  songInformations: {
    height: 70,
    fontFamily: "LatoRegular",
    color: COLORS.grey,
    fontSize: 16,
    textAlign: "center",
  },
  title: {
    fontFamily: "LatoBold",
    color: COLORS.white,
  },
  image: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  positionControlContainer: {
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  songPlayedSeconds: {
    color: COLORS.white,
    fontFamily: "LatoSemiBold",
  },
  controlsContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 13,
  },
});
