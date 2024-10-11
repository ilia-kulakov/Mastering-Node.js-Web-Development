import { IncomingMessage, ServerResponse } from 'http';

export const handler = async (req: IncomingMessage, res: ServerResponse) => {
    console.log(req.url);
    const parsedURL = new URL(req.url ?? '', `http://${req.headers.host}`);
    if (req.method !== 'GET' || parsedURL.pathname == '/favicon.ico') {
        res.writeHead(404, 'Not Found');
        res.end();
        return;
    } else {
        res.writeHead(200, 'OK');
        if (!parsedURL.searchParams.has('keyword')) {
            res.write('Hello, HTTP');
        } else {
            res.write(`Hello, ${parsedURL.searchParams.get('keyword')}`);
        }
    }

    res.end();
};
