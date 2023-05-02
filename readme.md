Entendi, aqui está um exemplo de como ficaria o README do backend do projeto usando Node.js, TypeScript, Express, Prisma e PostgreSQL:

# Family Peace - Backend

This is the backend of Family Peace, a web application that allows families to manage their day-to-day tasks and responsibilities in a simple and organized way.

## Getting Started

1. Clone this repository
2. Install all dependencies

```bash
npm i
```

3. Create a PostgreSQL database with whatever name you want
4. Configure the `.env.development` file using the `.env.example` file (see "Running application locally or inside docker section" for details)
5. Run all migrations

```bash
npm run migration:run
```

6. Seed db

```bash
npm run dev:seed
```

6. Run the back-end in a development environment:

```bash
npm run dev
```

## How to run tests

1. Follow the steps in the last section
1. Configure the `.env.test` file using the `.env.example` file (see "Running application locally or inside docker" section for details)
1. Run all migrations

```bash
npm run migration:run
```

3. Run test:
   (locally)

```bash
npm run test
```

## Building and starting for production

```bash
npm run build
npm start
```

## Running migrations or generate prisma clients

Before running migrations make sure you have a postgres db running based on `.env.development` or `.env.test` file for each environment. You can start a postgres instance by typing `npm run dev:postgres` or `npm run test:postgres`. The host name is the name of the postgres container inside docker-compose file if you are running the application inside a docker container or localhost if you are running it locally.

You can operate on databases for different environments, but it is necessary to populate correct env variables for each environment first, so in order to perform db operations type the following commands:

- `npm run dev:migration:run` - run migrations for development environment by loading envs from .env.development file. It uses [dotenv-cli](https://github.com/entropitor/dotenv-cli#readme) to load envs from .env.development file.
- `npm run test:migration:run` - the same, but for test environment

- `npm run dev:migration:generate -- --name ATOMIC_OPERATION_NAME` - generate and run migration and prisma client for development environment by loading envs from .env.development file. Replace `ATOMIC_OPERATION_NAME` by the name of the migration you want to generate.

## Switching between environments

In order to switch between development and test environments you need to shutdown the current postgres instance if it is running and start the new one.

If you are in development environment:

```bash
npm run dev:postgres:down
```

And then

```bash
npm run test:postgres
```

If you are in test environment:

```bash
npm run test:postgres:down
```

And then

```bash
npm run dev:postgres
```

## Technologies

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).