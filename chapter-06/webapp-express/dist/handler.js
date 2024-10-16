"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectHandler = exports.basicHandler = void 0;
const fs_1 = require("fs");
const basicHandler = (req, res) => {
    res.write((0, fs_1.readFileSync)('static/index.html'));
    res.end();
};
exports.basicHandler = basicHandler;
const objectHandler = (req, res) => {
    res.write((0, fs_1.readFileSync)('static/object.html'));
    res.end();
};
exports.objectHandler = objectHandler;
