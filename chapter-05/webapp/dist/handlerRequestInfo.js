"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (req, res) => {
    console.log(`--- HTTP Method: ${req.method}, URL: ${req.url}`);
    console.log(`host: ${req.headers.host}`);
    console.log(`accept: ${req.headers.accept}`);
    console.log(`user-agent: ${req.headers['user-agent']}`);
    res.write('<html><bpdy>');
    res.write(`HTTP Method: ${req.method}, URL: ${req.url}<br>`);
    res.write(`host: ${req.headers.host}<br>`);
    res.write(`accept: ${req.headers.accept}<br>`);
    res.write(`user-agent: ${req.headers['user-agent']}<br>`);
    const parsedURL = new URL(req.url ?? '', `http://${req.headers.host}`);
    res.write(`protocol: ${parsedURL.protocol}<br>`);
    res.write(`hostname: ${parsedURL.hostname}<br>`);
    res.write(`port: ${parsedURL.port}<br>`);
    res.write(`pathname: ${parsedURL.pathname}<br>`);
    parsedURL.searchParams.forEach((val, key) => {
        res.write(`Search param: ${key}: ${val}<br>`);
    });
    res.end('</body></html>');
};
exports.handler = handler;
