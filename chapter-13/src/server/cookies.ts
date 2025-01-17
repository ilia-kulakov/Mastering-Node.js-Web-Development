import { IncomingMessage, ServerResponse } from 'http';
import { signCookie, validateCookie } from './cookies_signed';

const cookieHeaderName = 'Set-Cookie';
const cookieSecret = 'mysecret';

export const setCookie = (res: ServerResponse, name: string, val: string) => {
    const signedVal = signCookie(val, cookieSecret);
    let cookieVal: any[] = [
        `${name}=${signedVal}; Max-Age=300; SameSite=Strict`,
    ];
    if (res.hasHeader(cookieHeaderName)) {
        cookieVal.push(res.getHeader(cookieHeaderName));
    }
    res.setHeader(cookieHeaderName, cookieVal);
};

export const setJsonCookie = (res: ServerResponse, name: string, val: any) => {
    setCookie(res, name, JSON.stringify(val));
};

export const getCookie = (
    req: IncomingMessage,
    key: string
): string | undefined => {
    let result: string | undefined;

    req.headersDistinct['cookie']?.forEach((header) => {
        header.split(';').forEach((cookie) => {
            const { name, val } = /^(?<name>.*)=(?<val>.*)$/.exec(cookie)
                ?.groups as any;
            if (name.trim() === key) {
                result = validateCookie(val, cookieSecret);
            }
        });
    });

    return result;
};

export const getJsonCookie = (req: IncomingMessage, key: string): any => {
    const cookie = getCookie(req, key);
    return cookie ? JSON.parse(cookie) : undefined;
};
