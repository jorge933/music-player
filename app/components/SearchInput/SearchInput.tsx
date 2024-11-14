import { StyleSheet, View } from "react-native";
import TextInputControlled from "../TextInputControlled/TextInputControlled";
import { COLORS } from "@/constants/Colors";
import { useForm } from "react-hook-form";
import { router } from "expo-router";

export default function SearchInput({
  defaultValue,
}: {
  defaultValue?: string;
}) {
  const inputName = "searchInput";
  const { control, reset, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      [inputName as string]: defaultValue,
    },
  });

  const inputValue = watch(inputName);
  const goToResultsPage = () =>
    router.push({
      pathname: "/results",
      params: { query: inputValue },
    });
  return (
    <View style={{ ...styles.alignInCenter, backgroundColor: COLORS.black }}>
      <TextInputControlled
        control={control}
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
  );
}

const styles = StyleSheet.create({
  alignInCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
