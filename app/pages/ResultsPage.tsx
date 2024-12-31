/* eslint-disable expo/no-env-var-destructuring */
import { Button } from "@/components/Button/Button";
import { COLORS } from "@/constants/Colors";
import { useFetch } from "@/hooks/useFetch/useFetch";
import { VideoInformations } from "@/interfaces/VideoInformations";
import { useLocalSearchParams } from "expo-router";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { ScrollView, Spinner, YGroup, YStack } from "tamagui";
import { ResultItem } from "@/components/ResultItem/ResultItem";
import { DownloadDialog } from "@/components/DownloadDialog/DownloadDialog";
import { VideoDetails } from "@/components/DownloadDialog/DownloadDialog.types";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import { formatISODurationToSeconds } from "@/helpers/formatISODuration";
import { getEnvironmentVariables } from "@/helpers/getEnvironmentVariables";
import { Result } from "@/components/ResultItem/ResultItem.types";
import { useToastsContext } from "@/hooks/useToastsContext/useToastsContext";

export function ResultsPage() {
  const { query }: { query: string } = useLocalSearchParams();
  const { SERVER_URL } = getEnvironmentVariables("SERVER_URL");
  const toastActions = useToastsContext();

  const [results, setResults] = useState<Result[] | null>();
  const [$downloadDialog, setDownloadDialog] =
    useState<React.JSX.Element | null>();

  const url = `${SERVER_URL}?query=${query}`;
  const { data, error, isFetching, fetchData } = useFetch<VideoInformations[]>({
    url,
  });

  useEffect(() => setResults(data), [data]);

  useEffect(() => {
    if (!error) return;
    const convertedError = String(error);
    toastActions.error(`Error on search: ${convertedError}`, 3000);
  }, [error]);

  useEffect(() => fetchData(), [query]);

  const updateDownloadStatus = useCallback(
    (id: string) => {
      return results?.map((item) => {
        const isDownloadedVideo = item.id === id;

        return { ...item, downloaded: isDownloadedVideo };
      });
    },
    [results],
  );

  const onDialogClose = useCallback(
    (success: boolean, id: string) => {
      if (success) {
        const downloadStatusUpdated = updateDownloadStatus(id);
        setResults(downloadStatusUpdated);
      }
      setDownloadDialog(null);
    },
    [updateDownloadStatus],
  );

  const returnDownloadDialogWithProps = useCallback(
    (details: VideoDetails) => (
      <DownloadDialog
        onDialogClose={(success) => onDialogClose(success, details.videoId)}
        videoDetails={details}
      />
    ),
    [onDialogClose],
  );

  const openDownloadDialog = useCallback(
    (item: Result) => {
      const { snippet, contentDetails } = item;

      const durationInSeconds = formatISODurationToSeconds(
        contentDetails.duration,
      );

      const details: VideoDetails = {
        channelTitle: snippet.channelTitle,
        duration: durationInSeconds,
        title: snippet.title,
        videoId: item.id,
      };

      const $downloadDialog = returnDownloadDialogWithProps(details);
      setDownloadDialog($downloadDialog);
    },
    [returnDownloadDialogWithProps],
  );

  const $searchResult = useMemo(
    () => (
      <ScrollView style={{ ...styles.view, marginTop: -1 }}>
        <YGroup
          $sm={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 0,
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
    ),
    [results, openDownloadDialog],
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
    <>
      {$downloadDialog}

      <SearchInput defaultValue={query} />

      {isFetching && $fetching}

      {!isFetching && error && $errorInSearch}

      {!isFetching && !error && !!results?.length && $searchResult}

      {!isFetching && !error && !data?.length && $noResultFounded}
    </>
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
