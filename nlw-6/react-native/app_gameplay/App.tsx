import React from 'react';
import { StatusBar } from 'react-native'
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import { Rajdhani_500Medium, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';
import AppLoading from 'expo-app-loading';
import { AuthProvider } from './src/hooks/auth';

import { BackGround } from './src/components/BackGround';
import Routes from './src/routes';

export default function App() {

	const [fontsLoaded] = useFonts({
		Inter_400Regular,
		Inter_500Medium,
		Rajdhani_500Medium,
		Rajdhani_700Bold
	})

	if (!fontsLoaded) {
		return <AppLoading />
	}
	return (
		<BackGround>
			<StatusBar
				barStyle='light-content'
				backgroundColor='transparent'
				translucent
			/>
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</BackGround>
	);
}
