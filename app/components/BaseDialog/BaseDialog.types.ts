import { ViewStyle } from "react-native";

export interface CustomDialogProps {
  open: boolean;
  children: ChildrenType;
  title: string;
  dialogStyles?: ViewStyle;
  contentStyles?: ViewStyle;
  setOpen: (newValue: boolean) => void;
  onDialogClose?: () => void;
}

export type ChildrenType = React.JSX.Element | React.JSX.Element[];
