/* eslint-disable expo/no-env-var-destructuring */
import { SONGS_DIRECTORY } from "@/constants/AppDirectories";
import axios, { HttpStatusCode } from "axios";
import * as FileSystem from "expo-file-system";

export async function downloadSongService(videoId: string) {
  const { EXPO_PUBLIC_SERVER_URL: SERVER_URL } = process.env;
  const url = SERVER_URL + "/download";

  const { status, data } = await axios.post(url, { videoId });

  if (status !== HttpStatusCode.Ok) throw new Error("Error in download");

  const { exists } = await FileSystem.getInfoAsync(SONGS_DIRECTORY);

  if (!exists) await FileSystem.makeDirectoryAsync(SONGS_DIRECTORY);

  const path = SONGS_DIRECTORY + videoId + ".mp3";

  await FileSystem.writeAsStringAsync(path, data as string, {
    encoding: "base64",
  });
}
