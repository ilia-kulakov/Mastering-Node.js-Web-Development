"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCustomTemplateEngine = void 0;
const fs_1 = require("fs");
const renderTemplate = (path, context, callback) => {
    (0, fs_1.readFile)(path, (err, data) => {
        if (err != undefined) {
            callback('Cannot generate content', undefined);
        }
        else {
            callback(undefined, parseTemplate(data.toString(), context));
        }
    });
};
const parseTemplate = (template, context) => {
    const ctx = Object.keys(context)
        .map((k) => `const ${k} = context.${k}`)
        .join(';');
    const expr = /{{(.*)}}/gm;
    return template.toString().replaceAll(expr, (match, group) => {
        return eval(`${ctx};${group}`);
    });
};
const registerCustomTemplateEngine = (expressApp) => {
    expressApp.engine('custom', renderTemplate);
};
exports.registerCustomTemplateEngine = registerCustomTemplateEngine;
