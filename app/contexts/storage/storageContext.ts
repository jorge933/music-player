import { StorageService } from "@/services/storage/storageService";
import { createContext } from "react";

const storage = new StorageService();
export const StorageContext = createContext(storage);
