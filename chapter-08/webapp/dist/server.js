"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const readHandler_1 = require("./readHandler");
const http_proxy_1 = __importDefault(require("http-proxy"));
const helmet_1 = __importDefault(require("helmet"));
const port = 5000;
const expressApp = (0, express_1.default)();
const proxy = http_proxy_1.default.createProxyServer({
    target: 'http://localhost:5100',
    ws: true,
});
// expressApp.use((req, res, next) => {
//     res.setHeader('Content-Security-Policy', "img-src 'self'");
//     next();
// });
expressApp.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            imgSrc: "'self'",
            scriptSrcAttr: "'none'",
            scriptSrc: "'self'",
            connectSrc: "'self' ws://localhost:5000"
        }
    }
}));
expressApp.use(express_1.default.json());
expressApp.post('/read', readHandler_1.readHandler);
expressApp.use(express_1.default.static('static'));
expressApp.use(express_1.default.static('node_modules/bootstrap/dist'));
expressApp.use((req, res) => proxy.web(req, res));
const server = (0, http_1.createServer)(expressApp);
server.on('upgrade', (req, socket, head) => proxy.ws(req, socket, head));
server.listen(port, () => console.log(`HTTPS Server listening on port ${port}`));
