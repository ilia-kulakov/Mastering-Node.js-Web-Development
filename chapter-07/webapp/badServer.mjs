import { createServer } from "http";
import express from "express";
import cors from "cors";

createServer(express()
                .use(cors())
                .use(express.static("static"))
                .post("*", (req, res) => {
                    req.on("data", (data) => { console.log(data.toString()) });
                    req.on("end", () => res.end());
                })).listen(9999, () => console.log(`Bas Server listening on port 9999`));