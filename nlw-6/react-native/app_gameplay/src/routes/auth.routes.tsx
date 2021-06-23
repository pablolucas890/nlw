import React from "react";
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from "../screans/Home";
import { SingIn } from "../screans/SingIn";
import { theme } from "../global/styles/theme";
import { AppointmentDetails } from "../screans/AppointmentDetails";

const { Navigator, Screen } = createStackNavigator();

export default function AuthRoutes() {
	return (
		<Navigator
			headerMode="none"
			screenOptions={{
				cardStyle:{
					backgroundColor: theme.colors.secondary100
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
			<Screen 
				name="AppointmentDetails"
				component={AppointmentDetails}
			/>
		</Navigator>
	)
}
