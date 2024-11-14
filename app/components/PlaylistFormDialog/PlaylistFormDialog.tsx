import { BASE_INPUT_PROPS } from "@/constants/BaseInputProps";
import { COLORS } from "@/constants/Colors";
import { Playlist } from "@/interfaces/Playlist";
import { StorageContext } from "@/services/Storage/Storage.service";
import * as ImagePicker from "expo-image-picker";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Image, ImageRequireSource, StyleSheet, Text } from "react-native";
import { YStack } from "tamagui";
import BaseDialog from "../BaseDialog/BaseDialog";
import Button from "../Button/Button";
import TextInputControlled from "../TextInputControlled/TextInputControlled";
import { PlaylistFormDialogProps } from "./PlaylistFormDialog.types";

export default function PlaylistFormDialog({
  setOpen,
  editInfos,
}: PlaylistFormDialogProps) {
  const storageService = useContext(StorageContext);

  const defaultValues = editInfos?.defaultValues;
  const initialFormValues = {
    playlistName: defaultValues?.name || "",
    description: defaultValues?.description || "",
  };

  const {
    control,
    formState: { isValid },
    watch,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: initialFormValues,
  });

  const playlistName = watch("playlistName");
  const description = watch("description");

  const savedImageUri = defaultValues?.imageSource;
  const initialImageSource = savedImageUri
    ? { uri: savedImageUri }
    : require("../../../assets/images/choose-playlist-image.jpg");

  const [imageSource, setImageSource] = useState<
    ImageRequireSource | { uri: string }
  >(initialImageSource);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const [image] = result.assets;
      setImageSource({ uri: image.uri });
    }
  };

  const playlistsInStorage =
    storageService.getItem<string>("playlists") || "[]";
  const playlists: Playlist[] = JSON.parse(playlistsInStorage);

  const resolveImageUri = () => {
    const isObject = typeof imageSource === "object";
    const image = isObject ? imageSource.uri : null;

    return image;
  };

  const saveToStorage = (key: string, data: unknown) => {
    const isNumber = typeof data === "number";
    if (!isNumber) {
      const dataSerialized = JSON.stringify(data);
      storageService.setItem(key, dataSerialized);
    } else storageService.setItem(key, data);
  };

  const createPlaylist = () => {
    const image = resolveImageUri();
    const idInStorage = storageService.getItem<number>("lastId") || 0;
    const id = idInStorage + 1;

    const newPlaylist: Playlist = {
      id,
      name: playlistName,
      description,
      songs: [],
      imageUri: image,
    };

    playlists.push(newPlaylist);

    saveToStorage("playlists", playlists);
    saveToStorage("lastId", id);
  };

  const editPlaylist = () => {
    const imageUri = resolveImageUri();
    const playlistUpdates: Partial<Playlist> = {
      name: playlistName,
      description,
      imageUri,
    };

    const updatedPlaylists = playlists.map((item) => {
      const isItemToUpdate = item.id === editInfos?.id;

      return isItemToUpdate ? { ...item, ...playlistUpdates } : item;
    });

    saveToStorage("playlists", updatedPlaylists);
  };

  return (
    <BaseDialog
      open={true}
      setOpen={setOpen}
      title={defaultValues ? "Edit Playlist" : "Create Playlist"}
    >
      <YStack {...styles.container}>
        <YStack onPress={handlePickImage} alignItems="center">
          <Image
            source={imageSource}
            style={styles.image}
            resizeMode="stretch"
          />
          <Text style={styles.chooseImageText}>Choose An Image</Text>
        </YStack>

        <TextInputControlled
          control={control}
          rules={{ required: true, maxLength: 15 }}
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
          rules={{ maxLength: 250 }}
          inputProps={{
            ...BASE_INPUT_PROPS,
            placeholder: "New Playlist Description...",
            multiline: true,
            numberOfLines: 5,
          }}
          inputStyles={{
            paddingVertical: 5,
            textAlign: "left",
            height: 100,
          }}
          inputContainerStyles={{
            backgroundColor: COLORS.black,
            borderRadius: 5,
          }}
        />

        <Button
          title={defaultValues ? "Save" : "Create"}
          closeDialog
          disabled={!isValid}
          onPress={editInfos ? editPlaylist : createPlaylist}
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
