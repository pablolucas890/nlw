import Image from 'next/image';
import { useContext, useRef, useEffect, useState } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext'
import styles from './styles.module.scss'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

export function Player() {
    const {
        episodeList,
        playNext,
        playPrevious,
        isPlaying,
        currentEpisode,
        setPlayingState,
        isShuf,
        toggleShuf,
        isLooping,
        toggleLoop,
        togglePlay
    } = useContext(PlayerContext);
    const audioRef = useRef<HTMLAudioElement>(null);
    const episode = episodeList[currentEpisode];
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!audioRef.current) {
            return;
        }
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying])

    function setupProgress() {
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime))
        })
    }
    function handleChangeProgress(duration: number) {
        audioRef.current.currentTime = duration
        setProgress(duration)
    }
    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando agora" />
                <strong>Tocando agora</strong>
            </header>
            {
                episode
                    ?
                    (
                        <div className={styles.currentEpisode}>
                            <Image width={592} height={592} src={episode.thumbnail} objectFit='cover' />
                            <strong>{episode.title}</strong>
                            <span>{episode.members}</span>
                        </div>
                    )
                    :
                    (
                        <div className={styles.emptyPlayer}>
                            <strong>Selecione um podcast para ouvir</strong>
                        </div>
                    )
            }
            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className={styles.slider}>
                        {
                            episode
                                ?
                                (
                                    <Slider
                                        max={episode.duration}
                                        value={progress}
                                        onChange={handleChangeProgress}
                                        trackStyle={{
                                            backgroundColor: "#04d361",
                                        }}
                                        railStyle={{
                                            backgroundColor: '#9f75ff'
                                        }}
                                        handleStyle={{
                                            borderColor: '#04d361',
                                            borderWidth: 4
                                        }}
                                    />
                                )
                                :
                                (
                                    <div className={styles.emptySlider} />
                                )

                        }
                    </div>
                    <span>{convertDurationToTimeString(episode ? episode.duration : 0)}</span>
                </div>
                {
                    episode
                    &&
                    (
                        <audio
                            src={episode.url}
                            ref={audioRef}
                            autoPlay
                            onEnded={playNext}
                            onPlay={() => setPlayingState(true)}
                            onPause={() => setPlayingState(false)}
                            loop={isLooping}
                            onLoadedMetadata={setupProgress}
                        />
                    )
                }
                <div className={styles.buttons}>
                    <button type='button' onClick={toggleShuf} disabled={!episode || episodeList.length == 1} className={isShuf ? styles.isActive : ''}>
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type='button' disabled={!episode || episodeList[0] == episode} onClick={playPrevious}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button type='button' disabled={!episode} onClick={togglePlay} className={styles.playButton}>
                        {
                            !isPlaying
                                ?
                                <img src="/play.svg" alt="Tocar" />
                                :
                                <img src="/pause.svg" alt="Pausar" />
                        }
                    </button>
                    <button type='button' disabled={!episode || episode == episodeList[episodeList.length - 1]} onClick={playNext}>
                        <img src="/play-next.svg" alt="Tocar próxima" />
                    </button>
                    <button type='button' disabled={!episode} onClick={toggleLoop} className={isLooping ? styles.isActive : ''}>
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>
    )
}