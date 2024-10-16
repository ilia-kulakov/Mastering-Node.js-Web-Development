import { createServer } from 'http';
import express, { Express, Request, Response } from 'express';
import { basicHandler, objectHandler } from './handler';
import { readHandler } from './readHandler';

const port = 5000;

const expressApp: Express = express();

// expressApp.get('/favicon.ico', (req, res) => {
//     res.statusCode = 404;
//     res.end();
// });

expressApp.use(express.json());

expressApp.get('/object', objectHandler);
//expressApp.get('/*', basicHandler);

expressApp.post('/read/text', readHandler);
expressApp.post('/read/object', readHandler);

expressApp.get('/sendcity', (req, res) => {
    res.sendFile('city.png', { root: 'static' });
});

expressApp.get('/downloadcity', (req: Request, res: Response) => {
    res.download('static/city.png');
})

expressApp.use(express.static('static'));
expressApp.use(express.static('node_modules/bootstrap/dist'));

const httpsServer = createServer(expressApp);

httpsServer.listen(port, () =>
    console.log(`HTTPS Server listening on port ${port}`)
);
