import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();



app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer, {
        cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
        socket.on("joinRoom", (serverId) => {
            socket.join(serverId);
        });

        socket.on("message", ({ serverId, ...msg }) => {
            io.to(serverId).emit("message", msg);
        });

        socket.on("leaveRoom", (serverId) => {
            socket.leave(serverId);
        });

        socket.on("disconnect", () => {
        });
    });

    httpServer.listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
    });
});