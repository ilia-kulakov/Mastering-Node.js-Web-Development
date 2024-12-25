"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testHandler = void 0;
const testHandler = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ ...req.body, serverProperty: 'From Server with love :)' });
    res.end();
};
exports.testHandler = testHandler;
