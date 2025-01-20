import { useRouter } from "expo-router";
import { fireEvent, render } from "testUtils";
import { SearchInput } from "./SearchInput";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("SearchInput", () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  it("should render the input and reset button", () => {
    const { getByTestId, getByDisplayValue } = render(
      <SearchInput defaultValue="search" />,
    );

    const input = getByDisplayValue("search");
    const resetButton = getByTestId("reset-button");

    expect(input).toBeVisible();
    expect(resetButton).toBeVisible();
  });

  it("should re-render page on submit editing", async () => {
    const { getByDisplayValue } = render(<SearchInput defaultValue="search" />);

    const input = getByDisplayValue("search");
    const query = "new query";

    fireEvent(input, "changeText", query);
    fireEvent(input, "submitEditing");

    expect(pushMock).toHaveBeenCalledWith({
      pathname: "/results",
      params: { query },
    });
  });

  it("should not re-render page when input value is equal to initial value", () => {
    const { getByDisplayValue } = render(<SearchInput defaultValue="search" />);
    const input = getByDisplayValue("search");

    fireEvent(input, "submitEditing");

    expect(pushMock).not.toHaveBeenCalled();
  });

  it("should not re-render page when input value is empty", () => {
    const { getByDisplayValue } = render(<SearchInput defaultValue="search" />);
    const input = getByDisplayValue("search");

    fireEvent(input, "changeText", "");
    fireEvent(input, "submitEditing");

    expect(pushMock).not.toHaveBeenCalled();
  });
});
