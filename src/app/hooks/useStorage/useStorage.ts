import { StorageContext } from "@/contexts/storage/storageContext";
import { useContext } from "react";

export function useStorage() {
  const storage = useContext(StorageContext);

  return storage;
}
