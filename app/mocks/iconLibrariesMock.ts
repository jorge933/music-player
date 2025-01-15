const iconLibraries = [
  "FontAwesome5",
  "FontAwesome6",
  "MaterialIcons",
  "Entypo",
  "Ionicons",
  "AntDesign",
  "SimpleLineIcons",
];

export const mockedIconLibraries = iconLibraries.reduce(
  (prev, current) => ({ ...prev, [current]: jest.fn() }),
  {} as Record<string, jest.Mock>,
);
