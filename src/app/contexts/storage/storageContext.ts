import { StorageService } from "@/services/storageService";
import { createContext } from "react";

const storage = new StorageService();
export const StorageContext = createContext(storage);
