import { PlaylistFormDialog } from "@/components/PlaylistFormDialog/PlaylistFormDialog";
import { PlaylistService } from "@/services/playlistService";
import { launchImageLibraryAsync } from "expo-image-picker";
import { act, fireEvent, render, waitFor } from "testUtils";

jest.mock("expo-image-picker", () => {
  const expoImagePicker = jest.requireActual("expo-image-picker");

  return {
    ...expoImagePicker,
    launchImageLibraryAsync: jest.fn(),
  };
});

const playlistMock = {
  id: 1,
  name: "Playlist name",
  description: "Playlist description",
  songs: [],
  imageUri: "image-uri",
};

describe("PlaylistFormDialog", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    PlaylistService.prototype.getById = jest.fn((id) => ({
      ...playlistMock,
      id,
    }));
  });
  it("should render input with edit infos", () => {
    const editInfos = {
      id: 1,
      defaultValues: {
        name: "Playlist name",
        description: "Playlist description",
        imageSource: "test-uri",
      },
    };

    const { getByDisplayValue, getByTestId, getByText } = render(
      <PlaylistFormDialog setOpen={jest.fn()} editInfos={editInfos} />,
    );

    const name = getByDisplayValue(editInfos.defaultValues.name);
    const description = getByDisplayValue(editInfos.defaultValues.description);

    expect(name).toBeVisible();
    expect(description).toBeVisible();

    const image = getByTestId("playlist-image");

    expect(image.props.source).toEqual({
      uri: editInfos.defaultValues.imageSource,
    });

    const saveButton = getByText("Save");
    const cancelButton = getByText("Cancel");

    expect(saveButton).toBeVisible();
    expect(cancelButton).toBeVisible();
  });

  it("should render save button with text 'Create' when edit infos is not passed", () => {
    const { getByText } = render(<PlaylistFormDialog setOpen={jest.fn()} />);

    const button = getByText("Create");

    expect(button).toBeVisible();
  });

  it("should disable save button when name input is invalid", async () => {
    const { getByTestId } = await waitFor(() =>
      render(<PlaylistFormDialog setOpen={jest.fn()} />),
    );

    const saveButton = getByTestId("save-button");
    const nameInput = getByTestId("name-input");

    fireEvent(nameInput, "changeText", '"');
    expect(saveButton).toBeDisabled();

    fireEvent(nameInput, "changeText", "\\");
    expect(saveButton).toBeDisabled();

    fireEvent(nameInput, "changeText", "");
    expect(saveButton).toBeDisabled();
  });

  it("should save button is disabled when description input is invalid", () => {
    const { getByTestId } = render(<PlaylistFormDialog setOpen={jest.fn()} />);

    const saveButton = getByTestId("save-button");
    const description = getByTestId("description-input");

    const name = getByTestId("description-input");
    fireEvent(name, "changeText", "valid name");

    fireEvent(description, "changeText", "\\");
    expect(saveButton).toBeDisabled();

    const maxLengthValue =
      "max length input error when has more than 250 characters".repeat(10);
    fireEvent(description, "changeText", maxLengthValue);
    expect(saveButton).toBeDisabled();
  });

  it("should call update method on press save button when edit infos is passed", async () => {
    const updateMock = jest.fn();

    PlaylistService.prototype.update = updateMock;

    const newUri = "new-image-uri";
    (launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      canceled: false,
      assets: [{ uri: newUri }],
    });

    const editInfos = {
      id: playlistMock.id,
      defaultValues: {
        name: playlistMock.name,
        description: playlistMock.description,
        imageSource: playlistMock.imageUri,
      },
    };

    const { getByTestId } = render(
      <PlaylistFormDialog setOpen={jest.fn()} editInfos={editInfos} />,
    );

    const name = getByTestId("name-input");
    const description = getByTestId("description-input");
    const image = getByTestId("playlist-image");
    const saveButton = getByTestId("save-button");

    const newPlaylistName = "newPlaylistName";
    const newDescription = "new description";

    fireEvent(name, "changeText", newPlaylistName);
    fireEvent(description, "changeText", newDescription);

    await act(async () => {
      fireEvent(image, "press");
    });

    fireEvent(saveButton, "press");

    const expectedObject = {
      ...playlistMock,
      name: newPlaylistName,
      description: newDescription,
      imageUri: newUri,
    };

    expect(updateMock).toHaveBeenCalledWith(expectedObject);
  });

  it("should call update method on press create button", async () => {
    const createMock = jest.fn();

    PlaylistService.prototype.create = createMock;

    const uri = "image-uri";
    (launchImageLibraryAsync as jest.Mock).mockResolvedValue({
      canceled: false,
      assets: [{ uri }],
    });

    const { getByTestId } = render(<PlaylistFormDialog setOpen={jest.fn()} />);

    const name = getByTestId("name-input");
    const description = getByTestId("description-input");
    const image = getByTestId("playlist-image");
    const createButton = getByTestId("save-button");

    const playlistName = "newPlaylistName";
    const playlistDescription = "new description";

    fireEvent(name, "changeText", playlistName);
    fireEvent(description, "changeText", playlistDescription);

    await act(async () => {
      fireEvent(image, "press");
    });

    fireEvent(createButton, "press");

    const expectedObject = {
      name: playlistName,
      description: playlistDescription,
      imageUri: uri,
    };

    expect(createMock).toHaveBeenCalledWith(expectedObject);
  });
});
