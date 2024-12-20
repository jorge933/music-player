import * as FileSystem from "expo-file-system";
import { STORAGE_FILE } from "@/constants/AppDirectories";

export class StorageService implements Storage {
  private storage: { [key: string]: string };
  length: number;

  constructor() {
    FileSystem.getInfoAsync(STORAGE_FILE).then(async ({ exists }) => {
      if (exists) {
        const storedValues = await FileSystem.readAsStringAsync(STORAGE_FILE);
        const parsedValues = JSON.parse(storedValues);
        this.storage = parsedValues;
      } else {
        FileSystem.writeAsStringAsync(STORAGE_FILE, "{}");
        this.storage = {};
      }
    });
  }

  private storageValues() {
    const convertedValues = JSON.stringify(this.storage);

    FileSystem.writeAsStringAsync(STORAGE_FILE, convertedValues);
  }

  getItem<T>(key: string) {
    try {
      const value = this.storage[key];

      return value ? (JSON.parse(value) as T) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  setItem<T>(key: string, value: T) {
    try {
      const object = JSON.stringify(value);

      this.storage[key] = object;

      this.storageValues();
    } catch (error) {
      console.error(error);
    }
  }

  clear(): void {
    throw new Error("Method not implemented.");
  }
  key(index: number): string | null {
    throw new Error("Method not implemented.");
  }
  removeItem(key: string): void {
    throw new Error("Method not implemented.");
  }
}
