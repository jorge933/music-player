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
import { Image, StyleSheet, Text, View } from "react-native";
import { XStack, YStack } from "tamagui";

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

  const playlist = useMemo(() => playlistService.getById(convertedId), [id]);
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
    : require("@assets/images/choose-playlist-image.jpg");

  const songsLength = playlist.songs.length;

  const singularOrPlural = songsLength > 1 ? " musics" : " music";
  const hasDescription = !!playlist.description;

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
          onClose={toggleOptions}
        />
      )}

      {editPlaylistDialog && (
        <PlaylistFormDialog
          setOpen={setEditPlaylistDialog}
          editInfos={editInfos}
          onClose={toggleOptions}
        />
      )}

      {deletePlaylistDialog && (
        <ConfirmDeleteDialog
          id={playlist.id}
          closeDialog={setDeletePlaylistDialog}
          onDeleteItem={() => router.push("/(tabs)/library")}
          service={playlistService}
        />
      )}

      <View style={styles.view} testID="playlist-details">
        <XStack width="100%">
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
          >
            <XStack {...styles.playlistDetails}>
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
              {songsLength + singularOrPlural}{" "}
              {formattedDuration && `, ${formattedDuration}`}
            </Text>
          </YStack>
        </XStack>

        {optionsIsOpened && (
          <YStack {...styles.options} testID="options-menu">
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
    paddingHorizontal: 10,
    marginRight: 20,
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
