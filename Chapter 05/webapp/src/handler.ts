import { IncomingMessage, ServerResponse } from 'http';
import { TLSSocket } from 'tls';
import { URL } from 'url';

export const isHttps = (req: IncomingMessage): boolean => {
    return req.socket instanceof TLSSocket && req.socket.encrypted;
};

export const redirectionHandler = (
    req: IncomingMessage,
    res: ServerResponse
) => {
    res.writeHead(302, {
        Location: 'https://localhost:5500',
    });
    res.end();
};

export const handler = async (req: IncomingMessage, res: ServerResponse) => {
    const protocol = isHttps(req) ? 'https' : 'http';

    const parsedURL = new URL(
        req.url ?? '',
        `${protocol}://${req.headers.host}`
    );
    if (req.method !== 'GET' || parsedURL.pathname == '/favicon.ico') {
        res.writeHead(404, 'Not Found');
        res.end();
        return;
    } else {
        res.writeHead(200, 'OK');
        if (parsedURL.pathname == "/newurl") {
            res.write("Hello, New URL");
        } else if (!parsedURL.searchParams.has('keyword')) {
            res.write(`Hello, ${protocol.toUpperCase()}`);
        } else {
            res.write(`Hello, ${parsedURL.searchParams.get('keyword')}`);
        }
        res.end();
        return;
    }
};
