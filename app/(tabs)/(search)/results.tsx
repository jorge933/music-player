import { ResultsScreen } from "@/features/Search/pages/Results/ResultsScreen";
import { useCleanPageOnInactive } from "@/hooks/useCleanPageOnInactive/useCleanPageOnInactive";

export default function Results() {
  const screen = useCleanPageOnInactive(<ResultsScreen />, "/results");

  return screen;
}
