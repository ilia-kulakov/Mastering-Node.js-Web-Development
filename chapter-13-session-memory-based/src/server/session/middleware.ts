import { Request, Response, NextFunction } from 'express';
import { SessionRepository, Session } from './repository';
import { MemoryRepository } from './memory_repository';
import { setCookie, getCookie } from '../cookies';

const SESSION_COOKIE_NAME = 'custom_session';
const EXPIRE_SECONDS = 300;

const getExpireDate = () => new Date(Date.now() + EXPIRE_SECONDS * 1_000);
export const customSessionMiddleware = () => {
    const repo: SessionRepository = new MemoryRepository();

    return async (req: Request, res: Response, next: NextFunction) => {
        const id = getCookie(req, SESSION_COOKIE_NAME);
        const session =
            (id ? await repo.getSession(id) : undefined) ??
            (await repo.createSession());
        (req as any).session = session;

        setCookie(res, SESSION_COOKIE_NAME, session.id, {
            maxAge: EXPIRE_SECONDS * 1000,
        });

        res.once('finish', async () => {
            if (Object.keys(session.data).length > 0) {
                if (req.method == 'POST') {
                    await repo.saveSession(session, getExpireDate());
                } else {
                    await repo.touchSession(session, getExpireDate());
                }
            }
        });

        next();
    };
};
