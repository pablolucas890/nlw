import Image from 'next/image';
import { useContext, useRef, useEffect } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext'
import styles from './styles.module.scss'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

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
                    <span>00:00</span>
                    <div className={styles.slider}>
                        {
                            episode
                                ?
                                (
                                    <Slider
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
                    <span>00:00</span>
                </div>
                {
                    episode
                    &&
                    (
                        <audio
                            src={episode.url}
                            ref={audioRef}
                            autoPlay
                            onPlay={() => setPlayingState(true)}
                            onPause={() => setPlayingState(false)}
                            loop={isLooping}
                        />
                    )
                }
                <div className={styles.buttons}>
                    <button type='button' onClick={toggleShuf} disabled={!episode} className={isShuf ? styles.isActive : ''}>
                        <img src="/shuffle.svg" alt="Embaralhar" />
                    </button>
                    <button type='button' disabled={!episode} onClick={playPrevious}>
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
                    <button type='button' disabled={!episode} onClick={playNext}>
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