import { XStack } from "tamagui";
import { StyleSheet, Text } from "react-native";
import { Button } from "../Button/Button";
import { COLORS } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

export function DialogHeader({ title }: { title: string }) {
  return (
    <XStack {...styles.header}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      <Button
        icon={<MaterialIcons name="close" size={22} color={COLORS.white} />}
        buttonStyles={styles.dialogCloseIcon}
        closeDialog
        testID="close-dialog-icon"
      />
    </XStack>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    width: "80%",
    textAlign: "center",
    color: COLORS.white,
    fontSize: 20,
    fontFamily: "LatoExtraBold",
  },
  dialogCloseIcon: {
    width: "auto",
    backgroundColor: COLORS.transparentWhite,
    paddingHorizontal: 3,
    paddingVertical: 2,
    right: 0,
  },
});
