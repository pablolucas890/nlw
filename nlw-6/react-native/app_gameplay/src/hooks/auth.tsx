import React,
{
	createContext,
	useContext,
	useState,
	ReactNode
} from "react";
import * as AuthSession from 'expo-auth-session';
import { REDIRECT_URI, SCOPE, RESPONSE_TYPE, CLIENT_ID, CDN_ID } from '../config';
import { api } from "../services/api";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLLECTION_USER } from "../config/database";
import { useEffect } from "react";

interface User {
	id: string;
	username: string;
	firstName: string;
	avatar: string;
	email: string;
	token: string;
}

interface AuthContextData {
	user: User;
	loading: boolean;
	singIn: () => Promise<void>;
	singOut: () => Promise<void>;
}

interface AuthProviderProps {
	children: ReactNode
}

type AuthResponse = AuthSession.AuthSessionResult & {
	params: {
		access_token?: string;
		error?: string;
	}
}
export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

	const [user, setUser] = useState<User>({} as User);
	const [loading, setLoading] = useState(false);


	async function singIn() {

		try {
			setLoading(true);
			const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

			// para onde o user vai para se autenticar
			const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthResponse

			if (type === 'success' && !params.error) {
				api.defaults.headers.authorization = `Bearer ${params.access_token}`

				const userInfo = await api.get('/users/@me')
				const firstName = userInfo.data.username.split(' ')[0];
				userInfo.data.avatar = `${CDN_ID}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`

				const userData = {
					...userInfo.data,
					firstName,
					token: params.access_token
				}
				await AsyncStorage.setItem('@gameplay:user', JSON.stringify(userData));
				setUser(userData);
			} else {
				Alert.alert('Erro ao receber o token')
			}
		} catch {
			Alert.alert('Erro ao receber o token')
		} finally {
			setLoading(false)
		}


	}
	async function singOut() {
		setUser({} as User);
		await AsyncStorage.clear()
	}
	async function loadUserStorageData() {
		const storage = await AsyncStorage.getItem('@gameplay:user');
		const userLogged = storage ? (JSON.parse(storage) as User) : {} as User;
		if (userLogged) {
			api.defaults.headers.authorization = `Bearer ${userLogged.token}`
			setUser(userLogged);
		} else {
			console.log('Sem usuario no armazenamento interno')
		}

	}

	useEffect(() => {
		loadUserStorageData();
	}, [])
	return (
		<AuthContext.Provider
			value={{
				user,
				loading,
				singIn,
				singOut
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

function useAuth() {
	const context = useContext(AuthContext);

	return context;
}

export { AuthProvider, useAuth }
