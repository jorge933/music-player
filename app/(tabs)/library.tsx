import { LibraryPage } from "@/pages/LibraryPage";
import { useCleanPageOnInactive } from "@/hooks/useCleanPageOnInactive/useCleanPageOnInactive";

export default function Library() {
  const screen = useCleanPageOnInactive(<LibraryPage />, "/library");

  return screen;
}
