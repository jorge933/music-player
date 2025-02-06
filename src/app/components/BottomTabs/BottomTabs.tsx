import { ReactNode } from "react";
import { View } from "react-native";

export function BottomTabs({
  components,
  keyboardIsActive,
}: {
  components: ReactNode[];
  keyboardIsActive: boolean;
}) {
  const $components = components.map((component, index) => (
    <View children={component} key={index.toString()} />
  ));

  return !keyboardIsActive ? $components : <></>;
}
