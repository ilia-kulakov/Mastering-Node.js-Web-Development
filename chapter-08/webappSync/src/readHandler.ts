import { Request, Response } from 'express';

export const readHandler = async (req: Request, res: Response) => {
    res.cookie('sessionID', 'mysecretcode');
    req.pipe(res);
};
