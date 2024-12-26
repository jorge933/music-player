import { ResultsPage } from "@/pages/ResultsPage";
import { useCleanPageOnInactive } from "@/hooks/useCleanPageOnInactive/useCleanPageOnInactive";

export default function Results() {
  const screen = useCleanPageOnInactive(<ResultsPage />, "/results");

  return screen;
}
