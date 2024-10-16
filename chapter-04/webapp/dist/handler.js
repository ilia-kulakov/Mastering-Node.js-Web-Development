"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const promises_1 = require("./promises");
const worker_threads_1 = require("worker_threads");
const total = 8000000000;
const iterations = 5;
let shared_counter = 0;
const handler = async (req, res) => {
    const request = shared_counter++;
    const worker = new worker_threads_1.Worker(__dirname + "/count_worker.js", {
        workerData: {
            iterations,
            total,
            request
        }
    });
    worker.on("message", async (iter) => {
        const msg = `Request: ${request}, Iteration: ${(iter)}`;
        console.log(msg);
        await promises_1.writePromise.bind(res)(msg + "\n");
    });
    worker.on("exit", async (code) => {
        if (code == 0) {
            await promises_1.endPromise.bind(res)("Done");
        }
        else {
            res.statusCode = 500;
            await res.end();
        }
    });
    worker.on("error", async (err) => {
        console.log(err);
        res.statusCode = 500;
        await res.end();
    });
};
exports.handler = handler;
