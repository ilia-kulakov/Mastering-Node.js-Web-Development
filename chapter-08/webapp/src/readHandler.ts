import { Request, Response } from 'express';
import { readFile } from 'fs/promises';

export const readHandler = async (req: Request, res: Response) => {
    try {
        res.setHeader('Content-Type', 'application/json');
        res.write(await readFile('data.json'));
    } catch (err) {
        res.writeHead(500);
    }
    res.end();
};
