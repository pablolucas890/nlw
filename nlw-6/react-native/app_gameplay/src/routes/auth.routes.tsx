import React from "react";
import { createStackNavigator } from '@react-navigation/stack'

import { Home } from "../screans/Home";
import { SingIn } from "../screans/SingIn";
import { theme } from "../global/styles/theme";
import { AppointmentDetails } from "../screans/AppointmentDetails";
import { AppointmentCreate } from "../screans/AppointmentCreate";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
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
				name="Home"
				component={Home}
			/>
			<Screen 
				name="AppointmentDetails"
				component={AppointmentDetails}
			/>
			<Screen 
				name="AppointmentCreate"
				component={AppointmentCreate}
			/>
			
		</Navigator>
	)
}
export function SigIn() {
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
			
		</Navigator>
	)
}
