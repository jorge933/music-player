import { Song } from "@/interfaces/Song";
import { StyleSheet, Text, View } from "react-native";
import { XStack, YStack } from "tamagui";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { COLORS } from "@/constants/Colors";
import { itemStyles } from "../ResultItem/ResultItem";
import Button from "../Button/Button";

export default function SongItem({ title, duration }: Song) {
  return (
    <View style={{ ...itemStyles.item, ...styles.item }}>
      <XStack alignItems="center">
        <AntDesign name="playcircleo" size={22} color={COLORS.green} />
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
      <Button
        icon={<FontAwesome5 name="trash" size={22} color={COLORS.red} />}
        buttonStyles={{
          width: "auto",
          backgroundColor: "none",
          paddingVertical: 0,
          paddingHorizontal: 0,
        }}
      />
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
