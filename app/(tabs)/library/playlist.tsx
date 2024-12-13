import { PlaylistScreen } from "@/features/Playlist/PlaylistScreen";
import { useCleanPageOnInactive } from "@/hooks/useCleanPageOnInactive/useCleanPageOnInactive";

export default function Playlist() {
  const screen = useCleanPageOnInactive(
    <PlaylistScreen />,
    "/library/playlist",
  );

  return screen;
}
