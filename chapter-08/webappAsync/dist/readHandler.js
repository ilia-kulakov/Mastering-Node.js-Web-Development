"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const fs_1 = require("fs");
const readHandler = (req, res) => {
    (0, fs_1.readFile)('data.json', (err, data) => {
        if (err != null) {
            res.writeHead(500, err.message);
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.write(data);
        }
        res.end();
    });
};
exports.readHandler = readHandler;
