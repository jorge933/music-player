import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { XStack, YGroup } from "tamagui";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "@/components/Button/Button";
import { SONGS_DIRECTORY } from "@/constants/AppDirectories";
import { COLORS } from "@/constants/Colors";
import { ITEM_STYLES } from "@/constants/ItemStyles";
import { formatISODuration } from "@/helpers/formatISODuration/formatISODuration";
import { formatSecondsToTime } from "@/helpers/formatSecondsToTime/formatSecondsToTime";
import { FileSystemService } from "@/services/fileSystemService";
import { ResultItemProps } from "./ResultItem.types";

export const ResultItem = React.memo(function ResultItem({
  item,
  downloadSong,
  testID,
}: ResultItemProps) {
  const {
    id,
    snippet: { channelTitle, thumbnails, title },
    contentDetails: { duration },
    downloaded,
  } = item;

  const durationInSeconds = formatISODuration(duration);
  const formattedDuration = formatSecondsToTime(durationInSeconds);

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(!!downloaded);
  }, [downloaded]);

  useEffect(() => {
    try {
      const filePath = SONGS_DIRECTORY + id + ".mp3";
      FileSystemService.getInfo(filePath).then(({ exists }) => {
        if (exists) setDisabled(true);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const $children = (
    <View style={ITEM_STYLES.item} testID={testID}>
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
            disabled
            buttonStyles={ITEM_STYLES.downloadButton}
            textStyles={{
              ...ITEM_STYLES.buttonText,
              color: COLORS.secondaryGrey,
            }}
            disabledStyles={{ backgroundColor: "none" }}
            testID="download-button"
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
            onPress={downloadSong}
            buttonStyles={ITEM_STYLES.downloadButton}
            textStyles={ITEM_STYLES.buttonText}
            testID="download-button"
          />
        )}
      </XStack>
    </View>
  );

  return <YGroup.Item children={$children} />;
});
