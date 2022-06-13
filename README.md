# projetoapp-back-end
## Projeto back-end em TypeScript utilizando Node + Express + MySQL + TypeORM usando Affirmations API e PokeAPI

# Instalação

* Clonar o projeto

* Adicionar o arquivo .env no root da aplicação, por exemplo:

TYPEORM_CONNECTION = mysql

TYPEORM_HOST = localhost

TYPEORM_USERNAME = root

TYPEORM_PASSWORD = admin

TYPEORM_DATABASE = projetoapp

TYPEORM_PORT = 3306

TYPEORM_MIGRATIONS = src/database/migrations/*.ts

TYPEORM_MIGRATIONS_DIR = src/database/migrations

TYPEORM_ENTITIES = src/entities/*.ts

TYPEORM_ENTITIES_DIR = src/entities

SERVER_TOKEN="8y/B?E(H+MbQeThWmZq4t7w!z$C&F)J@"

SERVER_TOKEN_EXPIRESIN=86400000

AFFIRMATIONSAPI=https://www.affirmations.dev/

POKEAPI=https://pokeapi.co/api/v2/


* Verificar se possui o MySql instalado.
* Criar a database com o nome de "projetoapp" no MySql
* npm install
* npm run typeorm migration:run

## Rodando a aplicação
* npm run dev
* o back-end está rodando na porta 3000
