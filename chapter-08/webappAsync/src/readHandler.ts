import { Request, Response } from 'express';
import { readFile } from 'fs';

export const readHandler = (req: Request, res: Response) => {
    readFile('data.json', (err, data) => {
        if (err != null) {
            res.writeHead(500, err.message);
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.write(data);
        }

        res.end();
    });
};
