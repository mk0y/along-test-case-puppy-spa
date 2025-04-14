# Puppy Spa

Web app is deplyed to: https://along-test-case-puppy-spa-qc7tmj80f-marko-jakics-projects.vercel.app/

GraphQL API is deployed to: https://along-test-case-puppy-spa-web-1xkb-h2f2z5sbr.vercel.app/graphql

To run the app:

1. Add to apps/web `.env.local` file with the following content:

```
GRAPHQL_API_ENDPOINT=http://localhost:3001/graphql
```

2. Add to apps/api `.env` file with the following content (example):

```
DB_USER="puppy-spa_owner"
DB_PASSWORD="npg_dZ6TiK8HsnCR"
DB_HOST="xx-dark-snowflake-a86j77je-pooler.eu-central-1.aws.neon.tech"
DB_NAME="puppy-spa..."
DB_PORT="5432"
NODE_ENV="development"
```

3. Go to root dir:

4. Install dependencies:

```
pnpm install
```

5. Run dev:

```
pnpm dev
```

6. Visit http://localhost:3000.

### Chosen stack, besides required Next.js and Nest.js:

1. Turbo monorepo Next.js with Nest.js as GraphQL API.
2. Yoga GraphQL (https://the-guild.dev/graphql/yoga-server/docs/integrations/integration-with-nestjs)
3. Neon DB (https://neon.tech/docs/introduction)
4. Vercel for deplyment (Nest.js API is Vercel functions)
5. TailwindCSS for styling

Example of the app:

<img width="1670" alt="image" src="https://github.com/user-attachments/assets/f6a80c6a-5566-405e-96b5-1d93a2b5ddda" />
