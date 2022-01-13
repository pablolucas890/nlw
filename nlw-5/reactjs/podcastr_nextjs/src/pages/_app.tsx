import { Header } from '../components/Header'
import { Player } from '../components/Player'
import '../styles/global.scss'
import styles from '../styles/app.module.scss'
import { PlayerContext } from '../contexts/PlayerContext'
import { useState } from 'react'


function MyApp({ Component, pageProps }) {

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [isPlaying, setPlaying] = useState(false);

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisode(0);
    setPlaying(true)
  }

  function togglePlay() {
    setPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean){
    setPlaying(state);
  }
  return (
    <PlayerContext.Provider
      value={
        {
          episodeList,
          currentEpisode,
          play,
          isPlaying,
          togglePlay,
          setPlayingState
        }
      }>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  )
}

export default MyApp
