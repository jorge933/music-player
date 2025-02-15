import { FileSystemService } from "@/services/fileSystemService";

const APP_DIRECTORY = FileSystemService.documentDirectory + "/music-player/";

FileSystemService.existsPath(APP_DIRECTORY).then((exists) => {
  if (!exists) FileSystemService.createDirectory(APP_DIRECTORY);
});

export const SONGS_DIRECTORY = APP_DIRECTORY + "songs/";
export const STORAGE_FILE = APP_DIRECTORY + "storage.json";
