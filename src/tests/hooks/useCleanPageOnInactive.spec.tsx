import { usePathname } from "expo-router";
import { act } from "react";
import { Text } from "react-native";
import { renderHook } from "testUtils";
import { useCleanPageOnInactive } from "@/hooks/useCleanPageOnInactive/useCleanPageOnInactive";

jest.mock("expo-router", () => ({
  usePathname: jest.fn(),
}));

describe("useCleanPageOnInactive", () => {
  it("should display the page if the current path matches", () => {
    (usePathname as jest.Mock).mockReturnValue("/home");

    const page = <Text>Page</Text>;

    const {
      result: { current },
    } = renderHook(() => useCleanPageOnInactive(page, "/home"));

    expect(current).toBe(page);
  });

  it("should return null if the current path does not match", () => {
    (usePathname as jest.Mock).mockReturnValue("/about");

    const page = <Text>Page</Text>;

    const {
      result: { current },
    } = renderHook(() => useCleanPageOnInactive(page, "/home"));

    expect(current).toBeNull();
  });

  it("should update return state if path change", async () => {
    const mockUsePathname = jest.spyOn(require("expo-router"), "usePathname");
    mockUsePathname.mockReturnValue("/home");

    const page = <Text>Page</Text>;

    const { result, rerender } = renderHook(
      ({ page, path }) => useCleanPageOnInactive(page, path),
      {
        initialProps: { page, path: "/home" },
      },
    );

    expect(result.current).toBe(page);

    act(() => {
      mockUsePathname.mockReturnValue("/about");
    });

    rerender({ page, path: "/home" });

    expect(result.current).toBeNull();
  });
});
