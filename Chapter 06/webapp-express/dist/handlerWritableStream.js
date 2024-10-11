"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicHandler = void 0;
const basicHandler = (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('X-Powered-By', 'developer');
    let i = 0;
    let canWrite = true;
    const writeData = () => {
        console.log(`Starting writing data ${i}`);
        do {
            canWrite = res.write(`Message: ${i++}\n`);
        } while (i < 10000 && canWrite);
        console.log('Buffer is at capacity');
        if (i < 10000) {
            res.once('drain', () => {
                console.log('Buffer has been drained');
                writeData();
            });
        }
        else {
            res.end('Hello, World');
        }
    };
    writeData();
};
exports.basicHandler = basicHandler;
