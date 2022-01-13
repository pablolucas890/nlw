import { createContext } from "react";

interface EpisodeProps {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}
interface PlayerContextData {
    episodeList: EpisodeProps[];
    currentEpisode: number;
    play: (episode: EpisodeProps) => void;
    isPlaying: boolean;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
}
export const PlayerContext = createContext({} as PlayerContextData);