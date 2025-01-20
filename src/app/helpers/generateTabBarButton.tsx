import { TabBarButton } from "@/components/TabBarButton/TabBarButton";

export function generateTabBarButton(
  title: string,
  iconName: string,
  focused: boolean,
  href?: string,
) {
  return (
    <TabBarButton
      title={title}
      iconName={iconName}
      href={href}
      focused={focused}
    />
  );
}
