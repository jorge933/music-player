import { useFetch } from "@/hooks/useFetch/useFetch";
import { ResultsPage } from "@/pages/ResultsPage";
import { FileSystemService } from "@/services/fileSystemService";
import { fireEvent, render, screen, waitFor } from "testUtils";

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn().mockReturnValue({ query: "Sample Query" }),
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

jest.mock("@/hooks/useFetch/useFetch", () => ({ useFetch: jest.fn() }));

jest.mock("@/services/fileSystemService", () => ({
  FileSystemService: {
    existsPath: jest.fn().mockResolvedValue(true),
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
    const data = [
      {
        id: "1",
        snippet: {
          title: "Video 1",
          channelTitle: "Sample Channel",
          thumbnails: { default: { url: "" } },
        },
        contentDetails: { duration: "PT1H" },
      },
      {
        id: "2",
        snippet: {
          title: "Video 2",
          channelTitle: "Sample Channel",
          thumbnails: { default: { url: "" } },
        },
        contentDetails: { duration: "PT1H" },
      },
      {
        id: "3",
        snippet: {
          title: "Video 3",
          channelTitle: "Sample Channel",
          thumbnails: { default: { url: "" } },
        },
        contentDetails: { duration: "PT1H" },
      },
    ];

    (useFetch as jest.Mock).mockReturnValue({
      data,
      error: null,
      isFetching: false,
      fetchData: jest.fn(),
    });

    FileSystemService.existsPath = jest
      .fn()
      .mockResolvedValue({ exists: false });

    await waitFor(async () => {
      render(<ResultsPage />);
    });

    const { getByText } = screen;

    data.forEach((item) => {
      const { title } = item.snippet;

      const result = getByText(title);

      expect(result).toBeVisible();
    });
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
