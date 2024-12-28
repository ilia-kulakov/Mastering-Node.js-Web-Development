"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const http_proxy_1 = __importDefault(require("http-proxy"));
const helmet_1 = __importDefault(require("helmet"));
const testHandler_1 = require("./testHandler");
const express_handlebars_1 = require("express-handlebars");
const helpers = __importStar(require("./template_helpers"));
const forms_1 = require("./forms");
const port = 5000;
const expressApp = (0, express_1.default)();
const proxy = http_proxy_1.default.createProxyServer({
    target: 'http://localhost:5100',
    ws: true,
});
expressApp.set('views', 'templates/server');
expressApp.engine('handlebars', (0, express_handlebars_1.engine)());
expressApp.set('view engine', 'handlebars');
expressApp.use((0, helmet_1.default)());
expressApp.use(express_1.default.json());
(0, forms_1.registerFormMiddleware)(expressApp);
(0, forms_1.registerFormRoutes)(expressApp);
expressApp.get('/dynamic/:file', (req, res) => {
    res.render(`${req.params.file}.handlebars`, {
        message: 'Hello template',
        req,
        helpers: { ...helpers },
    });
});
expressApp.post('/test', testHandler_1.testHandler);
expressApp.use(express_1.default.static('static'));
expressApp.use(express_1.default.static('node_modules/bootstrap/dist'));
expressApp.use((req, res) => proxy.web(req, res));
const server = (0, http_1.createServer)(expressApp);
server.on('upgrade', (req, socket, head) => proxy.ws(req, socket, head));
server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
