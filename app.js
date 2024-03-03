import { config } from "dotenv";
import { Server } from './server.js';
config();

const serverOptions = {
    PORT: process.env.PORT
}

const server = new Server(serverOptions);

server.listen();
