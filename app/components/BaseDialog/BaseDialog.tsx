import { COLORS } from "@/constants/Colors";
import React from "react";
import { Dialog, XStack } from "tamagui";
import { ChildrenType, CustomDialogProps } from "./BaseDialog.types";
import Button from "../Button/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

export default function BaseDialog({
  open,
  setOpen,
  children,
  title,
  onDialogClose,
}: CustomDialogProps) {
  const closeDialog = () => {
    setOpen(false);
    if (onDialogClose) onDialogClose();
  };

  const renderChildrenWithEvent = (children: ChildrenType) =>
    React.Children.map(children, (element): ChildrenType => {
      const { props } = element;
      const isValidElement = React.isValidElement(element);

      if (isValidElement && props.closeDialog) {
        const customOnPress = () => {
          closeDialog();
          if (props.onPress) props.onPress();
        };

        const cloneElement = React.cloneElement(element, {
          ["onPress" as string]: customOnPress,
        });

        return cloneElement;
      }

      if (props?.children) {
        return React.cloneElement(element, {
          children: renderChildrenWithEvent(props?.children),
        });
      }

      return element;
    });

  const childrenMap = renderChildrenWithEvent(children);

  const $dialogHeader = (
    <XStack justifyContent="center" alignItems="center" marginBottom={20}>
      <Dialog.Title color={COLORS.white} size="$8">
        {title}
      </Dialog.Title>
      <Button
        icon={<MaterialIcons name="close" size={22} color={COLORS.white} />}
        buttonStyles={styles.dialogCloseIcon}
        onPress={closeDialog}
      />
    </XStack>
  );

  return (
    <Dialog open={open}>
      <Dialog.Portal>
        <Dialog.Overlay key="overlay" opacity={0.7} />

        <Dialog.Content key="content" backgroundColor={COLORS.secondaryBlack}>
          {$dialogHeader}
          {childrenMap}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  dialogCloseIcon: {
    width: "auto",
    backgroundColor: COLORS.transparentWhite,
    paddingHorizontal: 3,
    paddingVertical: 2,
    position: "absolute",
    right: 0,
  },
});
