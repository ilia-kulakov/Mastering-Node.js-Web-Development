import { test } from 'node:test';
import { readHandler } from './readHandler';
import { equal } from 'assert';
import fs from 'fs';

test('readHandler test', async (testCtx) => {
    // Arrange - set up the test
    const data = 'json-data';
    testCtx.mock.method(fs, 'readFile', (file, cb) => cb(undefined, data));
    const req = {};

    const res = {
        setHeader: testCtx.mock.fn(),
        write: testCtx.mock.fn(),
        end: testCtx.mock.fn(),
    };

    // Act - perform the test
    await readHandler(req, res);

    // Assert - verify the results
    equal(res.setHeader.mock.calls[0].arguments[0], 'Content-Type');
    equal(res.setHeader.mock.calls[0].arguments[1], 'application/json');
    equal(res.write.mock.calls[0].arguments[0], data);
    equal(res.end.mock.callCount(), 1);
});
