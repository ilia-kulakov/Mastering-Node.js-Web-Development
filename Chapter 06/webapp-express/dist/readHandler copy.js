"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const readHandler = (req, res) => {
    req.setEncoding('utf-8');
    let chunksCount = 0;
    let length = [];
    req.on('data', (data) => {
        length[chunksCount] = data.length;
        console.log(data);
        console.log(`Length: ${length}`);
        console.log('-----------------------------');
        chunksCount++;
    });
    req.on('end', () => {
        console.log(`End: all data has been read. Chunks ${chunksCount}: ${length}`);
        res.end();
    });
};
exports.readHandler = readHandler;
