import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in .env.local');
}

console.log('DATABASE_URL:', process.env.DATABASE_URL);

declare global {
    var pgPool: Pool | undefined;
}

export const pool =
    global.pgPool ??
    new Pool({
        connectionString: process.env.DATABASE_URL,
    });

if (process.env.NODE_ENV !== 'production') {
    global.pgPool = pool;
}