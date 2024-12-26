import { COLORS } from "@/constants/Colors";
import { ITEM_STYLES } from "@/constants/ItemStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, Text, View } from "react-native";
import { XStack, YStack } from "tamagui";
import { SongItemProps } from "./SongItem.types";
import { useMemo } from "react";
import { formatSecondsToTime } from "@/helpers/formatSecondsToTime";

export function SongItem({ song, actionButton }: SongItemProps) {
  const { title, duration } = song;
  const formattedDuration = useMemo(() => formatSecondsToTime(duration), []);

  return (
    <View style={{ ...ITEM_STYLES.item, ...styles.item }}>
      <XStack alignItems="center">
        <AntDesign name="playcircleo" size={20} color={COLORS.green} />
        <YStack style={{ ...ITEM_STYLES.informations, marginLeft: 10 }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={ITEM_STYLES.title}
          >
            {title}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={ITEM_STYLES.subInformation}
          >
            {formattedDuration}
          </Text>
        </YStack>
      </XStack>

      {actionButton}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
  },
});
