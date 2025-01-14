import { PlaylistPage } from "@/pages/Playlist/PlaylistPage";
import { useCleanPageOnInactive } from "@/hooks/useCleanPageOnInactive/useCleanPageOnInactive";

export default function Playlist() {
  const screen = useCleanPageOnInactive(<PlaylistPage />, "/playlist");

  return screen;
}
