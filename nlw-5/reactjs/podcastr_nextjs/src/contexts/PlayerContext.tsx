import { createContext, ReactNode, useState } from "react";

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
    playList: (list: EpisodeProps[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    toggleLoop: () => void;
    isLooping: boolean;
    isShuf: boolean;
    toggleShuf: () => void;
}

interface PlayerContextProviderProps {
    children: ReactNode;
}

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {

    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisode, setCurrentEpisode] = useState(0);
    const [isPlaying, setPlaying] = useState(false);
    const [isLooping, setLooping] = useState(false);
    const [isShuf, setShuf] = useState(false);

    function playList(list: EpisodeProps[], index: number) {
        setEpisodeList(list);
        setCurrentEpisode(index);
        setPlaying(true);
    }

    function play(episode: EpisodeProps) {
        setEpisodeList([episode]);
        setCurrentEpisode(0);
        setPlaying(true)
    }
    function toggleShuf() {
        setShuf(!isShuf);
    }
    function playNext() {
        const nextEpisodeIndex = currentEpisode + 1;
        if (isShuf) {
            const nextEpisodeRandomIndex = Math.floor(Math.random() * episodeList.length);
            setCurrentEpisode(nextEpisodeRandomIndex)
        } else if (nextEpisodeIndex < episodeList.length) {
            setCurrentEpisode(currentEpisode + 1)
        }

    }
    function playPrevious() {
        if (currentEpisode > 0) {
            setCurrentEpisode(currentEpisode - 1);
        }
    }
    function toggleLoop() {
        setLooping(!isLooping)
    }
    function togglePlay() {
        setPlaying(!isPlaying)
    }

    function setPlayingState(state: boolean) {
        setPlaying(state);
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisode,
                play,
                isPlaying,
                togglePlay,
                setPlayingState,
                playList,
                playNext,
                playPrevious,
                toggleLoop,
                isLooping,
                isShuf,
                toggleShuf
            }}
        >
            {children}
        </PlayerContext.Provider>
    )
}