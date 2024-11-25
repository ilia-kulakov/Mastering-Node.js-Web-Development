"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFormRoutes = exports.registerFormMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
// import { sanitizeValue } from './sanitize';
const fileMiddleware = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const registerFormMiddleware = (app) => {
    app.use(express_1.default.urlencoded({ extended: true }));
};
exports.registerFormMiddleware = registerFormMiddleware;
const registerFormRoutes = (app) => {
    app.get('/form', (req, res) => {
        for (const key in req.query) {
            res.write(`${key}: ${req.query[key]}\n`);
        }
        res.end();
    });
    app.post('/form', fileMiddleware.single('datafile'), (req, res) => {
        //res.write(`Content-Type: ${req.headers['content-type']}\n`);
        // if (req.headers['content-type']?.startsWith('multipart/form-data')) {
        //     req.pipe(res);
        // } else {
        //     for (const key in req.body) {
        //         res.write(`${key}: ${req.body[key]}\n`);
        //     }
        //     res.end();
        // }
        // sanitize mannualy
        // res.setHeader('Content-Type', 'text/html');
        // for (const key in req.body) {
        //     res.write(`<div>${key}: ${sanitizeValue(req.body[key])}</div>`);
        // }
        // if (req.file) {
        //     res.write(`<div>File: ${req.file.originalname}</div>`);
        //     res.write(
        //         `<div>${sanitizeValue(req.file.buffer.toString())}</div>`
        //     );
        // }
        // res.end();
        res.render('formData', {
            ...req.body,
            file: req.file,
            fileData: req.file?.buffer.toString(),
        });
    });
};
exports.registerFormRoutes = registerFormRoutes;
