import { SearchPage } from "@/pages/SearchPage";
import { useCleanPageOnInactive } from "@/hooks/useCleanPageOnInactive/useCleanPageOnInactive";

export default function Search() {
  const screen = useCleanPageOnInactive(<SearchPage />, "/");

  return screen;
}
