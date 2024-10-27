import { test } from 'node:test';
import { readHandler } from './readHandler';
import { equal } from 'assert';

test('readHandler test', (testCtx) => {
    // Arrange - set up the test
    const res = {
        cookie: testCtx.mock.fn(),
    };

    const req = {
        pipe: testCtx.mock.fn(),
    };

    // Act - perform the test
    readHandler(req, res);

    // Assert - verify the results
    equal(req.pipe.mock.callCount(), 1);
    equal(req.pipe.mock.calls[0].arguments[0], res);
    equal(res.cookie.mock.callCount(), 1);
    equal(res.cookie.mock.calls[0].arguments[0], 'sessionID');
    equal(res.cookie.mock.calls[0].arguments[1], 'mysecretcode');
});
