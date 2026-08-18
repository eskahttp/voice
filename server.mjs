// @ts-check
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import next from 'next';
import { Server } from 'socket.io';
import { runner } from 'node-pg-migrate';
import dotenv from 'dotenv'
import fs from 'fs';

if (fs.existsSync('.env.local')) {
    dotenv.config({path: '.env.local'})
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = Number(process.env.PORT) || 3000;

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
}

// Run migrations before starting the server
await runner({
    databaseUrl: process.env.DATABASE_URL,
    dir: path.join(__dirname, 'migrations'),
    migrationsTable: 'pgmigrations',
    direction: 'up',
    count: Infinity,
    verbose: true,
    logger: console,
});

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

await app.prepare();

const httpServer = createServer(handler);

const io = new Server(httpServer, {
    cors: { origin: '*' },
});

io.on('connection', (socket) => {
    socket.on('joinRoom', (serverId) => socket.join(serverId));
    socket.on('message', ({ serverId, ...msg }) => {
        io.to(serverId).emit('message', msg);
    });
    socket.on('leaveRoom', (serverId) => socket.leave(serverId));
});

httpServer.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
});