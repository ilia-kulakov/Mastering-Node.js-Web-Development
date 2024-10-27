"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const readHandler = async (req, res) => {
    res.cookie('sessionID', 'mysecretcode');
    req.pipe(res);
};
exports.readHandler = readHandler;
