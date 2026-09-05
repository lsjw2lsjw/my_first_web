import express from "express";
import path from "node:path";
import { dirname } from "./server.js";

const allowedHost = new Set([
    "localhost",
])

const router = express.Router();
router.use("/p1", (request, response, next) => {
    const referer = request.get("referer");
    if (!referer) {
        return response.status(404).sendFile(path.join(dirname, "public", "404.html"))
    }
    const refererURL = new URL(referer);
    if (allowedHost.has(refererURL.hostname)) {
        console.log("有referer");
        return next();
    } else {
        return response.status(404).sendFile(path.join(dirname, "public", "404.html"))
    }

});
router.get("/p1", (request, response) => {
    // const contentType= mime.contentType(path.join(dirname,"public","p1.html"));
    // response.type(contentType);
    response.sendFile(path.join(dirname, "public", "p1.html"));
});

router.get("/p3", (request, response) => {
    response.sendFile(path.join(dirname, "public", "p3.html"));
});

export { router };