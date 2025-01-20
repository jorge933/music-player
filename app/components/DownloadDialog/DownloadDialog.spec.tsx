import { render, fireEvent } from "testUtils";
import { DownloadDialog } from "@/components/DownloadDialog/DownloadDialog";
import { useDownloadContext } from "@/hooks/useDownloadContext/useDownloadContext";
import { formatSecondsToTime } from "@/helpers/formatSecondsToTime/formatSecondsToTime";
import React from "react";
import { VideoDetails } from "./DownloadDialog.types";

jest.mock("@/hooks/useDownloadContext/useDownloadContext");

describe("DownloadDialog", () => {
  const mockOnDialogClose = jest.fn();
  const mockDownloadSong = jest.fn();
  const mockVideoDetails = {
    title: "Test Video",
    channelTitle: "Test Channel",
    duration: 300,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDownloadContext as jest.Mock).mockReturnValue({
      downloadSong: mockDownloadSong,
    });
  });

  it("should render dialog with video details", () => {
    const { getByText } = render(
      <DownloadDialog
        videoDetails={mockVideoDetails as VideoDetails}
        onDialogClose={mockOnDialogClose}
      />,
    );

    const formattedDuration = formatSecondsToTime(mockVideoDetails.duration);
    const duration = getByText(formattedDuration);

    expect(getByText("Test Video")).toBeVisible();
    expect(getByText("Test Channel")).toBeVisible();
    expect(duration).toBeVisible();
  });

  it("should call onDialogClose when close button is pressed", () => {
    const { getByText } = render(
      <DownloadDialog
        videoDetails={mockVideoDetails as VideoDetails}
        onDialogClose={mockOnDialogClose}
      />,
    );

    const closeButton = getByText("Close");
    fireEvent(closeButton, "press");

    expect(mockOnDialogClose).toHaveBeenCalledWith(true);
    expect(mockOnDialogClose).toHaveBeenCalled();
  });

  it("should call downloadSong from context when download button is pressed", () => {
    const { getByTestId } = render(
      <DownloadDialog
        videoDetails={mockVideoDetails as VideoDetails}
        onDialogClose={mockOnDialogClose}
      />,
    );

    const downloadButton = getByTestId("download-button");
    fireEvent(downloadButton, "press");

    expect(mockDownloadSong).toHaveBeenCalledWith(mockVideoDetails);
    expect(mockDownloadSong).toHaveBeenCalled();
  });
});
