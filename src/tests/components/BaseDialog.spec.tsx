import React from "react";
import { fireEvent, render } from "testUtils";
import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Text } from "react-native";
import { CustomDialogProps } from "@/components/BaseDialog/BaseDialog.types";
import { Button } from "@/components/Button/Button";

const baseProperties: CustomDialogProps = {
  children: <></>,
  setOpen: jest.fn(),
  open: true,
  title: "Test Dialog",
  testID: "dialog",
};

describe("BaseDialog", () => {
  it("should not render modal when open is false", () => {
    const { queryByTestId } = render(
      <BaseDialog {...baseProperties} open={false} />,
    );

    expect(queryByTestId("dialog")).not.toBeVisible();
  });

  it("renders modal when open is true", () => {
    const { getByTestId } = render(<BaseDialog {...baseProperties} />);

    expect(getByTestId("dialog")).toBeTruthy();
  });

  it("renders the title correctly", () => {
    const { getByText } = render(<BaseDialog {...baseProperties} />);

    const titleElement = getByText("Test Dialog");
    expect(titleElement).toBeVisible();
  });

  it("renders children inside the modal", () => {
    const { getByText } = render(
      <BaseDialog {...baseProperties}>
        <Text>Child Content</Text>
      </BaseDialog>,
    );

    const childElement = getByText("Child Content");
    expect(childElement).toBeVisible();
  });

  it("should close dialog on press close icon", () => {
    const onDialogCloseMock = jest.fn();
    const setOpenMock = jest.fn();

    const { getByTestId } = render(
      <BaseDialog
        {...baseProperties}
        onDialogClose={onDialogCloseMock}
        setOpen={setOpenMock}
      />,
    );

    const closeIcon = getByTestId("close-dialog-icon");

    fireEvent(closeIcon, "press");

    expect(onDialogCloseMock).toHaveBeenCalled();
    expect(setOpenMock).toHaveBeenCalledWith(false);
  });

  it("should close on press element with property closeDialog", () => {
    const onDialogClose = jest.fn();
    const setOpen = jest.fn();
    const onPress = jest.fn();

    const { getByTestId } = render(
      <BaseDialog
        {...baseProperties}
        onDialogClose={onDialogClose}
        setOpen={setOpen}
      >
        <Button closeDialog testID="close-dialog" onPress={onPress} />
      </BaseDialog>,
    );

    const closeButton = getByTestId("close-dialog");
    fireEvent(closeButton, "press");

    expect(onDialogClose).toHaveBeenCalledWith(true);
    expect(setOpen).toHaveBeenCalledWith(false);
    expect(onPress).toHaveBeenCalled();
  });

  it("should close on request close", () => {
    const onDialogCloseMock = jest.fn();
    const setOpenMock = jest.fn();

    const { getByTestId } = render(
      <BaseDialog
        {...baseProperties}
        onDialogClose={onDialogCloseMock}
        setOpen={setOpenMock}
      />,
    );

    const modal = getByTestId("dialog");

    fireEvent(modal, "requestClose");

    expect(onDialogCloseMock).toHaveBeenCalled();
    expect(setOpenMock).toHaveBeenCalledWith(false);
  });
});
