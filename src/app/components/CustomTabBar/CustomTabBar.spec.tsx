import { CustomTabBar } from "@/components/CustomTabBar/CustomTabBar";
import { COLORS } from "@/constants/Colors";
import { generateTabBarButton } from "@/helpers/generateTabBarButton";
import { render } from "testUtils";

const routes = [
  { key: "route1", name: "Route 1" },
  { key: "route2", name: "Route 2" },
];
const descriptors = {
  route1: {
    options: {
      tabBarStyle: { backgroundColor: COLORS.black },
      tabBarButton: ({ href, focused }: any) =>
        generateTabBarButton("Route 1", "search", focused, href),
    },
    route: routes[0],
  },
  route2: {
    options: {
      tabBarButton: ({ href, focused }: any) =>
        generateTabBarButton("Route 2", "home", focused, href),
    },
    route: routes[1],
  },
};

const baseProperties = {
  state: { routes, index: 0 },
  descriptors,
  keyboardIsActive: false,
};

describe("CustomTabBar", () => {
  const generateComponentWithProps = (props: Record<any, any>) => (
    <CustomTabBar {...(props as any)} />
  );
  it("should return null when keyboardIsActive is true", () => {
    const { queryByTestId } = render(
      generateComponentWithProps({ ...baseProperties, keyboardIsActive: true }),
    );

    const customTabBar = queryByTestId("custom-tab-bar");

    expect(customTabBar).not.toBeVisible();
  });

  it("should render correctly when keyboardIsActive is false", () => {
    const { getByText } = render(generateComponentWithProps(baseProperties));

    expect(getByText("Route 1")).toBeVisible();
    expect(getByText("Route 2")).toBeVisible();
  });

  it("applies the correct tabBarStyle based on focusedIndex", () => {
    const { getByTestId } = render(generateComponentWithProps(baseProperties));

    const tabBar = getByTestId("custom-tab-bar");
    expect(tabBar).toHaveStyle(`background-color: ${COLORS.black}`);
  });

  it("should call the tabBarButton with correct props", () => {
    const routes = [
      { key: "route1", name: "Route 1" },
      { key: "route2", name: "Route 2" },
    ];

    const descriptors = {
      route1: {
        options: {
          tabBarButton: jest.fn(),
        },
        route: routes[0],
      },
      route2: {
        options: {
          tabBarButton: jest.fn(),
        },
        route: routes[1],
      },
    };

    const props = {
      state: { routes, index: 0 },
      descriptors,
      keyboardIsActive: false,
    } as any;

    render(generateComponentWithProps(props));

    expect(descriptors.route1.options.tabBarButton).toHaveBeenCalledWith({
      focused: true,
      href: "/(tabs)/Route 1",
    });
    expect(descriptors.route2.options.tabBarButton).toHaveBeenCalledWith({
      focused: false,
      href: "/(tabs)/Route 2",
    });
  });
});
