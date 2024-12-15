import { MusicsScreen } from "@/features/Library/pages/Musics/MusicsScreen";
import { useCleanPageOnInactive } from "@/hooks/useCleanPageOnInactive/useCleanPageOnInactive";

export default function Musics() {
  const screen = useCleanPageOnInactive(<MusicsScreen />, "/library/musics");

  return screen;
}
