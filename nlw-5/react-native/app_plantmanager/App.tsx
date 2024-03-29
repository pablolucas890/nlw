import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes';
import * as Notifications from 'expo-notifications';


import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';
import { PlantProps } from './src/libs/storage';

export default function App() {
  const [ fontsLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notifications => {
        const data = notifications.request.content.data.plant as PlantProps;
        console.log(data)
      })

      return () => subscription.remove();
  })
  // Retorno de loading enquanto as fontes nao foram carregadas
  if(!fontsLoaded)
    return <AppLoading/>

  return (
    <Routes/>
  )
}

