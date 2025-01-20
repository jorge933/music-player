import { useFetch } from "@/hooks/useFetch/useFetch";
import { FileSystemService } from "@/services/fileSystem/fileSystemService";
import { act, fireEvent, render, screen, waitFor } from "testUtils";
import { ResultsPage } from "./ResultsPage";

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn().mockReturnValue({ query: "Sample Query" }),
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

jest.mock("@/hooks/useFetch/useFetch", () => ({ useFetch: jest.fn() }));

jest.mock("@/services/fileSystem/fileSystemService", () => ({
  FileSystemService: {
    getInfo: jest.fn().mockResolvedValue({ exists: true } as any),
  },
}));

describe("ResultsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display fetching state when data is being fetched", () => {
    (useFetch as jest.Mock).mockReturnValue({
      isFetching: true,
      fetchData: jest.fn(),
      data: null,
      error: null,
    });

    const { getByTestId } = render(<ResultsPage />);
    const spinner = getByTestId("spinner");

    expect(spinner).toBeVisible();
  });

  it("should display error message when an error occurs during fetching", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      error: "Sample Error",
      isFetching: false,
      fetchData: jest.fn(),
    });
    const { getByText } = render(<ResultsPage />);

    const errorMessage = /error in search/gi;
    const errorElement = getByText(errorMessage);

    expect(errorElement).toBeVisible();
  });

  it("should display search results when data is fetched successfully", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: [
        {
          id: "1",
          snippet: {
            title: "Sample Video",
            channelTitle: "Sample Channel",
            thumbnails: { default: { url: "" } },
          },
          contentDetails: { duration: "PT1H" },
        },
      ],
      error: null,
      isFetching: false,
      fetchData: jest.fn(),
    });

    FileSystemService.getInfo = jest.fn().mockResolvedValue({ exists: false });

    await waitFor(async () => {
      render(<ResultsPage />);
    });

    const { getByTestId } = screen;

    const resultItem = getByTestId("result-item");
    const downloadButton = getByTestId("download-button");

    expect(resultItem).toBeVisible();

    await act(() => {
      fireEvent(downloadButton, "press");
    });

    const downloadDialog = getByTestId("download-dialog");
    expect(downloadDialog).toBeVisible();
  });

  it("should display 'No Results Found' when no results are returned", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: [],
      error: null,
      isFetching: false,
      fetchData: jest.fn(),
    });
    const { getByText } = render(<ResultsPage />);
    const noResultsText = getByText("No Results Founded!");

    expect(noResultsText).toBeVisible();
  });

  it("should open the download dialog when a result item is clicked", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: [
        {
          id: "1",
          snippet: {
            title: "Sample Video",
            channelTitle: "Sample Channel",
            thumbnails: { default: { url: "" } },
          },
          contentDetails: { duration: "PT1H" },
        },
      ],
      error: null,
      isFetching: false,
      fetchData: jest.fn(),
    });
    const { getByTestId } = render(<ResultsPage />);
    const downloadButtonText = getByTestId("download-button");

    fireEvent(downloadButtonText, "press");

    const downloadDialog = getByTestId("download-dialog");
    expect(downloadDialog).toBeVisible();
  });

  it("should handle retry when an error occurs", () => {
    const mockFetchData = jest.fn();

    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      error: "Sample Error",
      isFetching: false,
      fetchData: mockFetchData,
    });

    const { getByTestId } = render(<ResultsPage />);

    const retryButton = getByTestId("retry-button");

    fireEvent(retryButton, "press");

    expect(mockFetchData).toHaveBeenCalled();
  });
});
