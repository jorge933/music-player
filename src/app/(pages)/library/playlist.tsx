import Button from "@/components/Button/Button";
import { COLORS } from "@/constants/Colors";
import { Playlist } from "@/interfaces/Playlist";
import { StorageContext } from "@/services/Storage/Storage.service";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { XStack, YStack } from "tamagui";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function PlaylistPage() {
  const storageService = useContext(StorageContext);

  const { id } = useLocalSearchParams<{
    id: string;
  }>();
  const convertedId = Number(id);

  const playlistsInStorage = storageService.getItem<string>("playlists");
  const playlists: Playlist[] = JSON.parse(playlistsInStorage);
  const playlist = playlists.find(
    (playlist) => playlist.id == convertedId,
  ) as Playlist;

  const imageSource = playlist.imageUrl
    ? { uri: playlist.imageUrl }
    : require("../../../assets/images/choose-playlist-image.jpg");
  const songsLength = playlist.songs.length;
  const singularOrPlural = songsLength > 1 ? " musics" : " music";

  const hasDescription = !!playlist.description;

  const [optionsIsOpened, setOptionsIsOpened] = useState(false);

  const toggleOptions = () => setOptionsIsOpened(!optionsIsOpened);

  const onOptionsPress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    toggleOptions();
  };

  return (
    <View style={styles.view}>
      <XStack width="100%">
        <Image source={imageSource} style={styles.image} resizeMode="stretch" />
        <YStack
          {...styles.informations}
          justifyContent={hasDescription ? "space-between" : "flex-start"}
        >
          <XStack
            width="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text style={styles.name}>{playlist.name}</Text>
            <Button
              buttonStyles={{ width: "auto", backgroundColor: "none" }}
              icon={
                <SimpleLineIcons
                  name="options-vertical"
                  size={22}
                  color={COLORS.white}
                  style={{ marginRight: 10 }}
                />
              }
              onPress={onOptionsPress}
            />

            {optionsIsOpened && (
              <YStack {...styles.playlistActions}>
                <Button
                  icon={
                    <MaterialIcons
                      name="close"
                      size={22}
                      color={COLORS.white}
                    />
                  }
                  buttonStyles={styles.dialogCloseIcon}
                  onPress={toggleOptions}
                />
                <Button
                  title="Edit Details"
                  icon={
                    <Ionicons name="pencil" size={22} color={COLORS.white} />
                  }
                  buttonStyles={styles.actionsButton}
                />
                <Button
                  title="Delete Playlist"
                  icon={
                    <FontAwesome5 name="trash" size={22} color={COLORS.red} />
                  }
                  buttonStyles={styles.actionsButton}
                />
              </YStack>
            )}
          </XStack>

          {playlist.description && (
            <Text
              style={styles.description}
              numberOfLines={8}
              lineBreakMode="tail"
              ellipsizeMode="tail"
              textBreakStrategy="highQuality"
            >
              {playlist.description}
            </Text>
          )}

          <Text
            style={{
              ...styles.musicsAdded,
              marginTop: !hasDescription ? 20 : 0,
            }}
          >
            {songsLength + singularOrPlural}
          </Text>
        </YStack>
      </XStack>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  image: {
    width: "40%",
    height: 200,
  },
  informations: {
    width: "60%",
    marginLeft: 10,
  },
  name: {
    color: COLORS.white,
    fontFamily: "LatoBold",
    fontSize: 20,
  },
  description: {
    maxWidth: "75%",
    color: COLORS.grey,
    fontFamily: "LatoRegular",
    fontSize: 10,
    marginVertical: 20,
  },
  musicsAdded: {
    color: COLORS.white,
    fontFamily: "LatoSemiBold",
    fontSize: 16,
  },
  playlistActions: {
    position: "absolute",
    top: 0,
    right: "20%",
    zIndex: 999,
    backgroundColor: COLORS.secondaryBlack,
    borderRadius: 5,
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  actionsButton: {
    width: "auto",
    backgroundColor: COLORS.black,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dialogCloseIcon: {
    width: "auto",
    backgroundColor: COLORS.transparentWhite,
    paddingHorizontal: 3,
    paddingVertical: 2,
    position: "absolute",
    top: 5,
    right: 8,
  },
});
