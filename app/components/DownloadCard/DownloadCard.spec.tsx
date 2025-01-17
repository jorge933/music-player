import { DownloadCard } from "@/components/DownloadCard/DownloadCard";
import { COLORS } from "@/constants/Colors";
import { ItemStatus } from "@/contexts/download/downloadContext.types";
import { useDownloadContext } from "@/hooks/useDownloadContext/useDownloadContext";
import { fireEvent, render } from "testUtils";
import React from "react";
import { YGroup } from "tamagui";

jest.mock("@/hooks/useDownloadContext/useDownloadContext", () => ({
  useDownloadContext: jest
    .fn()
    .mockReturnValue({ removeFromQueue: jest.fn(), downloadSong: jest.fn() }),
}));

const mockDetails = {
  title: "Test Song",
  channelTitle: "Test Channel",
  status: ItemStatus.DOWNLOADING,
  duration: 100,
  videoId: "12345",
  abort: jest.fn(),
};

describe("DownloadCard", () => {
  const renderWithGroup = (component: React.JSX.Element) =>
    render(<YGroup>{component}</YGroup>);

  it("should render the title, channel, and status correctly", () => {
    const { getByText } = renderWithGroup(<DownloadCard {...mockDetails} />);

    expect(getByText("Test Song")).toBeVisible();
    expect(getByText("Test Channel")).toBeVisible();
    expect(getByText("Status: Downloading")).toBeVisible();
  });

  it("should be call abort function when abort button is pressed", () => {
    const mockAbort = jest.fn();

    const { getByTestId } = renderWithGroup(
      <DownloadCard {...mockDetails} abort={mockAbort} />,
    );

    const abortButton = getByTestId("abort-button");
    fireEvent(abortButton, "press");

    expect(mockAbort).toHaveBeenCalled();
  });

  it("should be call downloadSong function when download again button is pressed", () => {
    const mockDownloadSong = jest.fn();

    (useDownloadContext as jest.Mock).mockReturnValue({
      removeFromQueue: jest.fn(),
      downloadSong: mockDownloadSong,
    });

    const details = { ...mockDetails, status: ItemStatus.ERROR };

    const { getByTestId } = renderWithGroup(<DownloadCard {...details} />);

    const downloadAgainButton = getByTestId("download-again-button");
    fireEvent(downloadAgainButton, "press");

    expect(mockDownloadSong).toHaveBeenCalledWith(details);
  });

  it("should be call removeFromQueue when remove button is pressed", () => {
    const mockRemoveFromQueue = jest.fn();

    (useDownloadContext as jest.Mock).mockReturnValue({
      removeFromQueue: mockRemoveFromQueue,
      downloadSong: jest.fn(),
    });

    const { getByTestId } = renderWithGroup(
      <DownloadCard {...mockDetails} status={ItemStatus.FINISHED} />,
    );

    const removeButton = getByTestId("remove-button");
    fireEvent(removeButton, "press");

    expect(mockRemoveFromQueue).toHaveBeenCalledWith("12345");
  });

  it("should render the correct status color", () => {
    const { getByText } = renderWithGroup(
      <DownloadCard {...mockDetails} status={ItemStatus.ERROR} />,
    );

    const statusText = getByText("Status: Error");
    expect(statusText.props.style[1].color).toBe(COLORS.red);
  });
});
