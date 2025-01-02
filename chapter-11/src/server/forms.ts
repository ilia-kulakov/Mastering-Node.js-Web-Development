import express, { Express } from 'express';
import multer from 'multer';

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
        res.render('formData', {
            ...req.body,
            file: req.file,
            fileData: req.file?.buffer.toString(),
        });
    });

    app.get('/ageform', (req, res) => {
        res.render('age');
    });

    app.post('/ageform', fileMiddleware.single('datafile'), (req, res) => {
        res.render('age', {
            ...req.body,
            nextage: Number.parseInt(req.body.age) + 1,
        });
    });
};
