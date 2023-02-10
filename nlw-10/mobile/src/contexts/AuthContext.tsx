import { createContext, ReactNode, useState, useEffect } from "react";

import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { api } from "../services/api";

WebBrowser.maybeCompleteAuthSession(); // Garante o redirecionamento do navegador

interface UserProps {
   name: string;
   avatarUrl: string;
}

interface AuthProviderProps {
   children: ReactNode;
}

export interface AuthContextDataProps {
   user: UserProps;
   isUserLoading: boolean;
   signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {

   const [isUserLoading, setIsUserLoading] = useState(false)
   const [user, setUser] = useState<UserProps>({} as UserProps)

   const [request, response, prompAsync] = Google.useAuthRequest({
      clientId: '428715099820-tn1t0evfp9k4aebfeml6ab24nv0arbpf.apps.googleusercontent.com',
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
      scopes: ['profile', 'email']
   })

   useEffect(() => {
      if (response?.type === 'success' && response.authentication?.accessToken) {
         signInWithGoole(response.authentication.accessToken)
      }
   }, [response])

   async function signIn() {
      try {
         setIsUserLoading(true)
         await prompAsync()
      } catch (error) {
         console.log("ERRO: ", error)
         throw error;
      } finally {
         setIsUserLoading(false)
      }
   }

   async function signInWithGoole(accessToken: string) {
      try {
         setIsUserLoading(true)
         const { data: { token } } = await api.post('/users', { access_token: accessToken })
         api.defaults.headers.common['Authorization'] = `Bearer ${token}`

         const { data: { user } } = await api.get('/me')
         setUser(user)
      } catch (error) {
         console.log(error)
         throw error
      } finally {
         setIsUserLoading(false)
      }
   }

   return (
      <AuthContext.Provider value={{
         signIn,
         user,
         isUserLoading
      }}>
         {children}
      </AuthContext.Provider>
   )
}