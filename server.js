import { createServer } from "http";
import express from "express";
import { Server as Serverio } from "socket.io";
import cors from "cors"
import { Sockets } from './sockets.js';

export class Server {

    constructor({ PORT }) {
        this.port = PORT;
        this.app = express();


        this.server = createServer(this.app);
        this.io = new Serverio(this.server, {
            cors: {
                origin: "*"
            }
        });

        // inicializar
        this.middlewares();
        this.sockets();

    }

    middlewares() {
        this.app.use(cors());
    }

    sockets() {
        new Sockets(this.io);
    }

    listen() {

        this.server.listen(this.port, () => {
            console.log(`Socket: http://localhost:${this.port}`);
        });
    }

}