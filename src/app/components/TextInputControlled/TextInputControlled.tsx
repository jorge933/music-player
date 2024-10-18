import { COLORS } from "@/constants/Colors";
import {
  Errors,
  VALIDATION_ERRORS_MESSAGE,
} from "@/constants/ValidationErrorsMessage";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TextInputControlledProps } from "./TextInputControlled.types";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";

export default function TextInputControlled({
  name,
  control,
  rules,
  inputStyles,
  inputProps,
  errors,
  reset,
}: TextInputControlledProps) {
  const inputRef = useRef<TextInput>(null);

  const resetInput = () => {
    //@ts-ignore
    reset({ [name]: "" });
    inputRef.current?.focus();
  };

  return (
    <>
      <Controller
        control={control}
        rules={rules}
        defaultValue=""
        name={name}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View style={styles.inputContainer}>
              <TextInput
                value={value}
                style={inputStyles || styles.input}
                onChangeText={onChange}
                onBlur={onBlur}
                {...inputProps}
                ref={inputRef}
              />
              {reset ? (
                <Ionicons
                  name="close"
                  color={COLORS.white}
                  size={25}
                  onPress={resetInput}
                  style={styles.resetButton}
                />
              ) : (
                <></>
              )}
            </View>
          );
        }}
      />
      <Text style={styles.validationErrorText}>
        {VALIDATION_ERRORS_MESSAGE[errors.root?.type as keyof Errors]}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: 300,
    display: "flex",
    flexDirection: "row",
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
    position: "absolute",
    right: 20,
  },
  validationErrorText: {
    marginTop: 5,
    color: COLORS.red,
    fontFamily: "LatoSemiBold",
  },
});
