import { Icon, VStack } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Fontisto } from '@expo/vector-icons'

export function Pools() {
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus Bolões" />
            <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
                <Button
                    title="Buscar Bolão por Código"
                    leftIcon={<Icon as={Fontisto} name="google" color={"white"} size="md" />}
                />
            </VStack>
        </VStack>
    )
}