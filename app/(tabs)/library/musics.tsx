import { MusicsPage } from "@/pages/MusicsPage";
import { useCleanPageOnInactive } from "@/hooks/useCleanPageOnInactive/useCleanPageOnInactive";

export default function Musics() {
  const screen = useCleanPageOnInactive(<MusicsPage />, "/library/musics");

  return screen;
}
