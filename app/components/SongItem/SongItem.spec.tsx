import React from "react";
import { render } from "testUtils";
import { SongItem } from "./SongItem";
import { Button } from "../Button/Button";

const mockSong = {
  title: "Test Song",
  duration: 90,
  id: "videoId",
  path: "",
};

describe("SongItem", () => {
  it("should render the song details correctly", () => {
    const { getByText, getByTestId } = render(<SongItem song={mockSong} />);

    const songTitle = getByText("Test Song");
    const songDuration = getByText("01:30");
    const playIcon = getByTestId("icon-play");

    expect(songTitle).toBeVisible();
    expect(songDuration).toBeVisible();
    expect(playIcon).toBeVisible();
  });

  it("should render the action button when provided", () => {
    const { getByText } = render(
      <SongItem
        song={mockSong}
        actionButton={<Button title="Test Action" />}
      />,
    );

    const actionButton = getByText("Test Action");
    expect(actionButton).toBeVisible();
  });
});
