import * as FileSystem from "expo-file-system";
import { STORAGE_FILE } from "@/constants/AppDirectories";

export class StorageService {
  private storage: { [key: string]: string | number };

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

  setItem(key: string, value: string | number) {
    this.storage[key] = value;
    this.storageValues();
  }

  getItem<T = string | number>(key: string): T {
    return this.storage[key] as T;
  }

  removeItem(key: string) {
    delete this.storage[key];
    this.storageValues();
  }
}
