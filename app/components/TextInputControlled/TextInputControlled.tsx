import { COLORS } from "@/constants/Colors";
import {
  Errors,
  Rules,
  VALIDATION_ERRORS_MESSAGE,
} from "@/constants/ValidationErrorsMessage";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { XStack } from "tamagui";
import { TextInputControlledProps } from "./TextInputControlled.types";

export default function TextInputControlled({
  name,
  control,
  rules,
  inputStyles,
  inputContainerStyles,
  inputProps,
  reset,
}: TextInputControlledProps) {
  const inputRef = useRef<TextInput>(null);

  const resetInput = () => {
    //@ts-ignore
    reset({ [name]: "" });
    inputRef.current?.focus();
  };

  const $resetButton = (
    <Ionicons
      name="close"
      color={COLORS.white}
      size={25}
      onPress={resetInput}
      style={styles.resetButton}
    />
  );

  return (
    <>
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({ field, fieldState: { error } }) => {
          let message: string | undefined;

          if (error) {
            const type = error?.type as keyof Errors;
            const getErrorMessage = VALIDATION_ERRORS_MESSAGE[type];
            message = getErrorMessage(rules as Rules, field.value?.length || 0);
          }

          return (
            <View>
              <XStack
                style={{ ...styles.inputContainer, ...inputContainerStyles }}
              >
                <TextInput
                  value={field.value}
                  style={{ ...styles.input, ...inputStyles }}
                  onChangeText={field.onChange}
                  onBlur={field.onBlur}
                  {...inputProps}
                  ref={inputRef}
                />
                {reset && $resetButton}
              </XStack>
              <Text style={styles.validationErrorText}>{message}</Text>
            </View>
          );
        }}
      />
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
