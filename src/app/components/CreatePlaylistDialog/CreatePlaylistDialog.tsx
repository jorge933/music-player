import { Image, ImageRequireSource, StyleSheet, Text } from "react-native";
import BaseDialog from "../BaseDialog/BaseDialog";
import { CreatePlaylistDialogProps } from "./CreatePlaylistDialog.types";
import { useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { XStack, YStack } from "tamagui";
import { COLORS } from "@/constants/Colors";
import { Control, FieldValue, FieldValues, useForm } from "react-hook-form";
import TextInputControlled from "../TextInputControlled/TextInputControlled";
import { BASE_INPUT_PROPS } from "@/constants/BaseInputProps";
import Button from "../Button/Button";
import { Playlist } from "@/interfaces/Playlist";
import { StorageContext } from "@/services/Storage/Storage.service";

export default function CreatePlaylistDialog({
  setOpen,
}: CreatePlaylistDialogProps) {
  const storageService = useContext(StorageContext);

  const {
    control,
    formState: { errors, isValid },
    watch,
  } = useForm({
    mode: "onChange",
  });
  const playlistName = watch("playlistName");
  const description = watch("description");

  const [imageSource, setImageSource] = useState<
    ImageRequireSource | { uri: string }
  >(require("../../../assets/images/choose-playlist-image.jpg"));

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const [image] = result.assets;
      setImageSource({ uri: image.uri });
    }
  };

  const createPlaylist = () => {
    const isObject = typeof imageSource === "object";
    const image = isObject ? imageSource.uri : null;
    const id = storageService.getItem<number>("lastId") + 1 || 1;

    const newPlaylist: Playlist = {
      id,
      name: playlistName,
      description,
      songs: [],
      imageUrl: image,
    };

    const playlistsInStorage =
      storageService.getItem<string>("playlists") || "[]";
    const playlists: Playlist[] = JSON.parse(playlistsInStorage);

    playlists.push(newPlaylist);

    const playlistsStringify = JSON.stringify(playlists);

    storageService.setItem("playlists", playlistsStringify);
    storageService.setItem("lastId", id);
  };

  return (
    <BaseDialog open={true} setOpen={setOpen} title="Create Playlist">
      <YStack {...styles.container}>
        <YStack onPress={pickImage} alignItems="center">
          <Image source={imageSource} style={styles.image} />
          <Text style={styles.chooseImageText}>Choose An Image</Text>
        </YStack>

        <TextInputControlled
          control={control}
          errors={errors}
          rules={{ required: true }}
          name="playlistName"
          inputProps={{
            ...BASE_INPUT_PROPS,
            placeholder: "New Playlist Name...",
          }}
          inputContainerStyles={{ backgroundColor: COLORS.black }}
        />

        <TextInputControlled
          name="description"
          control={control}
          errors={errors}
          rules={{ maxLength: 250 }}
          inputProps={{
            ...BASE_INPUT_PROPS,
            placeholder: "New Playlist Description...",
            multiline: true,
            numberOfLines: 5,
          }}
          inputStyles={{ paddingVertical: 5, textAlign: "left" }}
          inputContainerStyles={{
            backgroundColor: COLORS.black,
            borderRadius: 5,
          }}
        />

        <Button
          title="Create"
          closeDialog
          disabled={!isValid}
          onPress={createPlaylist}
        />
        <Button
          title="Cancel"
          closeDialog
          buttonStyles={{
            backgroundColor: COLORS.transparentWhite,
            marginVertical: 20,
          }}
        />
      </YStack>
    </BaseDialog>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  chooseImageText: {
    color: COLORS.white,
    fontFamily: "LatoSemiBold",
    fontSize: 16,
    marginBottom: 20,
  },
});
