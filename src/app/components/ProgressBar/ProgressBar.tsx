import { COLORS } from "@/constants";
import { Text } from "react-native";
import { StyleSheet, View, ViewStyle } from "react-native";

export function ProgressBar({
  value,
  containerStyles,
  progressStyles,
}: {
  value: number;
  containerStyles?: ViewStyle;
  progressStyles?: ViewStyle;
}) {
  return (
    <View style={[styles.container, containerStyles]} className="bar">
      <View
        className="progress"
        style={[styles.progress, progressStyles, { width: `${value}%` }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS.secondaryBlack,
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: COLORS.green,
  },
});
