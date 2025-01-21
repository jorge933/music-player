import * as FileSystem from "expo-file-system";
import { FileSystemService } from "@/services/fileSystemService";

jest.mock("expo-file-system");

describe("FileSystemService", () => {
  const mockPath = `${FileSystem.documentDirectory}test`;
  const mockContent = "Sample content";

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should check if path exist", async () => {
    (FileSystem.getInfoAsync as jest.Mock).mockResolvedValueOnce({
      exists: true,
      isDirectory: false,
    });

    const result = await FileSystemService.existsPath(mockPath);

    expect(FileSystem.getInfoAsync).toHaveBeenCalledWith(mockPath);
    expect(result).toBe(true);
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
