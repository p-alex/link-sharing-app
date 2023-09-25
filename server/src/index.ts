import "dotenv/config";
import "reflect-metadata";

import Server from "./server";

const server = new Server();
console.clear();
server.setup();
