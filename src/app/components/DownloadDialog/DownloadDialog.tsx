/* eslint-disable react-hooks/exhaustive-deps */
import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Button } from "@/components/Button/Button";
import { COLORS } from "@/constants/Colors";
import { formatSecondsToTime } from "@/helpers/formatSecondsToTime/formatSecondsToTime";
import { useDownloadContext } from "@/hooks/useDownloadContext/useDownloadContext";
import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { XStack, YStack } from "tamagui";
import { DownloadDialogProps } from "./DownloadDialog.types";
import { RangeSlider } from "@react-native-assets/slider";
import { View } from "react-native";
import { SongTimeRange } from "@/contexts/download/downloadContext.types";
import { CustomThumb } from "../CustomThumb/CustomThumb";

export function DownloadDialog({
  videoDetails,
  onDialogClose,
}: DownloadDialogProps) {
  const downloadManager = useDownloadContext();
  const addedInQueue = useRef(false);

  const { title, channelTitle, duration } = videoDetails;

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(duration);
  const minValue = 0;

  const formattedDuration = useMemo(() => formatSecondsToTime(duration), []);
  const formattedStart = useMemo(() => formatSecondsToTime(start), [start]);
  const formattedEnd = useMemo(() => formatSecondsToTime(end), [end]);

  const closeDialog = () => {
    onDialogClose(addedInQueue.current);
  };

  const addInQueue = () => {
    downloadManager.downloadSong({ ...videoDetails, start, end });
    addedInQueue.current = true;
  };

  return (
    <BaseDialog
      open={true}
      setOpen={closeDialog}
      title="Download"
      onDialogClose={closeDialog}
      testID="download-dialog"
      contentStyles={{ maxWidth: "85%" }}
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

        <RangeSlider
          step={1}
          minimumValue={minValue}
          maximumValue={duration}
          trackHeight={4}
          thumbSize={15}
          slideOnTap={true}
          style={styles.rangeSlider}
          onValueChange={([newStartValue, newEndValue]) => {
            if (newStartValue !== start) setStart(newStartValue);
            if (newEndValue !== end) setEnd(newEndValue);
          }}
          CustomThumb={({ thumb, value }) => (
            <CustomThumb
              thumb={thumb}
              value={value}
              minValue={minValue}
              maxValue={duration}
            />
          )}
          CustomTrack={({ length }) => (
            <View
              style={{
                width: `${length}%`,
              }}
            />
          )}
        />
        <XStack width="100%" justifyContent="space-between">
          <Text style={styles.timeText}>{formattedStart}</Text>
          <Text style={styles.timeText}>{formattedEnd}</Text>
        </XStack>

        <Button
          title="Download"
          closeDialog
          onPress={addInQueue}
          buttonStyles={{ marginTop: 30 }}
          testID="download-button"
        />
        <Button
          buttonStyles={{
            backgroundColor: COLORS.transparentWhite,
            marginTop: 10,
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
  rangeSlider: {
    maxHeight: 10,
    maxWidth: "100%",
    backgroundColor: COLORS.transparentGreen,
    marginTop: 30,
    borderRadius: 5,
  },
  timeText: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.secondaryGrey,
    backgroundColor: COLORS.grey,
    color: COLORS.white,
  },
});
