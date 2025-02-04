import { SongItem } from "@/components";
import { AddSongDialog } from "@/components/AddSongDialog/AddSongDialog";
import { Button } from "@/components/Button/Button";
import { ConfirmDeleteDialog } from "@/components/ConfirmDeleteDialog/ConfirmDeleteDialog";
import { PlaylistFormDialog } from "@/components/PlaylistFormDialog/PlaylistFormDialog";
import { PlaylistHeader } from "@/components/PlaylistHeader/PlaylistHeader";
import { COLORS } from "@/constants/Colors";
import { useLazyLoadData } from "@/hooks/useLazyLoadData/useLazyLoadData";
import { Playlist } from "@/interfaces";
import { Song } from "@/interfaces/Song";
import { PlaylistService } from "@/services/playlistService";
import { SongService } from "@/services/songService";
import { executeCallbackOnScroll } from "@/utils/executeCallbackOnScroll";
import {
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { StyleSheet, View } from "react-native";
import { ScrollView, YStack } from "tamagui";

export function PlaylistPage() {
  const playlistService = new PlaylistService();
  const songService = new SongService();

  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [optionsIsOpened, setOptionsIsOpened] = useState(false);
  const [deletePlaylistDialog, setDeletePlaylistDialog] =
    useState<React.JSX.Element | null>(null);
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

  const getSongs = useCallback(
    (init: number, limit: number) =>
      (playlist as Playlist).songs.slice(init, init + limit),
    [playlist?.songs],
  );
  const limit = 6;

  const { data: lazySongs, getDataAndUpdate } = useLazyLoadData(
    getSongs,
    limit,
    [playlist],
  );

  if (!playlist) return <View></View>;

  const imageSource = playlist.imageUri
    ? { uri: playlist.imageUri }
    : require("@assets/images/default-playlist-image.jpg");

  const toggleOptions = () => setOptionsIsOpened(!optionsIsOpened);

  const onCloseAddSongDialog = () => {
    toggleOptions();

    setPlaylist(playlistService.getById(convertedId));
  };

  const closeConfirmDeleteDialog = () => {
    setDeletePlaylistDialog(null);

    setOptionsIsOpened(false);
  };

  const baseConfirmDeleteDialogProps = {
    service: playlistService,
    closeDialog: closeConfirmDeleteDialog,
  };

  const generateConfirmDeletionPlaylist = () => {
    const $dialog = (
      <ConfirmDeleteDialog
        {...baseConfirmDeleteDialogProps}
        id={playlist.id}
        onDeleteItem={() => router.push("/(tabs)/library")}
        infoToastMessage="Playlist not deleted"
        successToastMessage="Playlist deleted with success"
        title="Confirm deletion of this playlist?"
      />
    );

    setDeletePlaylistDialog($dialog);
  };

  const generateConfirmRemoveSong = (id: string) => {
    const song = songService.getById(id) as Song;
    const $songItem = <SongItem song={song} />;

    const $dialog = (
      <ConfirmDeleteDialog
        {...baseConfirmDeleteDialogProps}
        id={id}
        playlistId={convertedId}
        onDeleteItem={() => setPlaylist(playlistService.getById(convertedId))}
        infoToastMessage="Song not removed"
        successToastMessage="Song removed with success"
        title="Remove this song of this playlist?"
        children={$songItem}
      />
    );

    setDeletePlaylistDialog($dialog);
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

  const handleScroll = executeCallbackOnScroll(getDataAndUpdate);

  return (
    <>
      <ScrollView
        style={styles.view}
        className="page"
        onScroll={handleScroll}
        scrollEventThrottle={40}
      >
        <PlaylistHeader
          imageSource={imageSource}
          playlist={playlist}
          songService={songService}
          toggleOptions={toggleOptions}
        />

        {lazySongs.map((songId) => {
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
              onPress={() => generateConfirmRemoveSong(songId)}
              testID="deleteSongButton"
            />
          );

          return (
            <SongItem key={song.id} song={song} actionButton={$actionButton} />
          );
        })}
      </ScrollView>

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

      {deletePlaylistDialog}

      {optionsIsOpened && (
        <YStack {...styles.options} testID="options-menu">
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
            onPress={generateConfirmDeletionPlaylist}
            buttonStyles={styles.actionsButton}
            textStyles={styles.actionsButtonText}
          />
        </YStack>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 20,
    marginTop: 20,
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
