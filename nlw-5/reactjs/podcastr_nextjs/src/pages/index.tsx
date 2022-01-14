import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '../services/api';
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import styles from './index.module.scss';
import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';

interface Episode {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  url: string;
}

interface HomeProps {
  lastestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ lastestEpisodes, allEpisodes }: HomeProps) {
  
  const { playList } = useContext(PlayerContext)
  const episodeList = [...lastestEpisodes, ...allEpisodes];


  return (
    <div className={styles.homePage}>
      <section className={styles.lastestEpisodes}>
        <h2>Últimos Lançamentos</h2>
        <ul>
          {
            lastestEpisodes.map((episode, index) => {
              return (
                <li key={episode.id}>
                  <Image
                    width={192}
                    height={192}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit='cover'
                  />

                  <div className={styles.episodesDetails}>
                    <Link href={`/episode/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                    <p>{episode.members}</p>
                    <span>{episode.publishedAt}</span>
                    <span>{episode.durationAsString}</span>
                  </div>
                  <button type='button' onClick={() => playList(episodeList, index)}>
                    <img src="/play-green.svg" alt="Tocar Episódio" />
                  </button>
                </li>
              )
            })
          }
        </ul>
      </section>
      <section className={styles.allEpisodes}>
        <h2>
          Todos episódios
        </h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th style={{ width: 100 }}>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              allEpisodes.map((episode, index) => {
                return (
                  <tr key={episode.id}>
                    <td>
                      <Image
                        width={120}
                        height={120}
                        src={episode.thumbnail}
                        alt={episode.title}
                        objectFit='cover'
                      />
                    </td>
                    <td>
                      <Link href={`/episode/${episode.id}`}>
                        <a>{episode.title}</a>
                      </Link>
                    </td>
                    <td>
                      {episode.members}
                    </td>
                    <td>
                      {episode.publishedAt}
                    </td>
                    <td>
                      {episode.durationAsString}
                    </td>
                    <td>
                      <button type='button' onClick={() => playList(episodeList, index + lastestEpisodes.length)}>
                        <img src="/play-green.svg" alt="Tocar Episódio" />
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {

  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  // Formatar os dados

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(episode.file.duration),
      url: episode.file.url
    }
  })

  const lastestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.lenght);
  return {
    props: {
      lastestEpisodes,
      allEpisodes
    }
  }
}