import { StorageContext } from "@/contexts/storageContext";
import { useContext } from "react";

export function useStorage() {
  const storage = useContext(StorageContext);

  return storage;
}
