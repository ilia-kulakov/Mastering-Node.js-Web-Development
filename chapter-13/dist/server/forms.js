"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFormRoutes = exports.registerFormMiddleware = void 0;
const express_1 = __importDefault(require("express"));
const data_1 = __importDefault(require("./data"));
const cookies_1 = require("./cookies");
const rowLimit = 10;
const registerFormMiddleware = (app) => {
    app.use(express_1.default.urlencoded({ extended: true }));
};
exports.registerFormMiddleware = registerFormMiddleware;
const registerFormRoutes = (app) => {
    app.get('/form', async (req, res) => {
        res.render('age', {
            history: await data_1.default.getAllResults(rowLimit),
            personalHistory: (0, cookies_1.getJsonCookie)(req, 'personalHistory'),
        });
    });
    app.post('/form', async (req, res) => {
        const nextage = Number.parseInt(req.body.age) + Number.parseInt(req.body.years);
        await data_1.default.saveResult({ ...req.body, nextage });
        let personalHistory = [
            {
                name: req.body.name,
                age: req.body.age,
                years: req.body.years,
                nextage,
            },
            ...((0, cookies_1.getJsonCookie)(req, 'personalHistory') || []),
        ].splice(0, 5);
        (0, cookies_1.setJsonCookie)(res, 'personalHistory', personalHistory);
        const context = {
            ...req.body,
            nextage,
            history: await data_1.default.getAllResults(rowLimit),
            personalHistory,
        };
        res.render('age', context);
    });
};
exports.registerFormRoutes = registerFormRoutes;
