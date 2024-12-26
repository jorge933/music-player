import * as FileSystem from "expo-file-system";

export class FileSystemService {
  static documentDirectory = FileSystem.documentDirectory;

  static async getInfo(path: string) {
    return await FileSystem.getInfoAsync(path);
  }

  static async createDirectory(path: string) {
    await FileSystem.makeDirectoryAsync(path);
  }

  static async delete(path: string) {
    await FileSystem.deleteAsync(path);
  }

  static async createFile(path: string, content: string) {
    await FileSystem.writeAsStringAsync(path, content);
  }

  static async readFile(path: string) {
    return await FileSystem.readAsStringAsync(path);
  }
}
