/*
 * @Author: linziyi linziyi_nanjin@sina.com
 * @Date: 2026-09-02 21:05:01
 * @LastEditors: linziyi linziyi_nanjin@sina.com
 * @LastEditTime: 2026-09-04 15:01:37
 * @FilePath: \node_4\server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import express from "express";
import path from "node:path";
import fs from "node:fs/promises";
// import mime from "mime-types";

const dirname = import.meta.dirname;
const port = 3000;
const app = express();
app.use(express.json());
app.use(express.static(path.join(dirname, "public")));

async function log(request, response, next) {
    const method = request.method;
    const url = request.originalUrl;
    const ip = request.ip;
    const date = new Date().toISOString();
    await fs.appendFile(path.join(dirname, "record.log"), `time:${date}\n` + `method:${method}\nurl:${url}\nip:${ip}`, "utf8");
    next();
}

app.use(log);

app.get("/", (request, response) => {
    response.redirect(301, "/login");
})

app.get("/login", (request, response) => {
    response.sendFile(path.join(dirname, "public", "login.html"));
})

app.post("/login", (request, response) => {
    const req = request.body;
    const name = req.name;
    const email = req.email;
    const password = req.password;
    let name_err = false;
    let email_err = false;
    let password_err = false;
    if (name != "lzy") {
        name_err = true;
    } if (email != "linziyi.lsjw@gmail.com") {
        email_err = true;
    } if (password != "lsjw") {
        password_err = true;
    }
    if (name_err || email_err || password_err) {
        response.status(401).json({
            answer: {
                name_err,
                email_err,
                password_err
            }
        });
    } else {
        response.status(200).json({
            redirect: "/home"
        });

    }
})

app.get("/home", (request, response) => {
    // response.type("text/html; charset=utf-8");
    response.sendFile(path.join(dirname, "public", "home.html"));
})
app.get("/p1", (request, response) => {
    // const contentType= mime.contentType(path.join(dirname,"public","p1.html"));
    // response.type(contentType);
    response.sendFile(path.join(dirname, "public", "p1.html"));
})
app.get("/p2", (request, response) => {
    response.sendFile(path.join(dirname, "public", "p2.html"));
})
app.get("/p3", (request, response) => {
    response.sendFile(path.join(dirname, "public", "p3.html"));
})
app.listen(port, () => {
    console.log(`正在监听http://localhost:${port}`);
});