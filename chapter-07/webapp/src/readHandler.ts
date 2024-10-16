import { Request, Response } from 'express';

export const readHandler = async (req: Request, res: Response) => {
    res.json({
        message: 'Hello, World!'
    });
}
