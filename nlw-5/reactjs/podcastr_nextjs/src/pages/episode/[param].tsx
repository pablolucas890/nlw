import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
import parseISO from "date-fns/parseISO";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { api } from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTimeString";
import styles from './episode.module.scss';
import Link from 'next/link'

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
    description: string;
}

interface EpisodeProps {
    episode: Episode;
}

export default function Episode({ episode }: EpisodeProps) {

    return (
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>
                <Link href='/'>
                    <button type="button">
                        <img src="/arrow-left.svg" alt="Voltar" />
                    </button>
                </Link>
                <Image
                    width={700}
                    height={160}
                    src={episode.thumbnail}
                    objectFit="cover"
                />
                <button type="button">
                    <img src="/play.svg" alt="Tocar Episódio" />
                </button>
            </div>
            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>

            <div className={styles.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    //como estamos passando parametros pro next, ele nao sabe quais paginas serao criadas
    //para isso serve esta função

    // Ultimos e episodes serao gerados de maneira estatica no build para uma melho velocidade de 
    //carregamento

    const { data } = await api.get('episodes', {
        params: {
            _limit: 2,
            _sort: 'published_at',
            _order: 'desc'
        }
    })

    const paths = data.map(episode => {
        return {
            params: {
                param: episode.id
            }
        }
    })
    return {
        paths,// gera as pages de forma estática
        fallback: 'blocking' // true -> gera a pagina no navegador // blocking gera as paginas no next
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    const { param } = ctx.params;
    const { data } = await api.get(`/episodes/${param}`)
    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
            locale: ptBR
        }),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToTimeString(data.file.duration),
        description: data.description,
        url: data.file.url
    }
    return {
        props: {
            episode,
        },
        revalidate: 60 * 60 * 24, // 24h
    }
}