import { mockStorageService } from "@/mocks/storageServiceMock";

jest.mock("@/services/storageService/storageService", () => {
  return {
    StorageService: jest.fn().mockImplementation(() => mockStorageService),
  };
});
