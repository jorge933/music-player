import * as FileSystem from "expo-file-system";

export class FileSystemService {
  static documentDirectory = FileSystem.documentDirectory;

  static async existsPath(path: string) {
    const { exists } = await FileSystem.getInfoAsync(path);

    return exists;
  }

  static async createDirectory(path: string) {
    await FileSystem.makeDirectoryAsync(path);
  }

  static async delete(path: string) {
    await FileSystem.deleteAsync(path);
  }

  static async writeFile(path: string, content: string) {
    await FileSystem.writeAsStringAsync(path, content);
  }

  static async readFile(path: string) {
    return await FileSystem.readAsStringAsync(path);
  }

  static async downloadFile(
    url: string,
    path: string,
    options?: FileSystem.DownloadOptions,
  ) {
    await FileSystem.downloadAsync(url, path, options);
  }
}
