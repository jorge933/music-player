import { COLORS } from "@/constants/Colors";
import { render } from "testUtils";
import { Toast } from "@/components/Toast/Toast";

jest.mock("react-native", () => {
  const rn = jest.requireActual("react-native");

  const timing = jest.spyOn(rn.Animated, "timing");

  timing.mockReturnValue({ start: jest.fn() });

  return rn;
});

describe("Toast", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should render success toast with correct icon and background", () => {
    const { getByText, getByTestId } = render(
      <Toast message="Success!" type="success" />,
    );

    const toast = getByTestId("toast");
    const text = getByText("Success!");
    const icon = getByTestId("success-icon");

    expect(toast).toHaveStyle({
      backgroundColor: COLORS.toastSuccessBackground,
    });
    expect(text).toBeVisible();
    expect(icon).toBeVisible();
  });

  it("should render info toast with correct icon and background", () => {
    const { getByText, getByTestId } = render(
      <Toast message="Info!" type="info" />,
    );

    const toast = getByTestId("toast");
    const text = getByText("Info!");
    const icon = getByTestId("info-icon");

    expect(toast).toHaveStyle({
      backgroundColor: COLORS.toastInfoBackground,
    });
    expect(text).toBeTruthy();
    expect(icon).toBeVisible();
  });

  it("should render error toast with correct icon and background", () => {
    const { getByText, getByTestId } = render(
      <Toast message="Error!" type="error" />,
    );

    const toast = getByTestId("toast");
    const text = getByText("Error!");
    const icon = getByTestId("error-icon");

    expect(toast).toHaveStyle({
      backgroundColor: COLORS.toastErrorBackground,
    });
    expect(text).toBeTruthy();
    expect(icon).toBeVisible();
  });
});
