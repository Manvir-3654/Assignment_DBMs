# Hospital Appointment API

TypeScript CRUD module for patients, doctors, and appointments using Prisma and PostgreSQL.

## Setup

1. Create a PostgreSQL database named `hospital_api` and run [`prisma/schema.sql`](prisma/schema.sql).
2. Copy `.env.example` to `.env` and update the database URL.
3. Install dependencies, generate the client, seed, then run the integration script:

```sh
npm install
npm run generate
npx prisma db seed
npx tsx src/test.ts
```

The Prisma schema maps PascalCase/camelCase application names to the existing PostgreSQL table and column names with `@@map` and `@map`.

Sample terminal output from the CRUD test script is in [`TEST_OUTPUT.md`](TEST_OUTPUT.md).
