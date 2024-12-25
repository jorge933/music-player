/* eslint-disable react-hooks/exhaustive-deps */
import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Button } from "@/components/Button/Button";
import { SONGS_DIRECTORY } from "@/constants/AppDirectories";
import { COLORS } from "@/constants/Colors";
import { formatSecondsToTime } from "@/helpers/format-seconds-to-time";
import { SongService } from "@/services/songService/songService";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, ToastAndroid } from "react-native";
import { Spinner, XStack } from "tamagui";
import { DownloadDialogProps } from "./DownloadDialog.types";

export function DownloadDialog({
  videoDetails: { title, channelTitle, videoId, duration },
  onDialogClose,
}: DownloadDialogProps) {
  const songService = new SongService();

  const [downloadEnded, setDownloadEnded] = useState(false);
  const [wasCanceled, setWasCanceled] = useState(false);
  const [error, setError] = useState<unknown>();

  let downloadSong: Promise<void>;
  const toastAlreadyShowed = useRef<boolean>(false);

  useEffect(() => {
    if (!downloadEnded || !!error || wasCanceled) return;

    songService.saveSong({
      title,
      id: videoId,
      duration,
      path: SONGS_DIRECTORY + videoId + ".mp3",
    });
  }, [downloadEnded]);

  useEffect(() => {
    downloadSong = songService.downloadSong(videoId);

    downloadSong.catch(setError);
    downloadSong.finally(() => setDownloadEnded(true));
  }, []);

  useEffect(() => {
    if (!error || wasCanceled || toastAlreadyShowed.current) return;
    console.error(error);

    const convertedError = new String(error).toString();

    ToastAndroid?.show(convertedError, ToastAndroid.LONG);

    toastAlreadyShowed.current = true;
  }, [error]);

  const cancelDownload = () => {
    setWasCanceled(true);

    downloadSong.finally(() => songService.delete(videoId));
  };

  const closeDialog = () => {
    if (!downloadEnded) {
      cancelDownload();
    }

    const downloadedWithSuccess = downloadEnded && !wasCanceled && !error;

    onDialogClose(downloadedWithSuccess);
  };

  const formattedDuration = useMemo(() => formatSecondsToTime(duration), []);

  return (
    <BaseDialog
      open={true}
      setOpen={closeDialog}
      title="Download"
      onDialogClose={closeDialog}
    >
      <XStack flexDirection="column">
        <Text
          style={{ ...styles.videoTitle, maxWidth: "80%" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text
          style={{ ...styles.channel, maxWidth: "80%" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {channelTitle}
        </Text>
        <Text style={{ ...styles.duration }}>{formattedDuration}</Text>
      </XStack>

      {error ? (
        <>
          <Text style={styles.errorAlert}>Ocorreu um erro no download</Text>
          <Button
            buttonStyles={{
              backgroundColor: COLORS.transparentWhite,
            }}
            title="Close"
            closeDialog
          />
        </>
      ) : (
        <></>
      )}
      {!downloadEnded && !wasCanceled && !error ? (
        <>
          <Spinner size="large" color={COLORS.white} marginVertical={20} />
          <Button
            buttonStyles={{
              backgroundColor: COLORS.transparentWhite,
            }}
            title={downloadEnded ? "Close" : "Cancel"}
            closeDialog
          />
        </>
      ) : (
        <></>
      )}
      {downloadEnded && !wasCanceled && !error ? (
        <>
          <Text style={styles.concludedMessage}>
            Concluded
            <Feather name="check" size={22} color={COLORS.white} />
          </Text>

          <Button
            buttonStyles={{
              backgroundColor: COLORS.transparentWhite,
              marginVertical: 20,
            }}
            title="Close"
            closeDialog
          />
        </>
      ) : (
        <></>
      )}
    </BaseDialog>
  );
}

const styles = StyleSheet.create({
  dialogCloseIcon: {
    width: "auto",
    backgroundColor: COLORS.transparentWhite,
    paddingHorizontal: 3,
    paddingVertical: 2,
    position: "absolute",
    right: 0,
  },
  videoTitle: {
    color: COLORS.white,
    fontFamily: "LatoSemiBold",
    fontSize: 15,
  },
  channel: {
    color: COLORS.grey,
    fontFamily: "LatoRegular",
    fontSize: 12,
    marginVertical: 10,
  },
  duration: {
    color: COLORS.white,
    fontFamily: "LatoRegular",
    fontSize: 10,
  },
  errorAlert: {
    fontFamily: "LatoSemiBold",
    color: COLORS.red,
    fontSize: 12,
    marginVertical: 20,
  },
  concludedMessage: {
    marginTop: 10,
    fontFamily: "LatoSemiBold",
    fontSize: 14,
    color: COLORS.white,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
  },
});
