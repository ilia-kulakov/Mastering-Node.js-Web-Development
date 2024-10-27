import { test } from 'node:test';
import { readHandler } from './readHandler';
import { equal } from 'assert';
import fs from 'fs/promises';

const createMockResponse = (testCtx) => ({
    writeHead: testCtx.mock.fn(),
    setHeader: testCtx.mock.fn(),
    write: testCtx.mock.fn(),
    end: testCtx.mock.fn(),
});

test('readHandler test', async (testCtx) => {
    // Arrange - set up the test
    const req = {};

    // Test the successful outcome
    await testCtx.test('Successfully read file', async (innerCtx) => {
        // Arrange - set up the test
        const data = 'json-data';
        innerCtx.mock.method(fs, 'readFile', async () => data);
        const res = createMockResponse(innerCtx);

        // Act - perform the test
        await readHandler(req, res);

        // Assert - verify the results
        equal(res.setHeader.mock.calls[0].arguments[0], 'Content-Type');
        equal(res.setHeader.mock.calls[0].arguments[1], 'application/json');
        equal(res.write.mock.calls[0].arguments[0], data);
        equal(res.end.mock.callCount(), 1);
    });

    // Test the failure outcome
    await testCtx.test('Handles error reading file', async (innerCtx) => {
        // Arrange - set up the test
        innerCtx.mock.method(fs, 'readFile', async () =>
            Promise.reject('file error')
        );
        const res = createMockResponse(innerCtx);

        // Act - perform the test
        await readHandler(req, res);

        // Assert - verify the results
        equal(res.writeHead.mock.calls[0].arguments[0], 500);
        equal(res.end.mock.callCount(), 1);
    });
});
