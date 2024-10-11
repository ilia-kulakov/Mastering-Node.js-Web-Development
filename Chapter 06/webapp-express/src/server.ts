import { createServer } from 'http';
import express, { Express } from 'express';
import { basicHandler } from './handler';
import { readHandler } from './readHandler';

const port = 5000;

const expressApp: Express = express();

expressApp.get('/favicon.ico', (req, res) => {
    res.statusCode = 404;
    res.end();
});

expressApp.get('*', basicHandler);
expressApp.post('/read', readHandler);

const httpsServer = createServer(expressApp);

httpsServer.listen(port, () =>
    console.log(`HTTPS Server listening on port ${port}`)
);
