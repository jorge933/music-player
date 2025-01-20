import { PlaylistService } from "@/services/playlistService";
import React from "react";
import { fireEvent, render } from "testUtils";
import { PlaylistPage } from "@/pages/PlaylistPage";

jest.mock("@/services/playlist/playlistService", () => ({
  PlaylistService: jest.fn().mockImplementation(() => ({
    getById: jest.fn((id) => ({
      id,
      name: "Sample Playlist",
      description: "This is a sample playlist",
      imageUri: null,
      songs: [{ id: 1, name: "Song 1" }],
    })),
    getAll: jest.fn(() => []),
  })),
}));

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn().mockReturnValue({ id: "1" }),
}));

describe.only("PlaylistPage Component", () => {
  it("should render playlist details", () => {
    const { getByText, getByTestId } = render(<PlaylistPage />);

    expect(getByText("Sample Playlist")).toBeVisible();
    expect(getByText("This is a sample playlist")).toBeVisible();
    expect(getByText("1 music")).toBeVisible();
    expect(getByTestId("image")).toBeVisible();
  });

  it("should show the add music dialog when the button is pressed", () => {
    const { getByText, getByTestId } = render(<PlaylistPage />);

    const optionsButton = getByTestId("toggle-options-button");
    fireEvent(optionsButton, "press");

    const addMusicButton = getByText("Add Music");
    fireEvent(addMusicButton, "press");

    expect(getByText("Add Song")).toBeVisible();
  });

  it("should show the edit playlist dialog when the button is pressed", () => {
    const { getByText, getByTestId } = render(<PlaylistPage />);

    const optionsButton = getByTestId("toggle-options-button");
    fireEvent(optionsButton, "press");

    const editDetailsButton = getByText("Edit Details");
    fireEvent(editDetailsButton, "press");

    expect(getByText("Edit Playlist")).toBeVisible();
  });

  it("should show the delete playlist dialog when the button is pressed", () => {
    const { getByText, getByTestId } = render(<PlaylistPage />);

    const optionsButton = getByTestId("toggle-options-button");
    fireEvent(optionsButton, "press");

    const deletePlaylistButton = getByText("Delete Playlist");
    fireEvent(deletePlaylistButton, "press");

    expect(getByText(/Delete this/gi)).toBeVisible();
  });

  it("should toggle the options menu when the options button is pressed", () => {
    const { queryByTestId, getByTestId } = render(<PlaylistPage />);

    const optionsButton = getByTestId("toggle-options-button");
    fireEvent(optionsButton, "press");

    expect(queryByTestId("options-menu")).toBeVisible();

    fireEvent(optionsButton, "press");

    expect(queryByTestId("options-menu")).not.toBeVisible();
  });

  it("should handle playlists not found", () => {
    (PlaylistService as jest.Mock).mockImplementation(() => ({
      getById: jest.fn().mockReturnValue(null),
    }));

    const { queryByTestId } = render(<PlaylistPage />);

    expect(queryByTestId("playlist-details")).not.toBeVisible();
  });
});
