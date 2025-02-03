import { DownloadCard } from "@/components/DownloadCard/DownloadCard";
import { MessageContainer } from "@/components/MessageContainer/MessageContainer";
import { COLORS } from "@/constants/Colors";
import { useDownloadContext } from "@/hooks/useDownloadContext/useDownloadContext";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView, Text, YGroup } from "tamagui";

export function DownloadManagerPage() {
  const { queue } = useDownloadContext();

  const $items = (
    <ScrollView>
      <YGroup
        $sm={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 0,
        }}
        style={{ width: "100%" }}
      >
        {queue.map((item) => (
          <DownloadCard {...item} key={item.videoId} />
        ))}
      </YGroup>
    </ScrollView>
  );

  const $emptyMessage = (
    <MessageContainer>
      <Text style={styles.noSongsMessage}>Empty Download Queue!</Text>
    </MessageContainer>
  );

  return queue.length ? $items : $emptyMessage;
}

const styles = StyleSheet.create({
  noSongsMessage: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "LatoSemiBold",
  },
});
