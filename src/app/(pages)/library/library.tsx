import CreatePlaylistDialog from "@/components/CreatePlaylistDialog/CreatePlaylistDialog";
import { COLORS } from "@/constants/Colors";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Button, XStack } from "tamagui";

export default function Library() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const goToMusicsPage = () => router.navigate("/library/musics");

  return (
    <>
      {dialogIsOpen ? (
        <CreatePlaylistDialog setOpen={setDialogIsOpen} />
      ) : (
        <></>
      )}
      <ScrollView style={styles.screen}>
        <XStack {...styles.actionButtons}>
          <Button style={styles.button} onPress={() => setDialogIsOpen(true)}>
            <FontAwesome6 name="add" size={22} color={COLORS.white} />
            <Text style={styles.actionName}>New Playlist</Text>
          </Button>

          <Button style={styles.button} onPress={goToMusicsPage}>
            <MaterialIcons name="headset" size={22} color={COLORS.white} />
            <Text style={styles.actionName}>Your Musics</Text>
          </Button>
        </XStack>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
  },
  actionButtons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
    paddingBottom: 20,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
  },
  button: {
    width: 110,
    height: 110,
    backgroundColor: COLORS.secondaryBlack,
    borderRadius: 5,
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  actionName: {
    fontFamily: "LatoBold",
    color: COLORS.white,
    textAlign: "center",
  },
});
