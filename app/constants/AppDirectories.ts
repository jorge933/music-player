import { FileSystemService } from "@/services/fileSystem/fileSytemService";

const APP_DIRECTORY = FileSystemService.documentDirectory + "/music-player/";

FileSystemService.getInfo(APP_DIRECTORY).then(({ exists }) => {
  if (!exists) FileSystemService.createDirectory(APP_DIRECTORY);
});

export const SONGS_DIRECTORY = APP_DIRECTORY + "songs/";
export const STORAGE_FILE = APP_DIRECTORY + "storage.json";
