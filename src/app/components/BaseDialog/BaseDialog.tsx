import { COLORS } from "@/constants/Colors";
import { mapChildrenWithEvent } from "@/utils/mapChildrenWithEvent";
import React, { useCallback, useMemo } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { DialogHeader } from "../DialogHeader/DialogHeader";
import { CustomDialogProps } from "./BaseDialog.types";

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
    [setOpen]
  );

  const childrenMap = useMemo(
    () => mapChildrenWithEvent(children, () => closeDialog(true)),
    [children]
  );

  const header = customHeader || <DialogHeader title={title as string} />;
  const mappedHeader = useMemo(
    () => mapChildrenWithEvent(header, () => closeDialog(true)),
    [customHeader]
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
