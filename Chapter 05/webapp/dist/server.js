"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const https_1 = require("https");
const handler_1 = require("./handler");
const fs_1 = require("fs");
const port = 5000;
const https_port = 5500;
const server = (0, http_1.createServer)(handler_1.redirectionHandler);
server.listen(port, () => {
    console.log(`(Event) Server listening on port ${port}`);
});
const httpsConfig = {
    key: (0, fs_1.readFileSync)("key.pem"),
    cert: (0, fs_1.readFileSync)("cert.pem")
};
const httpsServer = (0, https_1.createServer)(httpsConfig, handler_1.handler);
httpsServer.listen(https_port, () => console.log(`HTTPS Server listening on port ${https_port}`));
