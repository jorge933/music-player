/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Button } from "@/components/Button/Button";
import { COLORS } from "@/constants/Colors";
import { useToastsContext } from "@/hooks/useToastsContext/useToastsContext";
import { PlaylistService } from "@/services/playlistService";
import { AntDesign } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { DialogHeader } from "../DialogHeader/DialogHeader";
import { ConfirmDeleteDialogProps } from "./ConfirmDeleteDialog.types";

export function ConfirmDeleteDialog({
  id,
  service,
  infoToastMessage,
  successToastMessage,
  title,
  children,
  playlistId,
  testID,
  onDeleteItem,
  closeDialog,
}: ConfirmDeleteDialogProps) {
  const toasts = useToastsContext();

  const isPlaylist = service instanceof PlaylistService;

  const deleteItem = useCallback(() => {
    playlistId && isPlaylist
      ? service.updateSongList(playlistId, id as string)
      : service.delete(id);

    if (onDeleteItem) onDeleteItem();

    toasts.success(successToastMessage, 3000);
  }, [onDeleteItem]);

  const $customHeader = (
    <>
      <AntDesign
        name="warning"
        size={40}
        color={COLORS.white}
        style={{
          paddingTop: 9,
          paddingHorizontal: 12,
          paddingBottom: 13,
          margin: "auto",
          backgroundColor: COLORS.yellow,
          borderRadius: 50,
        }}
      />

      <DialogHeader title={title} />
    </>
  );

  return (
    <BaseDialog
      open={true}
      setOpen={closeDialog}
      testID={testID}
      customHeader={$customHeader}
    >
      {children ?? <></>}
      <Button
        title="Delete"
        closeDialog
        onPress={deleteItem}
        buttonStyles={{ backgroundColor: COLORS.yellow, marginTop: 15 }}
        testID="delete-button"
      />
      <Button
        title="Cancel"
        closeDialog
        buttonStyles={{
          backgroundColor: COLORS.transparentWhite,
          marginTop: 20,
        }}
        onPress={() => toasts.info(infoToastMessage, 3000)}
        testID="cancel-button"
      />
    </BaseDialog>
  );
}
