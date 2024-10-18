import Button from "@/components/Button/Button";
import TextInputControlled from "@/components/TextInputControlled/TextInputControlled";
import { COLORS } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export default function Search() {
  const {
    control,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
  });
  const inputName = "searchInput";

  const inputValue = watch(inputName);

  const router = useRouter();
  const goToResultsPage = () =>
    router.replace({
      pathname: "/results",
      params: { query: inputValue },
    });

  return (
    <View style={styles.screen}>
      <TextInputControlled
        control={control}
        errors={errors}
        rules={{ required: true }}
        name={inputName}
        inputProps={{
          placeholder: "Search Music...",
          placeholderTextColor: COLORS.transparentWhite,
          selectionColor: COLORS.transparentGreen,
          enterKeyHint: "search",
          onSubmitEditing: goToResultsPage,
        }}
      />
      <Button
        title="Search"
        buttonStyles={{ marginTop: 20 }}
        disabled={!isValid}
        onPress={goToResultsPage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.black,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
