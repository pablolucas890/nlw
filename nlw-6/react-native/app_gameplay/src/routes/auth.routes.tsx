import React from "react";
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from "../screans/Home";
import { SingIn } from "../screans/SingIn";


const { Navigator, Screen } = createStackNavigator();

export default function AuthRoutes() {
	return (
		<Navigator
			headerMode="none"
			screenOptions={{
				cardStyle:{
					backgroundColor: 'transparent'
				}
			}}
		>
			<Screen 
				name="SingIn"
				component={SingIn}
			/>
			<Screen 
				name="Home"
				component={Home}
			/>
		</Navigator>
	)
}
