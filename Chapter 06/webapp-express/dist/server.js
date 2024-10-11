"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const handler_1 = require("./handler");
const readHandler_1 = require("./readHandler");
const port = 5000;
const expressApp = (0, express_1.default)();
expressApp.get('/favicon.ico', (req, res) => {
    res.statusCode = 404;
    res.end();
});
expressApp.get('*', handler_1.basicHandler);
expressApp.post('/read', readHandler_1.readHandler);
const httpsServer = (0, http_1.createServer)(expressApp);
httpsServer.listen(port, () => console.log(`HTTPS Server listening on port ${port}`));
