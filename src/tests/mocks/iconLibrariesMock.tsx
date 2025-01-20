import { View } from "react-native";

const iconLibraries = [
  "FontAwesome5",
  "FontAwesome6",
  "MaterialIcons",
  "Entypo",
  "Ionicons",
  "AntDesign",
  "SimpleLineIcons",
];

const iconComponentMock = jest.fn((props) => <View {...props}></View>);

export const mockedIconLibraries = iconLibraries.reduce(
  (prev, current) => ({ ...prev, [current]: iconComponentMock }),
  {} as Record<string, jest.Mock>,
);
