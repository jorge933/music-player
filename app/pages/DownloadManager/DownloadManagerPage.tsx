import { DownloadCard } from "@/components/DownloadCard/DownloadCard";
import { COLORS } from "@/constants/Colors";
import { useDownloadContext } from "@/hooks/useDownloadContext/useDownloadContext";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView, Text, YGroup, YStack } from "tamagui";

export function DownloadManagerPage() {
  const { queue } = useDownloadContext();

  return (
    <>
      {!queue.length && (
        <YStack height="100%">
          <Text style={styles.noSongsMessage}>Empty Download Queue!</Text>
        </YStack>
      )}

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
    </>
  );
}

const styles = StyleSheet.create({
  noSongsMessage: {
    textAlign: "center",
    color: COLORS.white,
    fontSize: 16,
    fontFamily: "LatoSemiBold",
  },
});
