import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import {AuthRoutes,SigIn} from "./auth.routes";
import { useAuth } from "../hooks/auth";
export default function Routes() {
	const { user } = useAuth();
	return (
		<NavigationContainer>
			{
				user.id
					?
					<AuthRoutes />
					:
					<SigIn />
			}
		</NavigationContainer>
	)
}
