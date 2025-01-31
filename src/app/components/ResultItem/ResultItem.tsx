import React, { useEffect, useRef, useState } from "react";
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
import { ResultItemProps, States } from "./ResultItem.types";

export const ResultItem = React.memo(function ResultItem({
  item,
  downloadSong,
  testID,
}: ResultItemProps) {
  const {
    id,
    snippet: { channelTitle, thumbnails, title },
    contentDetails: { duration },
    downloading,
  } = item;

  const downloadState = useRef<States>("available");
  const [disabled, setDisabled] = useState(false);
  const buttonStates: Record<States, any> = {
    available: { iconName: "download-for-offline", title: "Download" },
    downloaded: { iconName: "download-done", title: "Downloaded" },
    downloading: { iconName: "download-done", title: "Downloading..." },
  };

  const durationInSeconds = formatISODuration(duration);
  const formattedDuration = formatSecondsToTime(durationInSeconds);

  const updateButtonState = (state: States) => {
    const disabled = state !== "available";

    setDisabled(disabled);

    downloadState.current = state;
  };

  useEffect(() => {
    if (downloading && downloadState.current !== "downloading")
      updateButtonState("downloading");
  }, [downloading]);

  useEffect(() => {
    try {
      const filePath = SONGS_DIRECTORY + id + ".mp3";
      FileSystemService.existsPath(filePath).then((exists) => {
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

        <Button
          title={buttonStates[downloadState.current].title}
          icon={
            <MaterialIcons
              name={buttonStates[downloadState.current].iconName as any}
              size={22}
              color={disabled ? COLORS.secondaryGrey : COLORS.green}
            />
          }
          disabled={disabled}
          onPress={downloadSong}
          buttonStyles={ITEM_STYLES.downloadButton}
          disabledStyles={{ backgroundColor: "none" }}
          textStyles={{
            ...ITEM_STYLES.buttonText,
            ...{ color: disabled ? COLORS.secondaryGrey : COLORS.green },
          }}
          testID="download-button"
        />
      </XStack>
    </View>
  );

  return <YGroup.Item children={$children} />;
});
