import { ReactNode } from "react";

export function BottomTabs({
  components,
  keyboardIsActive,
}: {
  components: ReactNode[];
  keyboardIsActive: boolean;
}) {
  return !keyboardIsActive ? components.map((component) => component) : <></>;
}
