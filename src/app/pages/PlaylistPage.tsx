import { SongItem } from "@/components";
import { AddSongDialog } from "@/components/AddSongDialog/AddSongDialog";
import { Button } from "@/components/Button/Button";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog/ConfirmDeleteDialog";
import { PlaylistFormDialog } from "@/components/PlaylistFormDialog/PlaylistFormDialog";
import { COLORS } from "@/constants/Colors";
import { Song } from "@/interfaces/Song";
import { PlaylistService } from "@/services/playlistService";
import { SongService } from "@/services/songService";
import {
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView, XStack, YStack } from "tamagui";

export function PlaylistPage() {
  const playlistService = new PlaylistService();
  const songService = new SongService();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [optionsIsOpened, setOptionsIsOpened] = useState(false);
  const [deletePlaylistDialog, setDeletePlaylistDialog] = useState(false);
  const [editPlaylistDialog, setEditPlaylistDialog] = useState(false);
  const [addSongDialog, setAddSongDialog] = useState(false);

  const convertedId = Number(id);

  const [playlist, setPlaylist] = useState(
    playlistService.getById(convertedId),
  );

  const songs = useMemo(() => {
    return playlist?.songs.reduce((acc, songId) => {
      const song = songService.getById(songId) as Song;

      return { ...acc, [song.id]: song };
    }, {});
  }, [playlist?.songs]) as Record<string, Song>;

  const playlistDurationInSeconds = useMemo(() => {
    const duration = playlist?.songs.reduce((total, songId) => {
      const { duration } = songService.getById(songId) as Song;

      return duration + total;
    }, 0);

    return duration;
  }, [playlist]) as number;

  if (!playlist) return <View></View>;

  const formatDuration = (total: number) => {
    const hours = Math.floor(total / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;

    let text = "";

    if (hours >= 1) text += `${hours}h`;
    if (minutes >= 1) text += ` ${minutes}min`;
    if (seconds >= 1 && hours < 1) text += ` ${seconds}s`;

    return text;
  };

  const formattedDuration = formatDuration(playlistDurationInSeconds);

  const imageSource = playlist.imageUri
    ? { uri: playlist.imageUri }
    : require("@assets/images/default-playlist-image.jpg");

  const songsLength = playlist.songs.length;

  const singularOrPlural = songsLength > 1 ? " musics" : " music";
  const hasDescription = !!playlist.description;

  const toggleOptions = () => setOptionsIsOpened(!optionsIsOpened);

  const onCloseAddSongDialog = () => {
    toggleOptions();

    setPlaylist(playlistService.getById(convertedId));
  };

  const handleToggleOptionsPress = (event: GestureResponderEvent) => {
    event.preventDefault();

    toggleOptions();
  };

  const closeConfirmDeleteDialog = (newValue: boolean) => {
    setDeletePlaylistDialog(newValue);

    toggleOptions();
  };

  const editInfos = {
    defaultValues: {
      name: playlist.name,
      description: playlist.description,
      imageSource: imageSource.uri,
    },
    id: playlist.id,
  };

  const handleClosePlaylistFormDialog = () => {
    setEditPlaylistDialog(false);
    toggleOptions();
    setPlaylist(playlistService.getById(convertedId));
  };

  return (
    <>
      {addSongDialog && (
        <AddSongDialog
          playlistId={playlist.id}
          setOpen={setAddSongDialog}
          onClose={onCloseAddSongDialog}
        />
      )}

      {editPlaylistDialog && (
        <PlaylistFormDialog
          setOpen={setEditPlaylistDialog}
          editInfos={editInfos}
          onClose={handleClosePlaylistFormDialog}
        />
      )}

      {deletePlaylistDialog && (
        <ConfirmDeleteDialog
          id={playlist.id}
          service={playlistService}
          closeDialog={closeConfirmDeleteDialog}
          onDeleteItem={() => router.push("/(tabs)/library")}
          infoToastMessage="Playlist not deleted"
          successToastMessage="Playlist deleted with success"
          title="Confirm deletion of this playlist?"
        />
      )}

      {optionsIsOpened && (
        <YStack
          {...styles.options}
          testID="options-menu"
          onPress={(event) => event.stopPropagation()}
        >
          <Button
            icon={<MaterialIcons name="close" size={22} color={COLORS.white} />}
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
            onPress={() => setEditPlaylistDialog(true)}
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

      <ScrollView style={styles.view}>
        <XStack width="100%" testID="playlist-details">
          <Image
            source={imageSource}
            alt="Playlist Image"
            testID="image"
            style={styles.image}
            resizeMode="stretch"
          />

          <YStack
            {...styles.informations}
            justifyContent={hasDescription ? "space-between" : "flex-start"}
            className="informations"
          >
            <XStack {...styles.informationsHeader}>
              <Text style={styles.name} numberOfLines={1} lineBreakMode="tail">
                {playlist.name}
              </Text>

              <Button
                testID="toggle-options-button"
                buttonStyles={styles.optionsButton}
                icon={
                  <SimpleLineIcons
                    name="options-vertical"
                    size={22}
                    color={COLORS.white}
                    style={{ marginRight: 20, marginLeft: 10 }}
                  />
                }
                onPress={handleToggleOptionsPress}
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
              {formattedDuration && `, ${formattedDuration}`}
            </Text>
          </YStack>
        </XStack>

        {playlist.songs.map((songId) => {
          const song = songs[songId] as Song;
          const $actionButton = (
            <Button
              icon={<FontAwesome5 name="trash" size={18} color={COLORS.red} />}
              buttonStyles={{
                width: "auto",
                backgroundColor: "none",
                paddingVertical: 10,
                paddingLeft: 10,
                paddingRight: 0,
              }}
              testID="deleteSongButton"
            />
          );

          return (
            <SongItem key={song.id} song={song} actionButton={$actionButton} />
          );
        })}
      </ScrollView>
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
  informationsHeader: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  informations: {
    width: "60%",
    marginLeft: 10,
  },
  name: {
    maxWidth: "75%",
    color: COLORS.white,
    fontFamily: "LatoBold",
    fontSize: 20,
  },
  description: {
    maxWidth: "70%",
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
    zIndex: 1,
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
    paddingLeft: 10,
    position: "absolute",
    right: 0,
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
