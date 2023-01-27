# NLW Copa - Server

----------
## Notes
- install typescript
- npx tsc --init
- change es2016 to es2020
- install tsx to compile ts codes
- install dev depend prisma
- install @prisma/client package
- npx prisma init --datasource-provider SQLite
- install prisma extension
- npx prisma migrate dev
- npx prisma studio -> visualiza tabelas como o phpmyadmin
- npm i prisma-erd-generator -D
- npx prisma generate -> visualiza diagrama de ER
- npm i @mermaid-js/mermaid-cli -D
- npm install zod -> verifica se o valor e nulo em requests e tipa
- npm install short-unique-id -> gera ids

----------
## Run
- `nvm use 16.16.0`
- `npm install`
- `npx prisma migrate dev`
- `npx prisma db seed`
- `npx prisma studio`
- `npm run dev`