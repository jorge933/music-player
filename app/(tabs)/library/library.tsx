import { LibraryScreen } from "@/features/Library/pages/Library/LibraryScreen";
import { useCleanPageOnInactive } from "@/hooks/useCleanPageOnInactive/useCleanPageOnInactive";

export default function Library() {
  const screen = useCleanPageOnInactive(<LibraryScreen />, "/library/library");

  return screen;
}
