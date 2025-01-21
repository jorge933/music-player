import { mockedIconLibraries } from "./src/tests/mocks/iconLibrariesMock";
import { mockStorageService } from "./src/tests/mocks/storageServiceMock";

jest.mock("@/services/storageService", () => {
  return {
    StorageService: jest.fn().mockImplementation(() => mockStorageService),
  };
});

jest.mock("@/hooks/useStorage/useStorage", () => ({
  useStorage: jest.fn().mockReturnValue(mockStorageService),
}));

jest.mock("@expo/vector-icons", () => mockedIconLibraries);

jest.mock("react-native", () => {
  const rn = jest.requireActual("react-native");

  const timing = jest.spyOn(rn.Animated, "timing");

  timing.mockReturnValue({ start: jest.fn() });

  return rn;
});
