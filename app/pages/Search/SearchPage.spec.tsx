import { render, fireEvent } from "testUtils";
import { useRouter } from "expo-router";

import { SearchPage } from "./SearchPage";

jest.mock("expo-router", () => ({ useRouter: jest.fn() }));

describe("SearchPage", () => {
  const mockReplace = jest.fn();

  let screen = render(<SearchPage />);

  beforeEach(() => {
    screen = render(<SearchPage />);

    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    jest.clearAllMocks();
  });

  it("should render the input and button", () => {
    const input = screen.getByTestId("input");
    const button = screen.getByTestId("button");

    expect(input).toBeVisible();
    expect(button).toBeVisible();
  });

  it("button should be disabled when input is invalid", () => {
    const button = screen.getByTestId("button");
    const input = screen.getByTestId("input");

    fireEvent(input, "changeText", "");

    expect(button).toBeDisabled();
  });

  it("button should be enabled when input is valid", () => {
    const input = screen.getByTestId("input");
    const button = screen.getByTestId("button");

    fireEvent(input, "changeText", "validText");

    expect(button).toBeEnabled();
  });

  it("should call replace when click on button", () => {
    const input = screen.getByTestId("input");
    const button = screen.getByTestId("button");

    fireEvent(input, "changeText", "validText");
    fireEvent(button, "press");

    expect(mockReplace).toHaveBeenCalledWith({
      pathname: "/results",
      params: { query: "validText" },
    });
  });

  it("should call replace when submit is pressed", () => {
    const input = screen.getByTestId("input");

    fireEvent(input, "changeText", "validText");
    fireEvent(input, "submitEditing");

    expect(mockReplace).toHaveBeenCalledWith({
      pathname: "/results",
      params: { query: "validText" },
    });
  });

  it("should not navigating when input is invalid", () => {
    const button = screen.getByTestId("button");

    fireEvent(button, "press");
    expect(mockReplace).not.toHaveBeenCalled();
  });
});
