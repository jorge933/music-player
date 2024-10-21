import { VideoInformations } from "@/interfaces/SearchResult";
import { COLORS } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { XStack, YGroup } from "tamagui";
import Button from "../Button/Button";
import { DownloadDialog } from "../DownloadDialog/DownloadDialog";
import { BASE_DOWNLOAD_DIRECTORY } from "@/constants/BaseDownloadDirectory";

export default function ResultItem({
  item: {
    snippet: { channelTitle, thumbnails, title },
    id,
  },
}: {
  item: VideoInformations;
}) {
  const [disabled, setDisabled] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const onPress = () => {
    setDialogIsOpen(true);
    setDisabled(true);
  };

  const filePath = BASE_DOWNLOAD_DIRECTORY + id + ".mp3";

  FileSystem.getInfoAsync(filePath).then(({ exists }) => {
    if (exists) setDisabled(true);
  });

  const $children = (
    <View style={styles.item}>
      <Image
        source={{
          uri: thumbnails.default.url,
        }}
        style={styles.thumbnail}
      />
      <XStack flexDirection="column" style={styles.informations}>
        <Text style={styles.videoTitle} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.channel} numberOfLines={1} ellipsizeMode="tail">
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
            onPress={onPress}
            buttonStyles={styles.downloadButton}
            textStyles={{
              ...styles.buttonText,
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
            disabled={disabled}
            onPress={onPress}
            buttonStyles={styles.downloadButton}
            textStyles={styles.buttonText}
          />
        )}
      </XStack>
    </View>
  );

  return (
    <>
      {dialogIsOpen ? (
        <DownloadDialog
          dialogIsOpen={dialogIsOpen}
          setDialogIsOpen={setDialogIsOpen}
          setDisabled={setDisabled}
          snippet={{ title, channelTitle, videoId: id }}
        />
      ) : (
        <></>
      )}
      <YGroup.Item children={$children} />
    </>
  );
}

const styles = StyleSheet.create({
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
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  videoTitle: {
    maxWidth: "85%",
    color: COLORS.white,
    fontFamily: "LatoSemiBold",
    fontSize: 14,
    marginTop: 5,
  },
  channel: {
    maxWidth: "85%",
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
