import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export type CustomTabBarPros = BottomTabBarProps & {
  keyboardActive: boolean;
};

export type TabBarButton = (props: any) => React.JSX.Element;
