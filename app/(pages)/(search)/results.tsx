import Button from "@/components/Button/Button";
import { ResultItem } from "./components/ResultItem/ResultItem";
import { COLORS } from "@/constants/Colors";
import { useFetch } from "@/hooks/useFetch";
import { VideoInformations } from "@/interfaces/VideoInformations";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { ScrollView, Spinner, YGroup, YStack } from "tamagui";
import { SearchInput } from "./components/SearchInput/SearchInput";

export default function Results() {
  const { query }: { query: string } = useLocalSearchParams();
  const { EXPO_PUBLIC_SERVER_URL: SERVER_URL } = process.env;

  const url = `${SERVER_URL}?query=${query}`;
  const { data, error, isFetching, fetchData } = useFetch<VideoInformations[]>(
    {
      url,
    },
    query,
  );

  useEffect(() => {
    if (!error) return;
    const convertedError = new String(error).toString();
    ToastAndroid?.show(convertedError, 3000);
  }, [error]);

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
        {data?.map((item) => <ResultItem item={item} key={item.id} />)}
      </YGroup>
    </ScrollView>
  );
  const $errorInSearch = (
    <YStack {...styles.errorMessageContainer}>
      <Text style={styles.errorMessage}>Error In Search</Text>
      <Button title="Retry" buttonStyles={{ width: 200 }} onPress={fetchData} />
    </YStack>
  );
  const $onFetch = (
    <View style={{ ...styles.view, ...styles.alignInCenter }}>
      <Spinner color={COLORS.green} size="large" />
    </View>
  );
  const $fetchFinished = error ? $errorInSearch : $searchResult;

  return (
    <>
      <SearchInput defaultValue={query} />

      {isFetching ? $onFetch : $fetchFinished}
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
});
