import { IncomingMessage, ServerResponse } from 'http';
import { readFileSync } from 'fs';

export const basicHandler = (req: IncomingMessage, res: ServerResponse) => {
    res.write(readFileSync('static/index.html'));
    res.end();
};
