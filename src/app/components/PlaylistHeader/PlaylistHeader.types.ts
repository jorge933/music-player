import { Playlist } from "@/interfaces/Playlist";
import { SongService } from "@/services/songService";
import { ImageSourcePropType } from "react-native";

export interface PlaylistHeaderProps {
  playlist: Playlist;
  songService: SongService;
  imageSource: ImageSourcePropType;
  toggleOptions: () => void;
}
