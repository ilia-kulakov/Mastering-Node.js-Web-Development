import express, { Express } from 'express';
import multer from 'multer';
// import { sanitizeValue } from './sanitize';

const fileMiddleware = multer({ storage: multer.memoryStorage() });

export const registerFormMiddleware = (app: Express) => {
    app.use(express.urlencoded({ extended: true }));
};

export const registerFormRoutes = (app: Express) => {
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
