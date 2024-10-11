import { IncomingMessage, ServerResponse } from 'http';

export const readHandler = async (
    req: IncomingMessage,
    res: ServerResponse
) => {
    req.setEncoding('utf-8');
    let chunksCount = 0;
    let length: number[] = [];
    for await (const data of req) {
        length[chunksCount] = data.length;
        console.log(data);
        console.log(`Length: ${length}`);
        console.log('-----------------------------');
        chunksCount++;
};

    
    console.log(`End iteration: all data has been read. Chunks ${chunksCount}: ${length}`);

    res.end();
};
