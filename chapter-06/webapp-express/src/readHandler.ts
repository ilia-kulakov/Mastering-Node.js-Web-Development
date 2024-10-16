import { Transform } from 'stream';
import { Request, Response } from 'express';

export const readHandler = async (req: Request, res: Response) => {
    if (req.headers['content-type'] == 'application/json') {
        const payload = req.body;
        
        if (payload instanceof Array) {
            res.json({arraySize: payload.length, payload})
        } else {
            res.write('Did not receive an array');
        }
        res.end();
    } else {
        req.pipe(createLowerTransform()).pipe(res);
    }
}

const createLowerTransform = () => new Transform({
    transform(data, encoding, callback) {
        callback(null, data.toString().toLowerCase());
    }
})


const createFromJsonTransform = () => new Transform({
    readableObjectMode: true,
    transform(data, encoding, callback) {
        callback(null, JSON.parse(data));
    }
})