import { Center, StatusBar, Text } from 'native-base';

export function SignIn() {
    return (
        <Center flex={1} bgColor="gray.900" alignItems={"center"} justifyContent="center">
            <Text color={"white"} fontFamily="heading" fontSize={24}>Hello Word!!</Text>
            <StatusBar barStyle={'default'} />
        </Center>
    )
}