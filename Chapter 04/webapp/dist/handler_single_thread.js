"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.handlerPromisify = exports.handlerAsyncAwait = exports.handlerPrmise = exports.handlerCb = void 0;
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const promises_2 = require("./promises");
const handlerCb = (req, res) => {
    (0, fs_1.readFile)('data.json', (err, data) => {
        if (err == null) {
            res.end(data, () => console.log('File sent'));
        }
        else {
            console.log(`Error: ${err.message}`);
            res.statusCode = 500;
            res.end();
        }
    });
};
exports.handlerCb = handlerCb;
const handlerPrmise = (req, res) => {
    (0, promises_1.readFile)('data.json')
        .then((data) => res.end(data, () => console.log('File sent')))
        .catch((err) => {
        console.log(`Error: ${err.message}`);
        res.statusCode = 500;
        res.end();
    });
};
exports.handlerPrmise = handlerPrmise;
const handlerAsyncAwait = async (req, res) => {
    try {
        const data = await (0, promises_1.readFile)('data.json');
        res.end(data, () => console.log('File sent'));
    }
    catch (err) {
        console.log(`Error: ${err?.message ?? err}`);
        res.statusCode = 500;
        res.end();
    }
};
exports.handlerAsyncAwait = handlerAsyncAwait;
const handlerPromisify = async (req, res) => {
    try {
        const data = await (0, promises_1.readFile)('data.json');
        await promises_2.endPromise.bind(res)(data);
        console.log("File sent");
    }
    catch (err) {
        console.log(`Error: ${err?.message ?? err}`);
        res.statusCode = 500;
        res.end();
    }
};
exports.handlerPromisify = handlerPromisify;
const total = 2000000000;
const iterations = 5;
let shared_counter = 0;
const handler = async (req, res) => {
    const request = shared_counter++;
    for (let iter = 0; iter < iterations; iter++) {
        for (let count = 0; count < total; count++) {
            count++;
        }
        const msg = `Request: ${request}, Iteration: ${iter}`;
        console.log(msg);
        await promises_2.writePromise.bind(res)(msg + "\n");
    }
    await promises_2.endPromise.bind(res)("Done");
};
exports.handler = handler;
