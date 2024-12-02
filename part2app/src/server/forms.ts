import express, { Express } from 'express';

export const registerFormMiddleware = (app: Express) => {
    app.use(express.urlencoded({ extended: true }));
};

export const registerFormRoutes = (app: Express) => {
    app.get('/form', (req, res) => {
        res.render('age');
    });

    app.post('/form', (req, res) => {
        const nextage =
            Number.parseInt(req.body.age) + Number.parseInt(req.body.years);
        const context = {
            ...req.body,
            nextage,
        };

        res.render('age', context);
    });
};
