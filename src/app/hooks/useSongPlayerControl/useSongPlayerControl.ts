import { SongPlaying } from "@/contexts/songPlayerControl/songPlayerControlContext.types";
import { Playlist } from "@/interfaces";
import { Song } from "@/interfaces/Song";
import { PlaylistService } from "@/services/playlistService";
import { SongService } from "@/services/songService";
import { AVPlaybackStatus, Audio } from "expo-av";
import { useRef, useState } from "react";

interface EssentialProps {
  player: React.MutableRefObject<Audio.Sound | null>;
  currentSongPlaying: SongPlaying | null;
  setCurrentSongPlaying: React.Dispatch<
    React.SetStateAction<SongPlaying | null>
  >;
  playlistService: PlaylistService;
  songService: SongService;
}

export function useSongPlayerControl() {
  const songService = new SongService();
  const playlistService = new PlaylistService();
  const player = useRef<Audio.Sound | null>(null);
  const [currentSongPlaying, setCurrentSongPlaying] =
    useState<SongPlaying | null>(null);

  const generateEssentialPropsObj = () => {
    return {
      setCurrentSongPlaying,
      player,
      songService,
      playlistService,
      currentSongPlaying,
    };
  };

  return {
    currentSongPlaying,
    play: (videoId: string, playlistId: number) =>
      play(videoId, playlistId, generateEssentialPropsObj()),
    skipToNext: () => skip(generateEssentialPropsObj()),
    skipToPrevious: () => skip(generateEssentialPropsObj(), false),
    pauseOrResume: () => pauseOrResume(generateEssentialPropsObj()),
  };
}

async function play(
  videoId: string,
  playlistId: number,
  essentialProps: EssentialProps,
) {
  const { player, setCurrentSongPlaying, songService } = essentialProps;
  player.current
    ? await player.current.unloadAsync()
    : (player.current = new Audio.Sound());

  const song = songService.getById(videoId) as Song;

  setCurrentSongPlaying({
    playedSeconds: 0,
    playlistId,
    song,
    isPlaying: true,
  });

  player.current.loadAsync({ uri: song.path }, { shouldPlay: true });

  player.current.setOnPlaybackStatusUpdate((status) =>
    handleStatusUpdate(status, essentialProps),
  );
}

async function handleStatusUpdate(
  status: AVPlaybackStatus,
  essentialProps: EssentialProps,
) {
  const { setCurrentSongPlaying } = essentialProps;
  if (!status.isLoaded) return;

  const playedSeconds = status.positionMillis / 1000;

  setCurrentSongPlaying((currentSongPlaying) => {
    const newValue = {
      ...(currentSongPlaying as SongPlaying),
      playedSeconds,
    };

    const roundedPlayedSeconds = Math.ceil(playedSeconds);
    const songEnded = roundedPlayedSeconds >= newValue.song.duration;

    if (songEnded)
      skip({ ...essentialProps, currentSongPlaying: newValue }, true);

    return newValue;
  });
}

function skip(essentialProps: EssentialProps, isNext: boolean = true) {
  const { currentSongPlaying } = essentialProps;
  if (!currentSongPlaying) return;

  const { song, playlistId } = currentSongPlaying;

  const nextSongId = getNextSongId(song.id, playlistId, essentialProps, isNext);

  play(nextSongId, playlistId, essentialProps);
}

async function pauseOrResume(essentialProps: EssentialProps) {
  const {
    player: { current: currentPlayer },
    setCurrentSongPlaying,
  } = essentialProps;

  const status = await currentPlayer?.getStatusAsync();

  if (!status?.isLoaded) return;

  status.isPlaying ? currentPlayer?.pauseAsync() : currentPlayer?.playAsync();

  setCurrentSongPlaying((currentSongPlaying) => ({
    ...(currentSongPlaying as SongPlaying),
    isPlaying: !status.isPlaying,
  }));
}

function getNextSongId(
  songId: string,

  playlistId: number,
  essentialProps: EssentialProps,
  isNext: boolean = true,
) {
  const { playlistService, songService } = essentialProps;
  const songs = playlistId
    ? (playlistService.getById(playlistId) as Playlist).songs
    : songService.getAll();

  const nextSongId = songs.reduce((value: string | null, current, index) => {
    if (value) return value;

    const isString = typeof current === "string";
    const currentId = isString ? current : current.id;

    if (currentId === songId) {
      let nextItem: string | Song;

      if (isNext) {
        nextItem = songs[index + 1] || songs[0];
      } else {
        nextItem = songs[index - 1] || songs[songs.length - 1];
      }

      const nextId = typeof nextItem === "string" ? nextItem : nextItem.id;

      return nextId;
    }

    return null;
  }, null);

  return nextSongId as string;
}
