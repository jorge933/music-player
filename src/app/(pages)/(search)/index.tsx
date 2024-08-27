import Button from "@/app/components/Button/Button";
import TextInputControlled from "@/app/components/TextInputControlled/TextInputControlled";
import { Errors } from "@/app/components/TextInputControlled/TextInputControlled.types";
import { COLORS } from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

export default function Search() {
  const {
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onChange",
  });
  const inputName = "searchInput";

  const inputValue = watch(inputName);
  const [isValid, setIsValid] = useState(inputValue);

  useEffect(() => setIsValid(!!inputValue), [inputValue]);

  const router = useRouter();
  const findResults = () =>
    router.replace({
      pathname: "/results" as never,
      params: { query: inputValue },
    });

  return (
    <View style={styles.screen}>
      <TextInputControlled
        control={control}
        errors={errors as Errors}
        rules={{ required: true }}
        name={inputName}
        inputProps={{
          placeholder: "Search Music...",
          placeholderTextColor: COLORS.transparentWhite,
          selectionColor: COLORS.transparentGreen,
        }}
      />
      <Button
        title="Search"
        buttonStyles={{ marginTop: 20 }}
        disabled={!isValid}
        onPress={findResults}
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
