import axios from "axios";
import { renderHook, waitFor } from "testUtils";
import { useFetch } from "./useFetch";

jest.mock("axios", () => ({
  ...jest.requireActual("axios"),
  request: jest.fn(() => new Promise(() => {})),
}));

describe("useFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should initialize with correct default values", () => {
    const { result } = renderHook(() =>
      useFetch({ url: "https://api.example.com/data" }),
    );

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isFetching).toBe(true);
  });

  it("should update state when data is fetched successfully", async () => {
    const mockData = { id: 1, name: "Test" };

    (axios.request as jest.Mock).mockResolvedValueOnce({ data: mockData });

    const { result } = await waitFor(() =>
      renderHook(() => useFetch({ url: "https://api.example.com/data" })),
    );

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle error correctly", async () => {
    const mockError = new Error("Request failed");

    (axios.request as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = await waitFor(() =>
      renderHook(() => useFetch({ url: "https://api.example.com/data" })),
    );

    expect(result.current.error).toEqual(mockError);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.data).toBeNull();
  });

  it("should update isFetching state while fetching", async () => {
    (axios.request as jest.Mock).mockResolvedValueOnce({
      data: { id: 1, name: "Test" },
    });

    const { result } = renderHook(() =>
      useFetch({ url: "https://api.example.com/data" }),
    );

    expect(result.current.isFetching).toBe(true);

    await waitFor(() => result.current.isFetching === false);

    expect(result.current.isFetching).toBe(false);
  });
});
