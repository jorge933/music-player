import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function Results() {
  const { query } = useLocalSearchParams();

  return <Text>{query}</Text>;
}
