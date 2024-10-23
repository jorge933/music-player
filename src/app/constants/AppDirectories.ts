import * as FileSystem from "expo-file-system";

const APP_DIRECTORY = FileSystem.documentDirectory + "/music-player/";

export const DOWNLOAD_DIRECTORY = APP_DIRECTORY + "songs/";
export const STORAGE_FILE = APP_DIRECTORY + "storage.json";
