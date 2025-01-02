import { COLORS } from "@/constants/Colors";
import { DownloadItem } from "@/contexts/downloadContext/downloadContext.types";
import { useDownloadContext } from "@/hooks/useDownloadContext/useDownloadContext";
import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { YGroup, YStack } from "tamagui";
import { Button } from "../Button/Button";

export function DownloadCard(details: DownloadItem) {
  const { removeFromQueue, downloadSong } = useDownloadContext();

  const { channelTitle, status, title, abort, videoId } = details;

  const $abortButton = (
    <Button
      icon={<FontAwesome5 name="stop-circle" size={18} color={COLORS.grey} />}
      onPress={abort}
      buttonStyles={styles.baseButton}
    />
  );

  const $removeItem = (
    <Button
      icon={<FontAwesome5 name="trash" size={18} color={COLORS.white} />}
      onPress={() => removeFromQueue(videoId)}
      buttonStyles={styles.baseButton}
    />
  );
  return (
    <YGroup.Item>
      <View style={styles.item}>
        <YStack maxWidth={"80%"}>
          <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.channel}>{channelTitle}</Text>
          <Text style={styles.status}>{`Status: ${status}`}</Text>
        </YStack>

        {status === "downloading" && $abortButton}
        {status !== "finished" && status !== "downloading" && $downloadAgain}
      </View>
    </YGroup.Item>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "80%",
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
    color: COLORS.green,
    fontFamily: "LatoBold",
  },
});
