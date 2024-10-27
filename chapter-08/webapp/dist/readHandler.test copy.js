"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const readHandler_1 = require("./readHandler");
const assert_1 = require("assert");
const promises_1 = __importDefault(require("fs/promises"));
const createMockResponse = (testCtx) => ({
    writeHead: testCtx.mock.fn(),
    setHeader: testCtx.mock.fn(),
    write: testCtx.mock.fn(),
    end: testCtx.mock.fn(),
});
(0, node_test_1.test)('readHandler test', async (testCtx) => {
    // Arrange - set up the test
    const data = 'json-data';
    testCtx.mock.method(promises_1.default, 'readFile', async () => data);
    const req = {};
    // const res = {
    //     setHeader: testCtx.mock.fn(),
    //     write: testCtx.mock.fn(),
    //     end: testCtx.mock.fn(),
    // };
    // Act - perform the test
    await (0, readHandler_1.readHandler)(req, res);
    // Assert - verify the results
    (0, assert_1.equal)(res.setHeader.mock.calls[0].arguments[0], 'Content-Type');
    (0, assert_1.equal)(res.setHeader.mock.calls[0].arguments[1], 'application/json');
    (0, assert_1.equal)(res.write.mock.calls[0].arguments[0], data);
    (0, assert_1.equal)(res.end.mock.callCount(), 1);
});
