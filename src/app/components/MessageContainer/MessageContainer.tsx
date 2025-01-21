import { YStack, YStackProps } from "tamagui";

export function MessageContainer({
  children,
  style,
}: {
  children: any;
  style?: YStackProps;
}) {
  return (
    <YStack
      height="100%"
      justifyContent="center"
      alignItems="center"
      {...style}
    >
      {children}
    </YStack>
  );
}
