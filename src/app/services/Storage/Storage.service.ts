import { createContext, useContext } from "react";
import * as FileSystem from "expo-file-system";
import { STORAGE_FILE } from "@/constants/AppDirectories";

class Storage {
  private storage: { [key: string]: string };

  constructor() {
    FileSystem.getInfoAsync(STORAGE_FILE).then(async ({ exists }) => {
      if (exists) {
        const storedValues = await FileSystem.readAsStringAsync(STORAGE_FILE);
        const parsedValues = JSON.parse(storedValues);
        this.storage = parsedValues;
      } else FileSystem.writeAsStringAsync(STORAGE_FILE, "{}");
    });
  }

  private storageValues() {
    const convertedValues = JSON.stringify(this.storage);

    FileSystem.writeAsStringAsync(STORAGE_FILE, convertedValues);
  }

  setItem(key: string, value: string) {
    this.storage[key] = value;
    this.storageValues();
  }

  getItem(key: string) {
    return this.storage[key];
  }

  removeItem(key: string) {
    delete this.storage[key];
    this.storageValues();
  }
}

const storage = new Storage();
export const StorageContext = createContext(storage);
