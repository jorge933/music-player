import React from "react";
import { render, fireEvent, waitFor, screen } from "testUtils";
import { ResultItem } from "@/components/ResultItem/ResultItem";
import { FileSystemService } from "@/services/fileSystemService";
import { YGroup } from "tamagui";

FileSystemService.existsPath = jest.fn().mockResolvedValue(false);

const mockItem = {
  id: "123",
  snippet: {
    channelTitle: "Test Channel",
    thumbnails: { default: { url: "http://test.com/image.jpg" } },
    title: "Test Video",
  },
  contentDetails: { duration: "PT1M30S" },
  downloaded: false,
};

describe("ResultItem", () => {
  const renderWithGroup = (component: React.JSX.Element) =>
    render(<YGroup children={component} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render item details correctly", () => {
    const { getByText, getByTestId } = renderWithGroup(
      <ResultItem
        item={mockItem}
        downloadSong={jest.fn()}
        testID="result-item"
      />,
    );

    expect(getByTestId("result-item")).toBeVisible();
    expect(getByText("Test Video")).toBeVisible();
    expect(getByText("01:30")).toBeVisible();
    expect(getByText("Test Channel")).toBeVisible();
  });

  it("should disable download button if item is already downloaded", () => {
    const downloadedItem = { ...mockItem, downloaded: true };
    const { getByText } = renderWithGroup(
      <ResultItem
        item={downloadedItem}
        downloadSong={jest.fn()}
        testID="result-item"
      />,
    );

    const downloadedButton = getByText("Downloaded");

    expect(downloadedButton).toBeVisible();
    expect(downloadedButton).toBeDisabled();
  });

  it("should call downloadSong when download button is pressed", () => {
    const downloadSongMock = jest.fn();
    const { getByTestId } = renderWithGroup(
      <ResultItem
        item={mockItem}
        downloadSong={downloadSongMock}
        testID="result-item"
      />,
    );

    const downloadButton = getByTestId("download-button");
    fireEvent(downloadButton, "press");

    expect(downloadSongMock).toHaveBeenCalled();
  });

  it("should disable button if file already exists in the file system", async () => {
    (FileSystemService.existsPath as jest.Mock).mockResolvedValue(true);

    await waitFor(() => {
      renderWithGroup(
        <ResultItem
          item={mockItem}
          downloadSong={jest.fn()}
          testID="result-item"
        />,
      );
    });

    const downloadedButton = screen.getByText("Downloaded");
    expect(downloadedButton).toBeTruthy();
    expect(downloadedButton).toBeDisabled();
  });

  it("should enable button if file does not exist in the file system", async () => {
    FileSystemService.existsPath = jest.fn().mockResolvedValue(false);

    await waitFor(() => {
      renderWithGroup(
        <ResultItem
          item={mockItem}
          downloadSong={jest.fn()}
          testID="result-item"
        />,
      );
    });

    const downloadButton = screen.getByTestId("download-button");

    expect(downloadButton).toBeVisible();
    expect(downloadButton).toBeEnabled();
  });
});
