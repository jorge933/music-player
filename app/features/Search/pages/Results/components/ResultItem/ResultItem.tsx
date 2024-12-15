import Button from "@/components/Button/Button";
import { DOWNLOAD_DIRECTORY } from "@/constants/AppDirectories";
import { COLORS } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { XStack, YGroup } from "tamagui";
import { ResultItemProps } from "./ResultItem.types";
import { formatISODurationToSeconds } from "@/helpers/formatISODuration";
import { formatSecondsToTime } from "@/helpers/formatSecondsToTime";
import { ITEM_STYLES } from "@/constants/ItemStyles";

export function ResultItem({ item, downloadSong }: ResultItemProps) {
  const {
    id,
    snippet: { channelTitle, thumbnails, title },
    contentDetails: { duration },
    downloaded,
  } = item;
  const durationInSeconds = formatISODurationToSeconds(duration);
  const formattedDuration = formatSecondsToTime(durationInSeconds);

  const [disabled, setDisabled] = useState(!!downloaded);

  const filePath = DOWNLOAD_DIRECTORY + id + ".mp3";

  FileSystem.getInfoAsync(filePath).then(({ exists }) => setDisabled(exists));

  useEffect(() => setDisabled(!!downloaded), [downloaded]);

  const $children = (
    <View style={ITEM_STYLES.item}>
      <Image
        source={{
          uri: thumbnails.default.url,
        }}
        style={ITEM_STYLES.thumbnail}
      />
      <XStack flexDirection="column" style={ITEM_STYLES.informations}>
        <Text style={ITEM_STYLES.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text
          style={ITEM_STYLES.subInformation}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {formattedDuration}
        </Text>
        <Text
          style={ITEM_STYLES.subInformation}
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
            buttonStyles={ITEM_STYLES.downloadButton}
            textStyles={{
              ...ITEM_STYLES.buttonText,
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
            buttonStyles={ITEM_STYLES.downloadButton}
            textStyles={ITEM_STYLES.buttonText}
          />
        )}
      </XStack>
    </View>
  );

  return <YGroup.Item children={$children} />;
}
