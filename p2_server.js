import express from "express";
import path from "node:path";
import { dirname } from "./server.js";
import multer from "multer";

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

router.get("/p2", (request, response) => {
    response.sendFile(path.join(dirname, "public", "p2.html"));
});
router.post("/p2", upload.single("upload"), (request, response) => {
    const userName = request.body.theName;
    const file = request.file;
    if (!file) {
        return response.status(400).json({
            answer: "请选择文件"
        })
    }
    console.log(request.body);
    console.log(request.file);
    response.status(200).json({
        answer: `用户${userName}文件上传成功`,
        message: {
            originalname: request.file.originalname,
            destination: request.file.destination,
            filename: request.file.filename,
            size: `${request.file.size}byte`
        }
    });
});

export { router };