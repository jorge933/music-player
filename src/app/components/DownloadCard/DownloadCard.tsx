import { COLORS } from "@/constants/Colors";
import {
  DownloadItem,
  ItemStatus,
} from "@/contexts/download/downloadContext.types";
import { useDownloadContext } from "@/hooks/useDownloadContext/useDownloadContext";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { XStack, YGroup, YStack } from "tamagui";
import { Button } from "../Button/Button";
import { ProgressBar } from "../ProgressBar/ProgressBar";

export function DownloadCard(details: DownloadItem) {
  const downloadManager = useDownloadContext();
  const { removeFromQueue, downloadSong } = downloadManager;

  const { channelTitle, status, title, videoId, progress, abort } = details;

  const statusColors: { [key in ItemStatus]: string } = {
    downloading: COLORS.green,
    error: COLORS.red,
    canceled: COLORS.yellow,
    finished: COLORS.white,
  };
  const statusColor = statusColors[status];
  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  const $abortButton = (
    <Button
      icon={<FontAwesome5 name="stop-circle" size={20} color={COLORS.grey} />}
      onPress={abort}
      buttonStyles={styles.baseButton}
      testID="abort-button"
    />
  );

  const $removeItem = (
    <Button
      icon={<FontAwesome5 name="trash" size={18} color={COLORS.white} />}
      onPress={() => removeFromQueue.apply(downloadManager, [videoId])}
      buttonStyles={styles.baseButton}
      testID="remove-button"
    />
  );

  const $downloadAgain = (
    <Button
      icon={<FontAwesome5 name="sync" size={18} color={COLORS.green} />}
      onPress={() => downloadSong.apply(downloadManager, [details])}
      buttonStyles={{ ...styles.baseButton, ...styles.tryAgainButton }}
      testID="download-again-button"
    />
  );

  return (
    <YGroup.Item>
      <View style={styles.item} className="item">
        <YStack {...styles.informations} className="informations">
          <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">
            {title}
          </Text>

          <Text style={styles.channel}>{channelTitle}</Text>

          <XStack alignItems="center" gap={10}>
            <Text style={styles.title}>{progress}%</Text>
            <ProgressBar
              value={progress}
              containerStyles={{ backgroundColor: COLORS.black }}
            />
          </XStack>

          <Text
            style={[styles.status, { color: statusColor }]}
          >{`Status: ${formattedStatus}`}</Text>
        </YStack>

        <XStack alignItems="center" className="actions">
          {status === ItemStatus.DOWNLOADING && $abortButton}

          {status !== ItemStatus.FINISHED &&
            status !== ItemStatus.DOWNLOADING &&
            $downloadAgain}

          {status !== ItemStatus.DOWNLOADING && $removeItem}
        </XStack>
      </View>
    </YGroup.Item>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "85%",
    minHeight: 130,
    maxHeight: 130,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.secondaryBlack,
    marginVertical: 10,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  informations: {
    maxWidth: "65%",
    height: "100%",
    justifyContent: "space-between",
  },
  baseButton: {
    width: "auto",
    backgroundColor: "none",
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 0,
  },
  title: {
    fontSize: 12,
    color: COLORS.white,
    fontFamily: "LatoSemiBold",
  },
  channel: {
    fontSize: 12,
    color: COLORS.grey,
    fontFamily: "LatoSemiBold",
    marginVertical: 5,
  },
  status: {
    fontSize: 14,
    fontFamily: "LatoBold",
  },
  tryAgainButton: {
    marginRight: 5,
    paddingHorizontal: 5,
  },
});
