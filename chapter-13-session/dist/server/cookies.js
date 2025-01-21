"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonCookie = exports.getCookie = exports.setJsonCookie = exports.setCookie = void 0;
const setCookie = (res, name, val, opts) => {
    res.cookie(name, val, {
        maxAge: 300 * 1000,
        sameSite: true,
        signed: true,
        ...opts,
    });
};
exports.setCookie = setCookie;
const setJsonCookie = (res, name, val) => {
    (0, exports.setCookie)(res, name, JSON.stringify(val));
};
exports.setJsonCookie = setJsonCookie;
const getCookie = (req, key) => {
    return req.signedCookies[key];
};
exports.getCookie = getCookie;
const getJsonCookie = (req, key) => {
    const cookie = (0, exports.getCookie)(req, key);
    return cookie ? JSON.parse(cookie) : undefined;
};
exports.getJsonCookie = getJsonCookie;
