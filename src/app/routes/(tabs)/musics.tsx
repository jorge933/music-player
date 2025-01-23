import { MusicsPage } from "@/pages/MusicsPage";
import { useCleanPageOnInactive } from "@/hooks/useCleanPageOnInactive/useCleanPageOnInactive";

export default function Musics() {
  const screen = useCleanPageOnInactive(<MusicsPage />, "/musics");

  return screen;
}
