import { COLORS } from "@/constants/Colors";
import React, { ReactElement, useCallback, useMemo } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { DialogHeader } from "../DialogHeader/DialogHeader";
import { ChildrenType, CustomDialogProps } from "./BaseDialog.types";

export function BaseDialog({
  open,
  children,
  title,
  dialogStyles,
  contentStyles,
  testID,
  customHeader,
  setOpen,
  onDialogClose,
}: CustomDialogProps) {
  const closeDialog = useCallback(
    (closedByExternalButton?: boolean) => {
      setOpen(false);

      if (onDialogClose) onDialogClose(closedByExternalButton);
    },
    [onDialogClose, setOpen],
  );

  const renderChildrenWithEvent = useCallback(
    (children: ChildrenType) =>
      React.Children.map(children, (element): ChildrenType => {
        const { props } = element;
        const isValidElement = React.isValidElement(element);

        if (isValidElement && props.closeDialog) {
          const customOnPress = () => {
            closeDialog(true);
            if (props.onPress) props.onPress();
          };

          const cloneElement = React.cloneElement(element, {
            onPress: customOnPress,
          });

          return cloneElement;
        }

        if (props?.children) {
          return React.cloneElement(element as ReactElement, {
            children: renderChildrenWithEvent(props.children),
          });
        }

        return element;
      }),
    [closeDialog],
  );

  const childrenMap = useMemo(
    () => renderChildrenWithEvent(children),
    [children, renderChildrenWithEvent],
  );

  const header = customHeader || <DialogHeader title={title as string} />;
  const mappedHeader = useMemo(
    () => renderChildrenWithEvent(header),
    [customHeader, renderChildrenWithEvent],
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => closeDialog()}
      testID={testID}
    >
      <View
        style={[styles.container, styles.alignInCenter, dialogStyles]}
        className="container"
        onTouchEnd={() => closeDialog()}
      >
        <View
          style={{
            ...styles.alignInCenter,
            ...styles.content,
            ...contentStyles,
          }}
          className="content"
          onTouchEnd={(event) => event.stopPropagation()}
        >
          {mappedHeader}
          {childrenMap}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexGrow: 1,
  },
  alignInCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: COLORS.secondaryBlack,
    padding: 20,
    borderRadius: 10,
  },
});
