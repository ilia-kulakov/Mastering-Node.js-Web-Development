"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readHandler = void 0;
const readHandler = async (req, res) => {
    req.setEncoding('utf-8');
    let chunksCount = 0;
    let length = [];
    for await (const data of req) {
        length[chunksCount] = data.length;
        console.log(data);
        console.log(`Length: ${length}`);
        console.log('-----------------------------');
        chunksCount++;
    }
    ;
    console.log(`End iteration: all data has been read. Chunks ${chunksCount}: ${length}`);
    res.end();
};
exports.readHandler = readHandler;
