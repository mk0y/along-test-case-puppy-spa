# Puppy Spa

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

Example of the app:

<img width="1670" alt="image" src="https://github.com/user-attachments/assets/f6a80c6a-5566-405e-96b5-1d93a2b5ddda" />
