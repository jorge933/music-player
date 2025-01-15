import { StorageService } from "@/services/storageService/storageService";
import { createContext } from "react";

const storage = new StorageService();
export const StorageContext = createContext(storage);
