import { SearchScreen } from "@/features/Search/pages/Search/SearchScreen";
import { useCleanPageOnInactive } from "@/hooks/useCleanPageOnInactive/useCleanPageOnInactive";

export default function Search() {
  const screen = useCleanPageOnInactive(<SearchScreen />, "/");

  return screen;
}
