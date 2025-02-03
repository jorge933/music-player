/* eslint-disable react-hooks/exhaustive-deps */
import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Button } from "@/components/Button/Button";
import { COLORS } from "@/constants/Colors";
import { formatSecondsToTime } from "@/helpers/formatSecondsToTime/formatSecondsToTime";
import { useDownloadContext } from "@/hooks/useDownloadContext/useDownloadContext";
import React, { useMemo, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import { YStack } from "tamagui";
import { DownloadDialogProps } from "./DownloadDialog.types";

export function DownloadDialog({
  videoDetails,
  onDialogClose,
}: DownloadDialogProps) {
  const downloadManager = useDownloadContext();
  const addedInQueue = useRef(false);

  const closeDialog = () => {
    onDialogClose(addedInQueue.current);
  };

  const addInQueue = () => {
    downloadManager.downloadSong(videoDetails);
    addedInQueue.current = true;
  };

  const { title, channelTitle, duration } = videoDetails;

  const formattedDuration = useMemo(() => formatSecondsToTime(duration), []);

  return (
    <BaseDialog
      open={true}
      setOpen={closeDialog}
      title="Download"
      onDialogClose={closeDialog}
      testID="download-dialog"
    >
      <YStack>
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
        <Button
          title="Download"
          closeDialog
          onPress={addInQueue}
          buttonStyles={{ marginTop: 50 }}
          testID="download-button"
        />
        <Button
          buttonStyles={{
            backgroundColor: COLORS.transparentWhite,
            marginVertical: 10,
          }}
          title="Close"
          closeDialog
        />
      </YStack>
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
