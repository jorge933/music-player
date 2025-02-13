import { DownloadCard } from "@/components/DownloadCard/DownloadCard";
import { MessageContainer } from "@/components/MessageContainer/MessageContainer";
import { COLORS } from "@/constants/Colors";
import { useDownloadContext } from "@/hooks";
import { useLazyLoadData } from "@/hooks/useLazyLoadData/useLazyLoadData";
import { executeCallbackOnScroll } from "@/utils/executeCallbackOnScroll";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView, Text, YGroup } from "tamagui";

export function DownloadManagerPage() {
  const { queue } = useDownloadContext();

  const getData = (init: number, limit: number) =>
    queue.slice(init, init + limit);
  const limit = 10;
  const { data: lazyQueue, getDataAndUpdate } = useLazyLoadData(
    getData,
    limit,
    [queue]
  );

  const handleScroll = executeCallbackOnScroll(getDataAndUpdate);

  const $items = (
    <ScrollView onScroll={handleScroll} scrollEventThrottle={40}>
      <YGroup
        $sm={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 0,
        }}
        style={{ width: "100%" }}
      >
        {lazyQueue.map((item) => (
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
