"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.redirectionHandler = exports.isHttps = void 0;
const tls_1 = require("tls");
const url_1 = require("url");
const isHttps = (req) => {
    return req.socket instanceof tls_1.TLSSocket && req.socket.encrypted;
};
exports.isHttps = isHttps;
const redirectionHandler = (req, res) => {
    res.writeHead(302, {
        Location: 'https://localhost:5500',
    });
    res.end();
};
exports.redirectionHandler = redirectionHandler;
const handler = async (req, res) => {
    const protocol = (0, exports.isHttps)(req) ? 'https' : 'http';
    const parsedURL = new url_1.URL(req.url ?? '', `${protocol}://${req.headers.host}`);
    if (req.method !== 'GET' || parsedURL.pathname == '/favicon.ico') {
        res.writeHead(404, 'Not Found');
        res.end();
        return;
    }
    else {
        res.writeHead(200, 'OK');
        if (parsedURL.pathname == "/newurl") {
            res.write("Hello, New URL");
        }
        else if (!parsedURL.searchParams.has('keyword')) {
            res.write(`Hello, ${protocol.toUpperCase()}`);
        }
        else {
            res.write(`Hello, ${parsedURL.searchParams.get('keyword')}`);
        }
        res.end();
        return;
    }
};
exports.handler = handler;
