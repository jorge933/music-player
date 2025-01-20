import { SearchPage } from "@/pages/Search/SearchPage";
import { useCleanPageOnInactive } from "@/hooks/useCleanPageOnInactive/useCleanPageOnInactive";

export default function Search() {
  const screen = useCleanPageOnInactive(<SearchPage />, "/");

  return screen;
}
