import Button from "@/components/Button/Button";
import { COLORS } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { StyleSheet, Text, View } from "react-native";
import { XStack, YStack } from "tamagui";
import { itemStyles } from "../../../../components/ResultItem/ResultItem";
import { SongItemProps } from "./SongItem.types";

export default function SongItem({ song, deleteSong }: SongItemProps) {
  const { title, duration, id } = song;
  return (
    <View style={{ ...itemStyles.item, ...styles.item }}>
      <XStack alignItems="center">
        <AntDesign name="playcircleo" size={20} color={COLORS.green} />
        <YStack style={{ ...itemStyles.informations, marginLeft: 10 }}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={itemStyles.title}>
            {title}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={itemStyles.subInformation}
          >
            {duration}
          </Text>
        </YStack>
      </XStack>
      {deleteSong ? (
        <Button
          icon={<FontAwesome5 name="trash" size={18} color={COLORS.red} />}
          onPress={() => deleteSong(id)}
          buttonStyles={{
            width: "auto",
            backgroundColor: "none",
            paddingVertical: 0,
            paddingHorizontal: 0,
          }}
        />
      ) : (
        <></>
      )}
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
