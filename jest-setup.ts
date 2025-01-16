import { mockedIconLibraries } from "@/mocks/iconLibrariesMock";
import { mockStorageService } from "@/mocks/storageServiceMock";

jest.mock("@/services/storage/storageService", () => {
  return {
    StorageService: jest.fn().mockImplementation(() => mockStorageService),
  };
});

jest.mock("@expo/vector-icons", () => mockedIconLibraries);

jest.mock("react-native", () => {
  const rn = jest.requireActual("react-native");

  const timing = jest.spyOn(rn.Animated, "timing");

  timing.mockReturnValue({ start: jest.fn() });

  return rn;
});
