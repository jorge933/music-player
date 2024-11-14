import { DOWNLOAD_DIRECTORY } from "@/constants/AppDirectories";
import { COLORS } from "@/constants/Colors";
import { Song } from "@/interfaces/Song";
import { DownloadSong } from "@/services/DownloadSong/DownloadSong.service";
import { StorageContext } from "@/services/Storage/Storage.service";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, ToastAndroid } from "react-native";
import { Dialog, Spinner, XStack } from "tamagui";
import BaseDialog from "../BaseDialog/BaseDialog";
import Button from "../Button/Button";
import { DownloadDialogProps } from "./DownloadDialog.types";

export function DownloadDialog({
  dialogIsOpen,
  setDialogIsOpen,
  setDisabled,
  snippet: { title, channelTitle, videoId, duration },
}: DownloadDialogProps) {
  const storageService = useContext(StorageContext);

  const [downloadEnded, setDownloadEnded] = useState(false);
  const [wasCanceled, setWasCanceled] = useState(false);
  const [error, setError] = useState<unknown>();

  const downloadSong = DownloadSong(videoId);

  downloadSong.catch(setError).finally(() => setDownloadEnded(true));

  useEffect(() => {
    if (!downloadEnded || wasCanceled || error) return;

    const storedSongs = storageService.getItem<string>("songs") || "[]";
    const songs: Song[] = JSON.parse(storedSongs);
    const path = DOWNLOAD_DIRECTORY + videoId + ".mp3";

    songs.push({ id: videoId, path, title, duration });

    const songsToString = JSON.stringify(songs);

    storageService.setItem("songs", songsToString);
  }, [downloadEnded]);

  useEffect(() => {
    if (!error) return;
    const convertedError = new String(error).toString();
    ToastAndroid?.show(convertedError, 3000);
    setDisabled(false);
  }, [error]);

  const cancelDownload = () => {
    setWasCanceled(true);

    downloadSong.finally(() => {
      const filePath = DOWNLOAD_DIRECTORY + videoId + ".mp3";
      FileSystem.deleteAsync(filePath);
    });
  };

  const onDialogClose = () => {
    if (!downloadEnded) {
      cancelDownload();
    }

    const downloadedWithSuccess = downloadEnded && !wasCanceled && !error;

    setDisabled(downloadedWithSuccess);
  };

  return (
    <BaseDialog
      open={dialogIsOpen}
      setOpen={setDialogIsOpen}
      title="Download"
      onDialogClose={onDialogClose}
    >
      <XStack flexDirection="column">
        <Text
          style={{ ...styles.videoTitle, maxWidth: "100%" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text
          style={{ ...styles.channel, maxWidth: "100%" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {channelTitle}
        </Text>
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
            title="Cancel"
            closeDialog
          />
        </>
      ) : (
        <></>
      )}
      {downloadEnded && !wasCanceled && !error ? (
        <>
          <Text>Download concluído</Text>
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
    fontSize: 12,
  },
  channel: {
    color: COLORS.grey,
    fontFamily: "LatoRegular",
    fontSize: 10,
  },
  errorAlert: {
    fontFamily: "LatoSemiBold",
    color: COLORS.red,
    fontSize: 12,
    marginVertical: 20,
  },
});
