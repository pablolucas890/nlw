<img src="gif.gif"><hr>

# Anotações de Estudo

- Instalar o EXPO
- expo init app_name
- expo start
- Instalação de Fontes:
    - expo install expo-font @expo-google-fonts/fontName
- Instalação do Loading:
    - expo install @expo-app-loading
- Cores com gradiente linear:
    - expo install expo-linear-gradient
- Navegação:
    - yarn add @react-navigation/native
    - expo install react-native-gesture-handler react-native-reanimated react-native-screens (core)react-native-safe-area-context @react-native-community/masked-view (dependencias)
    - yarn add @react-navigation/stack (style de navegação)
- Tratamento de SVG
    - expo install react-native-svg
    - yarn add --dev react-native-svg-transformer
- Auth 2
    - Como Funciona
        - Quando clicar em "entrar com" Vai abrir um browser para o user logar
        - Após isso vai aparecer oque o app vai usar (camera, microfone), chame escopo
        - Se a autenticação passar, vai ser gerado um token de autenticação
        - o Auth2 só entrega o token para o browser que fez a autenticação, isto é o app do user (muito mais seguro)
        - após o browser receber o token, utiliza-se um deeplink para extrair o token
    - Desenvolvimento
        -Resgistrar o App no Servidor (Discord/ Facebook, ...)
            - https://discord.com/developers/applications
            - Create Aplication
        - Instalar o AuthSession e Auth-Random
            - expo install expo-auth-session expo-random
        - Criar uma url de autenticação no servidor para o startAsync do authsession redirecionar
        - yarn add axios
- Async Storage
    - expo install @react-native-async-storage/async-storage
- UUID
    - yarn add react-native-uuid
# Anotações de Download

- git clone chave.sh
- expo start (terminal 1)
