import { COLORS } from "@/constants";
import { View } from "react-native";

export function CustomThumb({
  value,
  thumb,
  minValue,
  maxValue,
}: {
  value: number;
  thumb: "min" | "mid" | "max";
  minValue: number;
  maxValue: number;
}) {
  const borderRadius: Record<string, number> = {};
  const paddingValue = 5;

  const isMin = thumb === "min";

  const borderRadiusStarter = isMin
    ? value - paddingValue
    : value + paddingValue;
  const isAtBoundary = isMin
    ? borderRadiusStarter <= minValue
    : borderRadiusStarter >= maxValue;

  const marginValue = isAtBoundary ? paddingValue * 2 - 1 : 0;

  if (isMin && isAtBoundary) {
    borderRadius.borderTopLeftRadius = 5;
    borderRadius.borderBottomLeftRadius = 5;
  }

  if (!isMin && isAtBoundary) {
    borderRadius.borderTopRightRadius = 5;
    borderRadius.borderBottomRightRadius = 5;
  }

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        paddingHorizontal: paddingValue,
        paddingVertical: 10,
        [isMin ? "marginLeft" : "marginRight"]: marginValue,
        ...borderRadius,
      }}
    />
  );
}
