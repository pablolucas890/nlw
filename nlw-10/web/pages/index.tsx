interface HomeProps {
  count: number;
}

export default function Home({ count }: HomeProps) {
  return (
    <h1>Ola Mundo {count}</h1>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const { count } = await response.json()
  return {
    props: {
      count,
    }
  }
}
