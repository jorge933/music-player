import { COLORS } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useMemo } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { XStack } from "tamagui";
import { Button } from "../Button/Button";
import { ChildrenType, CustomDialogProps } from "./BaseDialog.types";

export function BaseDialog({
  open,
  children,
  title,
  dialogStyles,
  contentStyles,
  setOpen,
  onDialogClose,
}: CustomDialogProps) {
  const closeDialog = useCallback(() => {
    setOpen(false);
    if (onDialogClose) onDialogClose();
  }, [onDialogClose]);

  const renderChildrenWithEvent = useCallback(
    (children: ChildrenType) =>
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
      }),
    [closeDialog],
  );

  const childrenMap = useMemo(
    () => renderChildrenWithEvent(children),
    [children, renderChildrenWithEvent],
  );

  const $dialogHeader = (
    <XStack {...styles.header}>
      <Text style={styles.title}>{title}</Text>

      <Button
        icon={<MaterialIcons name="close" size={22} color={COLORS.white} />}
        buttonStyles={styles.dialogCloseIcon}
        onPress={closeDialog}
      />
    </XStack>
  );

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={closeDialog}
      >
        <View style={{ ...styles.centeredView, ...dialogStyles }}>
          <View style={{ ...styles.content, ...contentStyles }}>
            {$dialogHeader}
            {childrenMap}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: "LatoExtraBold",
  },
  content: {
    backgroundColor: COLORS.secondaryBlack,
    padding: 20,
    borderRadius: 10,
  },
  dialogCloseIcon: {
    width: "auto",
    backgroundColor: COLORS.transparentWhite,
    paddingHorizontal: 3,
    paddingVertical: 2,
    position: "absolute",
    right: 0,
  },
});
