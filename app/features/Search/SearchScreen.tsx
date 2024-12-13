import Button from "@/components/Button/Button";
import TextInputControlled from "@/components/TextInputControlled/TextInputControlled";
import { COLORS } from "@/constants/Colors";
import { useFormControl } from "@/hooks/useFormControl/useFormControl";
import { required } from "@/validators/required";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export function SearchScreen() {
  const control = useFormControl(null, [required]);
  const { value, isValid } = control;

  const router = useRouter();
  const goToResultsPage = () => {
    if (!isValid) return;

    router.replace({
      pathname: "/results",
      params: { query: value },
    });
  };

  return (
    <View style={styles.screen}>
      <TextInputControlled
        control={control}
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
