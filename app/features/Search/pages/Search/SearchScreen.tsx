import { Button } from "@/components/Button/Button";
import { TextInputWithValidations } from "@/components/TextInputWithValidations/TextInputWithValidations";
import { COLORS } from "@/constants/Colors";
import { useFormControl } from "@/hooks/useFormControl/useFormControl";
import { required } from "@/validators/required";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";

export function SearchScreen() {
  const control = useFormControl(null, [required]);
  const { value, isValid } = control;

  const router = useRouter();
  const goToResultsPage = useCallback(() => {
    if (!isValid) return;

    router.replace({
      pathname: "/results",
      params: { query: value },
    });
  }, [isValid, value, router]);

  return (
    <View style={styles.screen}>
      <TextInputWithValidations
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
