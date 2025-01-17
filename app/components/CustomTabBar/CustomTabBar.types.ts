import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export type CustomTabBarPros = BottomTabBarProps & {
  keyboardIsActive: boolean;
};

export type TabBarButton = (props: any) => React.JSX.Element;
