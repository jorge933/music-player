import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Button } from "@/components/Button/Button";
import { SONGS_DIRECTORY } from "@/constants/AppDirectories";
import { COLORS } from "@/constants/Colors";
import { useStorage } from "@/hooks/useStorage/useStorage";
import { Song } from "@/interfaces/Song";
import { Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, ToastAndroid } from "react-native";
import { Spinner, XStack } from "tamagui";
import { DownloadDialogProps } from "./DownloadDialog.types";
import React from "react";
import { SongService } from "@/services/songService/songService";

export function DownloadDialog({
  videoDetails: { title, channelTitle, videoId, duration },
  onDialogClose,
}: DownloadDialogProps) {
  const storage = useStorage();
  const songService = new SongService();

  const [downloadEnded, setDownloadEnded] = useState(false);
  const [wasCanceled, setWasCanceled] = useState(false);
  const [error, setError] = useState<unknown>();

  let downloadSong: Promise<void>;
  const toastAlreadyShowed = useRef<boolean>(false);

  useEffect(() => {
    downloadSong = songService.downloadSong({ title, duration, id: videoId });
    downloadSong.catch(setError).finally(() => setDownloadEnded(true));
  }, []);

  useEffect(() => {
    if (!downloadEnded || wasCanceled || error) return;

    const songs = storage.getItem<Song[]>("songs") || [];
    const path = SONGS_DIRECTORY + videoId + ".mp3";

    songs.push({ id: videoId, path, title, duration });

    storage.setItem("songs", songs);
  }, [downloadEnded, duration, error, storage, title, videoId, wasCanceled]);

  useEffect(() => {
    if (!error || wasCanceled || toastAlreadyShowed.current) return;
    console.error(error);

    const convertedError = new String(error).toString();

    ToastAndroid?.show(convertedError, ToastAndroid.LONG);

    toastAlreadyShowed.current = true;
  }, [error]);

  const cancelDownload = () => {
    setWasCanceled(true);

    downloadSong.finally(() => {
      const filePath = SONGS_DIRECTORY + videoId + ".mp3";
      FileSystem.deleteAsync(filePath);
    });
  };

  const closeDialog = () => {
    if (!downloadEnded) {
      cancelDownload();
    }

    const downloadedWithSuccess = downloadEnded && !wasCanceled && !error;

    onDialogClose(downloadedWithSuccess);
  };

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
        <Text style={{ ...styles.duration }}>{duration}</Text>
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
