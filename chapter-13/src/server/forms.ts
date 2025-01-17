import express, { Express } from 'express';
import repository from './data';
import { getJsonCookie, setJsonCookie } from './cookies';

const rowLimit = 10;

export const registerFormMiddleware = (app: Express) => {
    app.use(express.urlencoded({ extended: true }));
};

export const registerFormRoutes = (app: Express) => {
    app.get('/form', async (req, res) => {
        res.render('age', {
            history: await repository.getAllResults(rowLimit),
            personalHistory: getJsonCookie(req, 'personalHistory'),
        });
    });

    app.post('/form', async (req, res) => {
        const nextage =
            Number.parseInt(req.body.age) + Number.parseInt(req.body.years);

        await repository.saveResult({ ...req.body, nextage });

        let personalHistory = [
            {
                name: req.body.name,
                age: req.body.age,
                years: req.body.years,
                nextage,
            },
            ...(getJsonCookie(req, 'personalHistory') || []),
        ].splice(0, 5);

        setJsonCookie(res, 'personalHistory', personalHistory);

        const context = {
            ...req.body,
            nextage,
            history: await repository.getAllResults(rowLimit),
            personalHistory,
        };
        res.render('age', context);
    });
};
