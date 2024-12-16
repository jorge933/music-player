import { COLORS } from "@/constants/Colors";
import { Errors } from "@/hooks/useFormControl/useFormControl.types";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useMemo, useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { XStack } from "tamagui";
import { TextInputWithValidationsProps } from "./TextInputWithValidations.types";
import React from "react";

export function TextInputWithValidations({
  inputStyles,
  inputContainerStyles,
  inputProps,
  control,
  resetButton,
}: TextInputWithValidationsProps) {
  const inputRef = useRef<TextInput>(null);

  const { value, errors, isDirty, handleOnChange, resetValue } = control;

  const firstErrorMessage = useMemo(() => {
    if (!errors || !isDirty) return null;

    const [firstErrorName] = Object.keys(errors) as (keyof Errors)[];

    return errors[firstErrorName];
  }, [errors, isDirty]);

  const resetInputValue = useCallback(() => {
    resetValue();
    inputRef.current?.focus();
  }, [inputRef]);

  return (
    <>
      <XStack style={{ ...styles.inputContainer, ...inputContainerStyles }}>
        <TextInput
          {...inputProps}
          style={{ ...styles.input, ...inputStyles }}
          ref={inputRef}
          value={value}
          onChangeText={handleOnChange}
        />
        {resetButton && (
          <Ionicons
            name="close"
            color={COLORS.white}
            size={25}
            onPress={resetInputValue}
            style={styles.resetButton}
          />
        )}
      </XStack>
      <Text style={styles.validationErrorText}>{firstErrorMessage}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.secondaryBlack,
    borderRadius: 50,
  },
  input: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "none",
    textAlign: "center",
    color: COLORS.white,
  },
  resetButton: {
    position: "relative",
    right: 35,
  },
  validationErrorText: {
    marginTop: 3,
    marginBottom: 7,
    color: COLORS.red,
    fontFamily: "LatoSemiBold",
    textAlign: "center",
  },
});
