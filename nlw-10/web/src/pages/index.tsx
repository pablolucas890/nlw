
import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

interface HomeProps {
   poolCount: number;
   guessCount: number;
   userCount: number;
}

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {

   const [poolTitle, setPoolTitle] = useState('')

   async function createPool(event: FormEvent) {
      event.preventDefault()
      const { data } = await api.post('/pools', {
         title: poolTitle,
      })
      const code = data.code
      await navigator.clipboard.writeText(code)
      setPoolTitle("")
      alert("Bolao Criado com Sucesso, o Codigo Foi Copiado para a Area de Transferencia")
   }

   return (
      <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
         <main>
            <Image
               quality={100}
               src={logoImg}
               alt="NLW Copa" />
            <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>
               Crie seu próprio bolão da copa e compartilhe entre amigos!
            </h1>
            <div className='mt-10 flex items-center gap-2'>
               <Image
                  quality={100}
                  src={usersAvatarExampleImg}
                  alt="" />
               <strong className='text-gray-100'>
                  <span className='text-ignite-500 text-xl'>+{userCount} </span>
                  pessoas já estão usando
               </strong>
            </div>
            <form onSubmit={createPool} className='mt-10 flex gap-2'>
               <input
                  className='text-gray-100 flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm'
                  type="text"
                  required
                  placeholder='Qual o nome do seu bolao?'
                  value={poolTitle}
                  onChange={event => setPoolTitle(event.target.value)}
               />
               <button
                  className='px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700'
                  type="submit">
                  Criar meu Bolao
               </button>
            </form>
            <p className='text-gray-300 mt-4 text-sm leading-relaxed'>
               Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
            </p>
            <div className='mt-10 pt-10 border-t border-gray-600 flex justify-between items-center text-gray-100'>
               <div className='flex items-center gap-6'>
                  <Image
                     quality={100}
                     src={iconCheckImg}
                     alt="" />
                  <div className='flex flex-col'>
                     <span className='font-bold text-2xl'>+{poolCount}</span>
                     <span>Bolões criados</span>
                  </div>
               </div>
               <div className='w-px h-10 bg-gray-600 h-14' />
               <div className='flex items-center gap-6'>
                  <Image
                     quality={100}
                     src={iconCheckImg}
                     alt="" />
                  <div className='flex flex-col'>
                     <span className='font-bold text-2xl'>+{guessCount}</span>
                     <span>Palpites enviados</span>
                  </div>
               </div>
            </div>
         </main>
         <Image
            quality={100}
            src={appPreviewImg}
            alt="Dois Celulares Exibindo uma Previa da Aplicacao do NLW Copa" />
      </div>
   )
}

export const getServerSideProps = async () => {
   const [poolCountResponse, guessCountResponse, usersCountResponse] = await Promise.all([
      api.get('/pools/count'),
      api.get('/guesses/count'),
      api.get('/users/count')
   ])
   return {
      props: {
         poolCount: poolCountResponse.data.count,
         guessCount: guessCountResponse.data.count,
         userCount: usersCountResponse.data.count,
      }
   }
}
