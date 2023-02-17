import { Heading, Text, VStack, useToast } from "native-base";
import { Header } from "../components/Header";

import Logo from '../assets/logo.svg'
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";

export function New() {
   const [poolName, setPoolName] = useState("")

   const tost = useToast()

   async function handlePoolCreate() {
      if (!poolName.trim()) {
         return tost.show({
            title: 'Informe o Nome para o seu Bolao',
            placement: 'top',
            bgColor: 'red.500'
         })
      }
   }

   return (
      <VStack flex={1} bgColor="gray.900" >
         <Header title="Criar Novo Bolão" />
         <VStack mt={8} mx={5} alignItems="center">
            <Logo />
            <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center" >
               Crie seu próprio bolão da copa e compartilhe entre amigos!
            </Heading>
            <Input
               mb={2}
               placeholder="Qual o nome do seu bolão?"
               value={poolName}
               onChangeText={setPoolName}
            />
            <Button
               onPress={() => handlePoolCreate()}
               title="Criar meu Bolão"
            />
            <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
               Após criar seu bolão, você receberá um código único
               que poderá usar para convidar outras pessoas!
            </Text>
         </VStack>
      </VStack>
   )
}