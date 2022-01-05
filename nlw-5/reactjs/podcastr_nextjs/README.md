# Anotações

-   Instalar node e npm
    -   sudo apt-get install node
-   Instalar yarn
    -   npm install --global yarn
-   Instalar o nvm
    -   wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
-   Instalar e Selecionar a versao do node
    -   nvm install version
    -   nvm use version
-   Começar projeto react
    -   Create React App (Template)
        -   npx create-react-app podcastr
        -   yarn start
    -   Next.Js (Framework)
        -   npx create-next-app podcastr_nextjs
        -   yarn dev
        -   TypeScript:
            -   yarn add typescript @types/react @types/node -D
            -   Renomear os arquivos js para .tsx
-   Instalou-se o scss para melhor gerenciamento de marcações css
-   Instalou-se o date-fns para manipulação de data atual
-   Instalou e configurou o json-server para simulação de uma api
    -   yarn add json-server
    -   json-server server.json -w -d 750 -p 3333
-   Consumindo dados da API
    -   SPA
        -   useEffect com um fetch quando a pagina for requisitada)
    -   SSR
        - Colocar a funcao:
```javascript
export async function getServerSideProps(){
//Fazer o fetch

    return {
        props: {
        data
        }
    }
}

```
-
    Receber o retorno (props) da funcao da function Home(props)
    -   SSG
        -   Colocar a funcao:

```javascript
export async function getStaticProps(){
//Fazer o fetch

    return {
        props: {
        data
        },
        revalidate: 60 * 60 * 8,
    }
}

```
-
    Receber o retorno (props) da funcao da function Home()
-   Rodar em produção
    -   yarn build
    -   yarn start
