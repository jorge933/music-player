import * as FileSystem from "expo-file-system";
import { FileSystemService } from "./fileSystemService";

jest.mock("expo-file-system");

describe("FileSystemService", () => {
  const mockPath = `${FileSystem.documentDirectory}test`;
  const mockContent = "Sample content";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return file information", async () => {
    const mockInfo = { exists: true, isDirectory: false };
    (FileSystem.getInfoAsync as jest.Mock).mockResolvedValueOnce(mockInfo);

    const result = await FileSystemService.getInfo(mockPath);

    expect(FileSystem.getInfoAsync).toHaveBeenCalledWith(mockPath);
    expect(result).toEqual(mockInfo);
  });

  it("should create a directory", async () => {
    await FileSystemService.createDirectory(mockPath);

    expect(FileSystem.makeDirectoryAsync).toHaveBeenCalledWith(mockPath);
  });

  it("should delete a file or directory", async () => {
    await FileSystemService.delete(mockPath);

    expect(FileSystem.deleteAsync).toHaveBeenCalledWith(mockPath);
  });

  it("should write content to a file", async () => {
    await FileSystemService.writeFile(mockPath, mockContent);

    expect(FileSystem.writeAsStringAsync).toHaveBeenCalledWith(
      mockPath,
      mockContent,
    );
  });

  it("should read content from a file", async () => {
    (FileSystem.readAsStringAsync as jest.Mock).mockResolvedValueOnce(
      mockContent,
    );

    const result = await FileSystemService.readFile(mockPath);

    expect(FileSystem.readAsStringAsync).toHaveBeenCalledWith(mockPath);
    expect(result).toEqual(mockContent);
  });
});
