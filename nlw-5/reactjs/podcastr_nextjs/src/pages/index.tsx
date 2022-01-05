//                                      SPA
/*
- useEffect com um fetch quando a pagina for requisitada)
*/

//                                      SSR
/*
- Colocar a funcao:

  export async function getServerSideProps(){
    //Fazer o fetch

    return {
      props: {
        data
      }
    }
  }

- Receber o retorno (props) da funcao da function Home()
*/

//                                      SSG
/*
- Colocar a funcao:

  export async function getStaticProps(){
    //Fazer o fetch

    return {
      props: {
        data
      },
      revalidate: 60 * 60 * 8,
    }
  }

- Receber o retorno (props) da funcao da function Home()
*/

export default function Home(props) {
  return (
    <>
      <h1>Index</h1>
      <li>
        {JSON.stringify(props.episodes)}
      </li>
    </>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}