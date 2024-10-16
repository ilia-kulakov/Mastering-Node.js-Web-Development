import { IncomingMessage, ServerResponse } from 'http';

export const readHandler = (req: IncomingMessage, res: ServerResponse) => {
    req.setEncoding('utf-8');
    let chunksCount = 0;
    let length: number[] = [];
    req.on('data', (data: string) => {
        length[chunksCount] = data.length;
        console.log(data);
        console.log(`Length: ${length}`);
        console.log('-----------------------------');
        chunksCount++;
    });

    req.on('end', () => {
        console.log(
            `End: all data has been read. Chunks ${chunksCount}: ${length}`
        );
        res.end();
    });
};
