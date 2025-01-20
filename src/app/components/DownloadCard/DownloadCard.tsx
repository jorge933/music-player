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

export function DownloadCard(details: DownloadItem) {
  const { removeFromQueue, downloadSong } = useDownloadContext();

  const { channelTitle, status, title, abort, videoId } = details;

  const statusColors: { [key in Partial<ItemStatus>]?: string } = {
    downloading: COLORS.green,
    error: COLORS.red,
    canceled: COLORS.yellow,
  };
  const statusColor = statusColors[status] || COLORS.white;
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
      onPress={() => removeFromQueue(videoId)}
      buttonStyles={styles.baseButton}
      testID="remove-button"
    />
  );

  const $downloadAgain = (
    <Button
      icon={<FontAwesome5 name="sync" size={18} color={COLORS.green} />}
      onPress={() => downloadSong(details)}
      buttonStyles={{ ...styles.baseButton, ...styles.tryAgainButton }}
      testID="download-again-button"
    />
  );

  return (
    <YGroup.Item>
      <View style={styles.item}>
        <YStack maxWidth={"90%"}>
          <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.channel}>{channelTitle}</Text>
          <Text
            style={[styles.status, { color: statusColor }]}
          >{`Status: ${formattedStatus}`}</Text>
        </YStack>

        <XStack alignItems="center">
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.secondaryBlack,
    marginVertical: 10,
    paddingHorizontal: 25,
    paddingVertical: 15,
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
