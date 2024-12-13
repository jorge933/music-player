import Button from "@/components/Button/Button";
import { COLORS } from "@/constants/Colors";
import { useFetch } from "@/hooks/useFetch/useFetch";
import { VideoInformations } from "@/interfaces/VideoInformations";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { ScrollView, Spinner, YGroup, YStack } from "tamagui";
import { ResultItem } from "@/components/ResultItem/ResultItem";
import { DownloadDialog } from "./components/DownloadDialog/DownloadDialog";
import { VideoDetails } from "./components/DownloadDialog/DownloadDialog.types";
import { SearchInput } from "./components/SearchInput/SearchInput";
import { Result } from "./interfaces/results.types";
import { formatISODurationToSeconds } from "@/functions/formatISODuration";
import { formatSecondsToTime } from "@/functions/formatSecondsToTime";

export function ResultsScreen() {
  const { query }: { query: string } = useLocalSearchParams();
  const { EXPO_PUBLIC_SERVER_URL: SERVER_URL } = process.env;

  const [results, setResults] = useState<Result[] | null>();
  const [$downloadDialog, setDownloadDialog] =
    useState<React.JSX.Element | null>();

  const url = `${SERVER_URL}?query=${query}`;
  const { data, error, isFetching, fetchData } = useFetch<VideoInformations[]>(
    {
      url,
    },
    query,
  );

  useEffect(() => setResults(data), [data]);

  useEffect(() => {
    if (!error) return;
    const convertedError = String(error);
    ToastAndroid?.show(convertedError, 3000);
  }, [error]);

  const updateDownloadStatus = (id: string) => {
    return results?.map((item) => {
      const isDownloadedVideo = item.id === id;

      return { ...item, downloaded: isDownloadedVideo };
    });
  };

  const onDialogClose = (success: boolean, id: string) => {
    if (success) {
      const downloadStatusUpdated = updateDownloadStatus(id);
      setResults(downloadStatusUpdated);
    }

    setDownloadDialog(null);
  };

  const createDownloadDialog = (details: VideoDetails) => (
    <DownloadDialog
      onDialogClose={(success) => onDialogClose(success, details.videoId)}
      videoDetails={details}
    />
  );

  const openDownloadDialog = (item: Result) => {
    const { snippet, contentDetails } = item;

    const formattedISO = formatISODurationToSeconds(contentDetails.duration);
    const formattedDuration = formatSecondsToTime(formattedISO);

    const details: VideoDetails = {
      channelTitle: snippet.channelTitle,
      duration: formattedDuration,
      title: snippet.title,
      videoId: item.id,
    };

    const $downloadDialog = createDownloadDialog(details);
    setDownloadDialog($downloadDialog);
  };

  const $searchResult = (
    <ScrollView style={{ ...styles.view, marginTop: -1 }}>
      <YGroup
        $sm={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        style={{ width: "100%" }}
      >
        {results?.map((item) => (
          <ResultItem
            item={item}
            downloadSong={() => openDownloadDialog(item)}
            key={item.id}
          />
        ))}
      </YGroup>
    </ScrollView>
  );

  const $errorInSearch: any = (
    <YStack {...styles.errorMessageContainer}>
      <Text style={styles.errorMessage}>Error In Search</Text>
      <Button title="Retry" buttonStyles={{ width: 200 }} onPress={fetchData} />
    </YStack>
  );

  const $fetching = (
    <View style={{ ...styles.view, ...styles.alignInCenter }}>
      <Spinner color={COLORS.green} size="large" />
    </View>
  );

  const $noResultFounded = (
    <Text style={styles.noResults}>No Results Founded!</Text>
  );

  return (
    <View>
      {$downloadDialog}

      <SearchInput defaultValue={query} />

      {isFetching && $fetching}

      {!isFetching && error && $errorInSearch}

      {!isFetching && !error && !!results?.length && $searchResult}

      {!isFetching && !error && !data?.length && $noResultFounded}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    backgroundColor: COLORS.black,
  },
  alignInCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  errorMessageContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: "LatoBold",
    fontSize: 15,
    marginBottom: 20,
  },
  noResults: {
    color: COLORS.white,
  },
});
