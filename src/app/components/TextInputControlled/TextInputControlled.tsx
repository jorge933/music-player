import { COLORS } from "@/constants/Colors";
import { ERRORS_MESSAGE } from "@/constants/ValidationErrorsMessage";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput } from "react-native";
import { TextInputControlledProps } from "./TextInputControlled.types";

export default function TextInputControlled({
  name,
  control,
  rules,
  inputStyles,
  inputProps,
  errors,
}: TextInputControlledProps) {
  return (
    <>
      <Controller
        control={control}
        rules={rules}
        defaultValue={""}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <TextInput
              value={value}
              style={inputStyles || styles.input}
              onChangeText={onChange}
              onBlur={onBlur}
              {...inputProps}
            />
          );
        }}
      />
      <Text style={styles.validationErrorText}>
        {ERRORS_MESSAGE[errors[name]?.type]}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.secondaryBlack,
    borderRadius: 50,
    textAlign: "center",
    color: COLORS.white,
  },
  validationErrorText: {
    marginTop: 5,
    color: COLORS.red,
    fontFamily: "LatoSemiBold",
  },
});
