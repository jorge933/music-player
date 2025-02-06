import { Playlist } from "@/interfaces";
import { Song } from "@/interfaces/Song";
import { PlaylistService } from "@/services/playlistService";
import { SongService } from "@/services/songService";
import { AVPlaybackStatus, Audio } from "expo-av";
import { useRef, useState } from "react";

export interface PlayingSong {
  song: Song;
  playlistId: number;
  playedSeconds: number;
}

interface EssentialProps {
  player: React.MutableRefObject<Audio.Sound | null>;
  currentSongPlaying: PlayingSong | null;
  setCurrentSongPlaying: React.Dispatch<
    React.SetStateAction<PlayingSong | null>
  >;
  playlistService: PlaylistService;
  songService: SongService;
}

export function useSongPlayerControl() {
  const songService = new SongService();
  const playlistService = new PlaylistService();
  const player = useRef<Audio.Sound | null>(null);
  const [currentSongPlaying, setCurrentSongPlaying] =
    useState<PlayingSong | null>(null);

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
    play: (videoId: string, playlistId: number) =>
      play(videoId, playlistId, generateEssentialPropsObj()),
    currentSongPlaying,
    skipToNext: () => skip(generateEssentialPropsObj()),
    skipToPrevious: () => skip(generateEssentialPropsObj(), false),
  };
}

async function play(
  videoId: string,
  playlistId: number,
  essentialProps: EssentialProps,
) {
  const { player, setCurrentSongPlaying, songService } = essentialProps;
  if (player.current) await player.current.unloadAsync();

  player.current = new Audio.Sound();

  const song = songService.getById(videoId) as Song;

  player.current.loadAsync({ uri: song.path }, { shouldPlay: true });

  player.current.setOnPlaybackStatusUpdate((status) =>
    handleStatusUpdate(status, essentialProps),
  );

  setCurrentSongPlaying({ playedSeconds: 0, playlistId, song });
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
      ...(currentSongPlaying as PlayingSong),
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
