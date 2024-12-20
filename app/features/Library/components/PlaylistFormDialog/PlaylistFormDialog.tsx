/* eslint-disable react-hooks/exhaustive-deps */
import { BaseDialog } from "@/components/BaseDialog/BaseDialog";
import { Button } from "@/components/Button/Button";
import { TextInputWithValidations } from "@/components/TextInputWithValidations/TextInputWithValidations";
import { BASE_INPUT_PROPS } from "@/constants/BaseInputProps";
import { COLORS } from "@/constants/Colors";
import { useFormControl } from "@/hooks/useFormControl/useFormControl";
import { Playlist } from "@/interfaces/Playlist";
import { PlaylistService } from "@/services/playlistService/playlistService";
import { maxLength } from "@/validators/maxLength";
import { regex } from "@/validators/regex";
import { required } from "@/validators/required";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";
import { Image, ImageRequireSource, StyleSheet, Text } from "react-native";
import { YStack } from "tamagui";
import { PlaylistFormDialogProps } from "./PlaylistFormDialog.types";

export function PlaylistFormDialog({
  editInfos,
  setOpen,
  onClose,
}: PlaylistFormDialogProps) {
  const playlistService = new PlaylistService();

  const defaultValues = editInfos?.defaultValues;

  const fieldsRegex = /^[^"\\]*$/;
  const regexErrorMessage = `Is not allowed " and \\ in this field`;

  const nameControl = useFormControl(defaultValues?.name || null, [
    required,
    maxLength(15),
    regex(fieldsRegex, regexErrorMessage),
  ]);
  const descriptionControl = useFormControl(
    defaultValues?.description || null,
    [maxLength(250), regex(fieldsRegex, regexErrorMessage)],
  );

  const { isValid: nameIsValid } = nameControl;
  const { isValid: descriptionIsValid } = descriptionControl;

  const savedImageUri = defaultValues?.imageSource;
  const initialImageSource = savedImageUri
    ? { uri: savedImageUri }
    : require("@assets/images/choose-playlist-image.jpg");

  const [imageSource, setImageSource] = useState<
    ImageRequireSource | { uri: string }
  >(initialImageSource);

  const handlePickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const [image] = result.assets;
      setImageSource({ uri: image.uri });
    }
  }, []);

  const resolveImageUri = useCallback(() => {
    const isObject = typeof imageSource === "object";
    const image = isObject ? imageSource.uri : null;

    return image;
  }, [imageSource]);

  const trimValues = useCallback(() => {
    const { value: name } = nameControl;
    const { value: description } = descriptionControl;

    const values = {
      name: name.trim(),
      description: description.trim(),
    };

    return values;
  }, [descriptionControl, nameControl]);

  const createPlaylist = useCallback(() => {
    const imageUri = resolveImageUri();
    const values = trimValues();

    const newPlaylist: Omit<Playlist, "id"> = {
      ...values,
      imageUri,
      songs: [],
    };

    playlistService.create(newPlaylist);
  }, [resolveImageUri, trimValues]);

  const editPlaylist = useCallback(() => {
    const imageUri = resolveImageUri();
    const values = trimValues();
    const playlist = playlistService.getById(
      editInfos?.id as number,
    ) as Playlist;

    const updatedPlaylist: Playlist = {
      ...playlist,
      ...values,
      imageUri,
    };

    playlistService.update(updatedPlaylist);
  }, [playlistService, editInfos?.id, resolveImageUri, trimValues]);

  return (
    <BaseDialog
      open={true}
      setOpen={setOpen}
      onDialogClose={onClose}
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

        <TextInputWithValidations
          control={nameControl}
          inputProps={{
            ...BASE_INPUT_PROPS,
            placeholder: "New Playlist Name...",
          }}
          inputContainerStyles={{ backgroundColor: COLORS.black }}
        />

        <TextInputWithValidations
          control={descriptionControl}
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
          disabled={!nameIsValid && !descriptionIsValid}
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
