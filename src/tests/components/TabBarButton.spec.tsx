import { COLORS } from "@/constants/Colors";
import { render } from "testUtils";
import { TabBarButton } from "@/components/TabBarButton/TabBarButton";

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
