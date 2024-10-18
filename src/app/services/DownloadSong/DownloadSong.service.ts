import { BASE_DOWNLOAD_DIRECTORY } from "@/constants/BaseDownloadDirectory";
import axios, { HttpStatusCode } from "axios";
import * as FileSystem from "expo-file-system";

export async function DownloadSong(videoId: string) {
  const { EXPO_PUBLIC_SERVER_URL: SERVER_URL } = process.env;
  const url = SERVER_URL + "/download";

  const { status, data } = await axios.post(url, { videoId });

  if (status !== HttpStatusCode.Ok) throw new Error("Error in download");

  const { exists } = await FileSystem.getInfoAsync(BASE_DOWNLOAD_DIRECTORY);

  if (!exists) await FileSystem.makeDirectoryAsync(BASE_DOWNLOAD_DIRECTORY);

  const path = BASE_DOWNLOAD_DIRECTORY + videoId + ".mp3";

  await FileSystem.writeAsStringAsync(path, data as string, {
    encoding: "base64",
  });
}
