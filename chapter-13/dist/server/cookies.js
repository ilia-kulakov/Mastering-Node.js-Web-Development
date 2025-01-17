"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonCookie = exports.getCookie = exports.setJsonCookie = exports.setCookie = void 0;
const cookies_signed_1 = require("./cookies_signed");
const cookieHeaderName = 'Set-Cookie';
const cookieSecret = 'mysecret';
const setCookie = (res, name, val) => {
    const signedVal = (0, cookies_signed_1.signCookie)(val, cookieSecret);
    let cookieVal = [
        `${name}=${signedVal}; Max-Age=300; SameSite=Strict`,
    ];
    if (res.hasHeader(cookieHeaderName)) {
        cookieVal.push(res.getHeader(cookieHeaderName));
    }
    res.setHeader(cookieHeaderName, cookieVal);
};
exports.setCookie = setCookie;
const setJsonCookie = (res, name, val) => {
    (0, exports.setCookie)(res, name, JSON.stringify(val));
};
exports.setJsonCookie = setJsonCookie;
const getCookie = (req, key) => {
    let result;
    req.headersDistinct['cookie']?.forEach((header) => {
        header.split(';').forEach((cookie) => {
            const { name, val } = /^(?<name>.*)=(?<val>.*)$/.exec(cookie)
                ?.groups;
            if (name.trim() === key) {
                result = (0, cookies_signed_1.validateCookie)(val, cookieSecret);
            }
        });
    });
    return result;
};
exports.getCookie = getCookie;
const getJsonCookie = (req, key) => {
    const cookie = (0, exports.getCookie)(req, key);
    return cookie ? JSON.parse(cookie) : undefined;
};
exports.getJsonCookie = getJsonCookie;
