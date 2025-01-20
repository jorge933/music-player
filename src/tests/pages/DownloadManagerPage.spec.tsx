import { render } from "testUtils";
import { DownloadManagerPage } from "@/pages/DownloadManagerPage";
import { ItemStatus } from "@/contexts/download/downloadContext.types";
import { useDownloadContext } from "@/hooks/useDownloadContext/useDownloadContext";

jest.mock("@/hooks/useDownloadContext/useDownloadContext", () => ({
  useDownloadContext: jest.fn(),
}));

describe("DownloadManagerPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should be visible empty queue message", () => {
    (useDownloadContext as jest.Mock).mockReturnValue({ queue: [] });

    const screen = render(<DownloadManagerPage />);

    const message = screen.getByText("Empty Download Queue!");
    expect(message).toBeVisible();
  });

  it("should render DownloadCard for each item in queue", () => {
    const baseProperties = {
      abort: jest.fn(),
      status: ItemStatus.DOWNLOADING,
    };
    const mockQueue = [
      { videoId: "1", title: "Song 1", ...baseProperties },
      { videoId: "2", title: "Song 2", ...baseProperties },
    ];
    (useDownloadContext as jest.Mock).mockReturnValue({
      queue: mockQueue,
    });

    const screen = render(<DownloadManagerPage />);

    mockQueue.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeVisible();
    });
  });
});
