import Button from "@/components/Button/Button";
import { COLORS } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { XStack, YGroup } from "tamagui";
import { ResultItemProps } from "./ResultItem.types";
import * as FileSystem from "expo-file-system";
import { DOWNLOAD_DIRECTORY } from "@/constants/AppDirectories";

export function ResultItem({ item, downloadSong }: ResultItemProps) {
  const {
    id,
    snippet: { channelTitle, thumbnails, title },
    downloaded,
  } = item;

  const [disabled, setDisabled] = useState(downloaded);

  const isBoolean = typeof downloaded === "boolean";

  if (!isBoolean) {
    const filePath = DOWNLOAD_DIRECTORY + id + ".mp3";

    FileSystem.getInfoAsync(filePath).then(({ exists }) => {
      if (exists) setDisabled(true);
    });
  }

  const $children = (
    <View style={itemStyles.item}>
      <Image
        source={{
          uri: thumbnails.default.url,
        }}
        style={itemStyles.thumbnail}
      />
      <XStack flexDirection="column" style={itemStyles.informations}>
        <Text style={itemStyles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text
          style={itemStyles.subInformation}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {channelTitle}
        </Text>

        {disabled ? (
          <Button
            title="Downloaded"
            icon={
              <MaterialIcons
                name="download-done"
                size={22}
                color={COLORS.secondaryGrey}
                style={{ marginRight: 5 }}
              />
            }
            disabled={true}
            onPress={downloadSong}
            buttonStyles={itemStyles.downloadButton}
            textStyles={{
              ...itemStyles.buttonText,
              color: COLORS.secondaryGrey,
            }}
            disabledStyles={{ backgroundColor: "none" }}
          />
        ) : (
          <Button
            title="Download"
            icon={
              <MaterialIcons
                name="download-for-offline"
                size={22}
                color={COLORS.green}
                style={{ marginRight: 5 }}
              />
            }
            disabled={false}
            onPress={downloadSong}
            buttonStyles={itemStyles.downloadButton}
            textStyles={itemStyles.buttonText}
          />
        )}
      </XStack>
    </View>
  );

  return <YGroup.Item children={$children} />;
}

export const itemStyles = StyleSheet.create({
  item: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: COLORS.secondaryBlack,
    marginVertical: 20,
  },
  thumbnail: {
    width: 75,
    height: "100%",
    marginRight: 10,
  },
  informations: {
    width: "80%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    color: COLORS.white,
    fontFamily: "LatoSemiBold",
    fontSize: 14,
    marginTop: 5,
  },
  subInformation: {
    color: COLORS.grey,
    fontFamily: "LatoRegular",
    fontSize: 10,
  },
  downloadButton: {
    width: 100,
    backgroundColor: "none",
    justifyContent: "flex-start",
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 10,
    fontFamily: "LatoSemiBold",
    color: COLORS.green,
  },
});
