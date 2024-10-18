import { DownloadSong } from "@/services/DownloadSong/DownloadSong.service";
import { COLORS } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { StyleSheet, Text, ToastAndroid } from "react-native";
import { Dialog, Spinner, XStack } from "tamagui";
import Button from "../Button/Button";
import { DownloadDialogProps } from "./DownloadDialog.types";
import * as FileSystem from "expo-file-system";
import { BASE_DOWNLOAD_DIRECTORY } from "@/constants/BaseDownloadDirectory";

export function DownloadDialog({
  dialogIsOpen,
  setDialogIsOpen,
  setDisabled,
  snippet: { title, channelTitle, videoId },
}: DownloadDialogProps) {
  const [downloadEnded, setDownloadEnded] = useState(false);
  const [wasCanceled, setWasCanceled] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (downloadEnded && wasCanceled) {
      const filePath = BASE_DOWNLOAD_DIRECTORY + videoId + ".mp3";

      FileSystem.deleteAsync(filePath);

      setDownloadEnded(false);
      setWasCanceled(false);
      setError(null);
      setDisabled(false);
    }
  }, [downloadEnded]);

  useEffect(() => {
    if (dialogIsOpen) {
      DownloadSong(videoId)
        .catch(setError)
        .finally(() => setDownloadEnded(true));
    }
  }, [dialogIsOpen]);

  useEffect(() => {
    if (!error) return;
    const convertedError = new String(error).toString();
    ToastAndroid?.show(convertedError, 3000);
  }, [error]);

  const closeDialog = (buttonDisabled: boolean) => {
    setDialogIsOpen(false);
    setDisabled(true);
  };
  const cancelDownload = () => {
    closeDialog(false);
    setWasCanceled(true);
  };

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay key="overlay" opacity={0.7} />

        <Dialog.Content
          key="content"
          backgroundColor={COLORS.secondaryBlack}
          width="80%"
        >
          <XStack justifyContent="center" alignItems="center" marginBottom={20}>
            <Dialog.Title color={COLORS.white} size="$8">
              Download
            </Dialog.Title>
            <Button
              icon={
                <MaterialIcons name="close" size={22} color={COLORS.white} />
              }
              buttonStyles={styles.dialogCloseIcon}
              onPress={() => closeDialog(false)}
            />
          </XStack>

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
                onPress={() => closeDialog(false)}
              />
            </>
          ) : (
            <></>
          )}
          {!downloadEnded && !error ? (
            <>
              <Spinner size="large" color={COLORS.white} marginBottom={20} />
              <Button
                buttonStyles={{
                  backgroundColor: COLORS.transparentWhite,
                }}
                title="Cancel"
                onPress={cancelDownload}
              />
            </>
          ) : (
            <></>
          )}
          {downloadEnded && !error ? (
            <>
              <Text>Download concluído</Text>
              <Button
                buttonStyles={{
                  backgroundColor: COLORS.transparentWhite,
                  marginVertical: 20,
                }}
                title="Close"
                onPress={() => closeDialog(true)}
              />
            </>
          ) : (
            <></>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
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
