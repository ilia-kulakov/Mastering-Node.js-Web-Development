import { createServer } from 'http';
import express, { Express } from 'express';
import { readHandler } from './readHandler';

const port = 5000;

const expressApp: Express = express();

expressApp.use(express.json());

expressApp.post('/read', readHandler);
expressApp.use(express.static('static'));
expressApp.use(express.static('node_modules/bootstrap/dist'));

const httpsServer = createServer(expressApp);

httpsServer.listen(port, () =>
    console.log(`HTTPS Server listening on port ${port}`)
);
