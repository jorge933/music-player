import { StyleProp, ViewStyle } from "react-native";

export interface LazyDataScrollProps {
  getData: (init: number, limit: number) => any[];
  render: (item: any) => React.JSX.Element;
  limit?: number;
  style?: StyleProp<ViewStyle>;
}
