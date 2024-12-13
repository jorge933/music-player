import TextInputControlled from "@/components/TextInputControlled/TextInputControlled";
import { COLORS } from "@/constants/Colors";
import { useFormControl } from "@/hooks/useFormControl/useFormControl";
import { isInitialValue } from "@/validators/isInitialValue";
import { required } from "@/validators/required";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export function SearchInput({ defaultValue }: { defaultValue: string }) {
  const control = useFormControl(defaultValue, [
    required,
    isInitialValue(defaultValue),
  ]);
  const { value, isValid } = control;

  const goToResultsPage = () => {
    if (!isValid) return;

    router.push({
      pathname: "/results",
      params: { query: value },
    });
  };

  return (
    <View style={{ ...styles.alignInCenter, backgroundColor: COLORS.black }}>
      <TextInputControlled
        control={control}
        resetButton={true}
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
