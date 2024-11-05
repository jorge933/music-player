import Button from "@/components/Button/Button";
import ResultItem from "@/components/ResultItem/ResultItem";
import TextInputControlled from "@/components/TextInputControlled/TextInputControlled";
import { COLORS } from "@/constants/Colors";
import { useFetch } from "@/hooks/useFetch";
import { VideoInformations } from "@/interfaces/VideoInformations";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import { ScrollView, Spinner, YGroup, YStack } from "tamagui";

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
    router.push({
      pathname: "/results",
      params: { query: inputValue },
    });

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
      ) : error ? (
        $errorInSearch
      ) : (
        $searchResult
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
