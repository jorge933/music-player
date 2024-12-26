import { ReactElement } from "react";
import { ViewStyle } from "react-native";

export interface ChildrenProps {
  onPress?: () => void;
  closeDialog?: boolean;
  children?: React.ReactElement;
}
export type ChildrenType =
  | ReactElement<ChildrenProps>
  | ReactElement<ChildrenProps>[];

export interface CustomDialogProps {
  open: boolean;
  children: ChildrenType;
  title: string;
  dialogStyles?: ViewStyle;
  contentStyles?: ViewStyle;
  setOpen: (newValue: boolean) => void;
  onDialogClose?: () => void;
}
