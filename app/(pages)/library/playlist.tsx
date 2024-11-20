import Button from "@/components/Button/Button";
import { PlaylistFormDialog } from "./components/PlaylistFormDialog/PlaylistFormDialog";
import { COLORS } from "@/constants/Colors";
import { Playlist } from "@/interfaces/Playlist";
import { StorageContext } from "@/services/Storage/Storage.service";
import { FontAwesome5, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { XStack, YStack } from "tamagui";
import { ConfirmDeleteDialog } from "./components/ConfirmDeleteDialog/ConfirmDeleteDialog";
import { AddSongDialog } from "./components/AddSongDialog/AddSongDialog";

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

  const imageSource = playlist.imageUri
    ? { uri: playlist.imageUri }
    : require("../../../assets/images/choose-playlist-image.jpg");
  const songsLength = playlist.songs.length;
  const singularOrPlural = songsLength > 1 ? " musics" : " music";
  const hasDescription = !!playlist.description;

  const [optionsIsOpened, setOptionsIsOpened] = useState(false);
  const [deletePlaylistDialog, setDeletePlaylistDialog] = useState(false);
  const [editPlaylistDialog, setEditPlaylistDialog] = useState(false);
  const [addSongDialog, setAddSongDialog] = useState(false);

  const toggleOptions = () => setOptionsIsOpened(!optionsIsOpened);

  const editInfos = {
    defaultValues: {
      name: playlist.name,
      description: playlist.description,
      imageSource: imageSource.uri,
    },
    id: playlist.id,
  };

  return (
    <>
      {addSongDialog && (
        <AddSongDialog
          playlistId={playlist.id}
          setOpen={setAddSongDialog}
          onClose={() => setOptionsIsOpened(false)}
        />
      )}

      {editPlaylistDialog && (
        <PlaylistFormDialog
          setOpen={setEditPlaylistDialog}
          editInfos={editInfos}
        />
      )}

      {deletePlaylistDialog && (
        <ConfirmDeleteDialog
          id={playlist.id}
          onClose={() => setDeletePlaylistDialog(false)}
          onDeleteItem={router.back}
          isPlaylist={true}
        />
      )}

      <View style={styles.view}>
        <XStack width="100%">
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="stretch"
          />
          <YStack
            {...styles.informations}
            justifyContent={hasDescription ? "space-between" : "flex-start"}
          >
            <XStack {...styles.playlistDetails}>
              <Text style={styles.name}>{playlist.name}</Text>
              <Button
                buttonStyles={styles.optionsButton}
                icon={
                  <SimpleLineIcons
                    name="options-vertical"
                    size={22}
                    color={COLORS.white}
                    style={{ marginRight: 10 }}
                  />
                }
                onPress={toggleOptions}
              />
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

        {optionsIsOpened && (
          <YStack {...styles.options}>
            <Button
              icon={
                <MaterialIcons name="close" size={22} color={COLORS.white} />
              }
              buttonStyles={styles.dialogCloseIcon}
              onPress={toggleOptions}
            />
            <Button
              title="Add Music"
              icon={<FontAwesome6 name="add" size={22} color={COLORS.white} />}
              onPress={() => setAddSongDialog(true)}
              buttonStyles={styles.actionsButton}
              textStyles={styles.actionsButtonText}
            />
            <Button
              title="Edit Details"
              icon={<Ionicons name="pencil" size={22} color={COLORS.white} />}
              onPress={() => setAddSongDialog(true)}
              buttonStyles={styles.actionsButton}
              textStyles={styles.actionsButtonText}
            />
            <Button
              title="Delete Playlist"
              icon={<FontAwesome5 name="trash" size={20} color={COLORS.red} />}
              onPress={() => setDeletePlaylistDialog(true)}
              buttonStyles={styles.actionsButton}
              textStyles={styles.actionsButtonText}
            />
          </YStack>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  image: {
    width: "50%",
    height: 220,
  },
  playlistDetails: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
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
  options: {
    position: "absolute",
    top: 0,
    right: "10%",
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
  actionsButtonText: {
    marginLeft: 5,
    fontFamily: "LatoRegular",
  },
  optionsButton: {
    width: "auto",
    backgroundColor: "none",
    marginRight: 10,
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
