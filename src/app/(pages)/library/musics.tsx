import { usePathname } from "expo-router";
import { Text } from "react-native";

export default function Musics() {
  console.log(usePathname());
  return <Text>my-musics</Text>;
}
