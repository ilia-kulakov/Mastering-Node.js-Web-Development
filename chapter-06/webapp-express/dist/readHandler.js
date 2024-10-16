"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const stream_1 = require("stream");
const readHandler = async (req, res) => {
    if (req.headers['content-type'] == 'application/json') {
        const payload = req.body;
        if (payload instanceof Array) {
            res.json({ arraySize: payload.length, payload });
        }
        else {
            res.write('Did not receive an array');
        }
        res.end();
    }
    else {
        req.pipe(createLowerTransform()).pipe(res);
    }
};
exports.readHandler = readHandler;
const createLowerTransform = () => new stream_1.Transform({
    transform(data, encoding, callback) {
        callback(null, data.toString().toLowerCase());
    }
});
const createFromJsonTransform = () => new stream_1.Transform({
    readableObjectMode: true,
    transform(data, encoding, callback) {
        callback(null, JSON.parse(data));
    }
});
