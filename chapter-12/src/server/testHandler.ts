import { Request, Response } from 'express';

export const testHandler = async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({
        ...req.body,
        serverProperty: 'From Server with love, chapter 10 :)',
    });
    res.end();
};
