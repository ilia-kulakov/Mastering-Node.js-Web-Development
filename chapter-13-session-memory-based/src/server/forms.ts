import express, { Express } from 'express';
import repository from './data';
import { getJsonCookie, setJsonCookie } from './cookies';
import cookieMiddleware from 'cookie-parser';
import { customSessionMiddleware } from './session/middleware';
import { getSession } from './session/session_helpers';

const rowLimit = 10;

export const registerFormMiddleware = (app: Express) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieMiddleware('mysecret'));
    app.use(customSessionMiddleware());
};

export const registerFormRoutes = (app: Express) => {
    app.get('/form', async (req, res) => {
        res.render('age', {
            history: await repository.getAllResults(rowLimit),
            personalHistory: getSession(req).data.personalHistory,
        });
    });

    app.post('/form', async (req, res) => {
        const nextage =
            Number.parseInt(req.body.age) + Number.parseInt(req.body.years);

        await repository.saveResult({ ...req.body, nextage });

        req.session.data.personalHistory = [
            {
                name: req.body.name,
                age: req.body.age,
                years: req.body.years,
                nextage,
            },
            ...(req.session.data.personalHistory || []),
        ].splice(0, 5);

        const context = {
            ...req.body,
            nextage,
            history: await repository.getAllResults(rowLimit),
            personalHistory: req.session.data.personalHistory,
        };
        res.render('age', context);
    });
};
