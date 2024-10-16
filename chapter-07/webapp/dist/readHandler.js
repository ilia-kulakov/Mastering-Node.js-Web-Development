"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const readHandler = async (req, res) => {
    res.json({
        message: 'Hello, World!'
    });
};
exports.readHandler = readHandler;
