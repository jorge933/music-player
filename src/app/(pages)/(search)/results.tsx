import ResultItem from "@/app/components/ResultItem/ResultItem";
import TextInputControlled from "@/app/components/TextInputControlled/TextInputControlled";
import { useFetch } from "@/app/hooks/useFetch";
import { SearchResult } from "@/app/interfaces/SearchResult";
import { COLORS } from "@/constants/Colors";
import { DEFAULT_SEARCH_PARAMS } from "@/constants/DefaultSearchParams";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { ScrollView, Spinner, YGroup } from "tamagui";

export default function Results() {
  const { query }: { query: string } = useLocalSearchParams();
  const { EXPO_PUBLIC_BASE_URL: BASE_URL, EXPO_PUBLIC_API_KEY: API_KEY } =
    process.env;

  const params = new URLSearchParams({
    q: query,
    key: API_KEY,
    ...DEFAULT_SEARCH_PARAMS,
  }).toString();
  const url = `${BASE_URL}/search?${params}`;

  const { data, isFetching } = useFetch<SearchResult>({
    url,
  });

  const inputName = "searchInput";
  const {
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      [inputName as string]: query,
    },
  });

  const inputValue = watch(inputName);
  const goToResultsPage = () =>
    router.replace({
      pathname: "/results",
      params: { query: inputValue },
    });

  return (
    <>
      <View style={{ ...styles.alignInCenter, backgroundColor: COLORS.black }}>
        <TextInputControlled
          control={control}
          errors={errors}
          name={inputName}
          rules={{ required: true }}
          reset={reset}
          inputProps={{
            placeholder: "Search Music...",
            placeholderTextColor: COLORS.transparentWhite,
            selectionColor: COLORS.transparentGreen,
            enterKeyHint: "search",
            onSubmitEditing: goToResultsPage,
          }}
        />
      </View>
      {isFetching ? (
        <View style={{ ...styles.view, ...styles.alignInCenter }}>
          <Spinner color={COLORS.green} size="large" />
        </View>
      ) : (
        <ScrollView style={{ ...styles.view, marginTop: -1 }}>
          <YGroup
            $sm={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            style={{ width: "100%" }}
          >
            {data?.items.map((item) => (
              <ResultItem item={item} key={item.id.videoId} />
            ))}
          </YGroup>
        </ScrollView>
      )}
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
});
