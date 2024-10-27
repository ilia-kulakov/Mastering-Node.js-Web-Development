"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const readHandler_1 = require("./readHandler");
const assert_1 = require("assert");
(0, node_test_1.test)('readHandler test', (testCtx) => {
    // Arrange - set up the test
    const res = {
        cookie: testCtx.mock.fn(),
    };
    const req = {
        pipe: testCtx.mock.fn(),
    };
    // Act - perform the test
    (0, readHandler_1.readHandler)(req, res);
    // Assert - verify the results
    (0, assert_1.equal)(req.pipe.mock.callCount(), 1);
    (0, assert_1.equal)(req.pipe.mock.calls[0].arguments[0], res);
    (0, assert_1.equal)(res.cookie.mock.callCount(), 1);
    (0, assert_1.equal)(res.cookie.mock.calls[0].arguments[0], 'sessionID');
    (0, assert_1.equal)(res.cookie.mock.calls[0].arguments[1], 'mysecretcode');
});
