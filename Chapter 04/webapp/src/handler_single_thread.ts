import { IncomingMessage, ServerResponse } from 'http';
import { readFile as readFileCb } from 'fs';
import { readFile } from 'fs/promises';
import { endPromise, writePromise } from './promises';

export const handlerCb = (req: IncomingMessage, res: ServerResponse) => {
    readFileCb('data.json', (err: Error | null, data: Buffer) => {
        if (err == null) {
            res.end(data, () => console.log('File sent'));
        } else {
            console.log(`Error: ${err.message}`);
            res.statusCode = 500;
            res.end();
        }
    });
};

export const handlerPrmise = (req: IncomingMessage, res: ServerResponse) => {
    readFile('data.json')
        .then((data: Buffer) => res.end(data, () => console.log('File sent')))
        .catch((err: Error) => {
            console.log(`Error: ${err.message}`);
            res.statusCode = 500;
            res.end();
        });
};

export const handlerAsyncAwait = async (
    req: IncomingMessage,
    res: ServerResponse
) => {
    try {
        const data: Buffer = await readFile('data.json');
        res.end(data, () => console.log('File sent'));
    } catch (err: any) {
        console.log(`Error: ${err?.message ?? err}`);
        res.statusCode = 500;
        res.end();
    }
};

export const handlerPromisify = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const data: Buffer = await readFile('data.json');
        await endPromise.bind(res)(data);
        console.log("File sent");
    } catch (err: any) {
        console.log(`Error: ${err?.message ?? err}`);
        res.statusCode = 500;
        res.end();
    }
};

const total = 2_000_000_000;
const iterations = 5;
let shared_counter = 0;


export const handler = async (req: IncomingMessage, res: ServerResponse) => {
    const request = shared_counter++;
    for(let iter = 0; iter < iterations; iter++) {
        for(let count = 0; count < total; count++) {
            count++;
        }
        
        const msg = `Request: ${request}, Iteration: ${iter}`;
        console.log(msg);
        await writePromise.bind(res)(msg + "\n");
    }

    await endPromise.bind(res)("Done");
}