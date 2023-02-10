import { Center, StatusBar, Icon, Text } from 'native-base';
import { Fontisto } from '@expo/vector-icons'

import Logo from '../assets/logo.svg'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';


export function SignIn() {

   const { isUserLoading, signIn } = useAuth();
   return (
      <Center flex={1} bgColor="gray.900" alignItems={"center"} justifyContent="center" p={7}>
         <StatusBar barStyle={'default'} />
         <Logo width={212} height={40} />
         <Button
            type='SECONDARY'
            title={"Entrar com Google"}
            leftIcon={<Icon as={Fontisto} name="google" color={"white"} size="md" />}
            mt={12}
            onPress={() => signIn()}
            isLoading={isUserLoading}
            _loading={{ _spinner: { color: "white" } }}
         />
         <Text color="white" textAlign="center" mt={4}>
            Não Utilizamos nenhuma informação além {'\n'} de seu e-mail para criação de sua conta.
         </Text>
      </Center>
   )
}