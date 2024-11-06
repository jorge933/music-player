import { COLORS } from "@/constants/Colors";
import {
  Errors,
  VALIDATION_ERRORS_MESSAGE,
} from "@/constants/ValidationErrorsMessage";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TextInputControlledProps } from "./TextInputControlled.types";

export default function TextInputControlled({
  name,
  control,
  rules,
  inputStyles,
  inputContainerStyles,
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
        name={name}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <View style={{ ...styles.inputContainer, ...inputContainerStyles }}>
              <TextInput
                value={value}
                style={{ ...styles.input, ...inputStyles }}
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
