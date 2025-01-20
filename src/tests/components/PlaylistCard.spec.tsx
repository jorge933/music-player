import { fireEvent, render } from "testUtils";
import { PlaylistCard } from "../../app/components/PlaylistCard/PlaylistCard";
import { useRouter } from "expo-router";

const playlistMock = {
  id: 1,
  name: "Playlist 1",
  songs: ["video_1", "video_2"],
};

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("PlaylistCard", () => {
  it("should render playlist name, description, number of songs and image", () => {
    const { getByText, getByTestId } = render(
      <PlaylistCard {...playlistMock} />,
    );

    const name = getByText(playlistMock.name);
    const numberOfMusics = getByText("2 musics");
    const image = getByTestId("image");

    expect(name).toBeVisible();
    expect(numberOfMusics).toBeVisible();
    expect(image).toBeVisible();
  });

  it("should be not visible when id is 0", () => {
    const { getByTestId } = render(<PlaylistCard {...playlistMock} id={0} />);

    const playlistCard = getByTestId("playlist-card");

    expect(playlistCard).not.toBeVisible();
  });

  it("should navigate to playlist page when card is pressed", () => {
    const pushMock = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    const { getByTestId } = render(<PlaylistCard {...playlistMock} />);

    const playlistCard = getByTestId("playlist-card");

    fireEvent(playlistCard, "press");

    expect(pushMock).toHaveBeenCalledWith({
      pathname: "/(tabs)/playlist",
      params: { id: playlistMock.id },
    });
  });
});
