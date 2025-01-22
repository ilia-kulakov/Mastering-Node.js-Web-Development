"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customSessionMiddleware = void 0;
const memory_repository_1 = require("./memory_repository");
const cookies_1 = require("../cookies");
const SESSION_COOKIE_NAME = 'custom_session';
const EXPIRE_SECONDS = 300;
const getExpireDate = () => new Date(Date.now() + EXPIRE_SECONDS * 1_000);
const customSessionMiddleware = () => {
    const repo = new memory_repository_1.MemoryRepository();
    return async (req, res, next) => {
        const id = (0, cookies_1.getCookie)(req, SESSION_COOKIE_NAME);
        const session = (id ? await repo.getSession(id) : undefined) ??
            (await repo.createSession());
        req.session = session;
        (0, cookies_1.setCookie)(res, SESSION_COOKIE_NAME, session.id, {
            maxAge: EXPIRE_SECONDS * 1000,
        });
        res.once('finish', async () => {
            if (Object.keys(session.data).length > 0) {
                if (req.method == 'POST') {
                    await repo.saveSession(session, getExpireDate());
                }
                else {
                    await repo.touchSession(session, getExpireDate());
                }
            }
        });
        next();
    };
};
exports.customSessionMiddleware = customSessionMiddleware;
