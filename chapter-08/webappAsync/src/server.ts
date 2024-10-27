import { createServer } from 'http';
import express, { Express } from 'express';
import { readHandler } from './readHandler';
import httpProxy from 'http-proxy';
import helmet from "helmet";
import { connect } from 'http2';

const port = 5000;

const expressApp: Express = express();

const proxy = httpProxy.createProxyServer({
    target: 'http://localhost:5100',
    ws: true,
});

// expressApp.use((req, res, next) => {
//     res.setHeader('Content-Security-Policy', "img-src 'self'");
//     next();
// });

expressApp.use(helmet({
    contentSecurityPolicy: {
        directives: {
            imgSrc: "'self'",
            scriptSrcAttr: "'none'",
            scriptSrc: "'self'",
            connectSrc: "'self' ws://localhost:5000"
        }
    }
}));

expressApp.use(express.json());

expressApp.post('/read', readHandler);
expressApp.use(express.static('static'));
expressApp.use(express.static('node_modules/bootstrap/dist'));
expressApp.use((req, res) => proxy.web(req, res));

const server = createServer(expressApp);

server.on('upgrade', (req, socket, head) => proxy.ws(req, socket, head));

server.listen(port, () =>
    console.log(`HTTPS Server listening on port ${port}`)
);
