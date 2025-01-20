import { render, fireEvent } from "testUtils";
import { TabBarButton } from "./TabBarButton";
import { COLORS } from "@/constants/Colors";
import { LocalRouteParamsContext } from "expo-router/build/Route";

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  isReady: true,
  query: {},
  asPath: "/",
  pathname: "/",
};

describe("TabBarButton", () => {
  const defaultProps = {
    href: "/home",
    title: "Home",
    iconName: "home",
    focused: false,
  };

  it("renders correctly with default props", () => {
    const { getByText, getByTestId } = render(
      <TabBarButton {...defaultProps} />,
    );

    const button = getByTestId("button");
    const text = getByText(defaultProps.title);
    const icon = getByTestId("icon");

    expect(button.props.style.backgroundColor).toBe("transparent");
    expect(text.props.style.color).toBe(COLORS.white);
    expect(icon.props.color).toBe(COLORS.white);
  });

  it("applies focused styles when focused is true", () => {
    const props = { ...defaultProps, focused: true };
    const { getByText, getByTestId } = render(<TabBarButton {...props} />);

    const button = getByTestId("button");
    const text = getByText(props.title);
    const icon = getByTestId("icon");

    expect(button.props.style.backgroundColor).toBe(COLORS.black);
    expect(text.props.style.color).toBe(COLORS.green);
    expect(icon.props.color).toBe(COLORS.green);
  });
});
