/*
 * @Author: linziyi linziyi_nanjin@sina.com
 * @Date: 2026-09-02 21:05:01
 * @LastEditors: linziyi linziyi_nanjin@sina.com
 * @LastEditTime: 2026-09-05 13:39:19
 * @FilePath: \node_4\server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: linziyi linziyi_nanjin@sina.com
 * @Date: 2026-09-02 21:05:01
 * @LastEditors: linziyi linziyi_nanjin@sina.com
 * @LastEditTime: 2026-09-05 08:22:18
 * @FilePath: \node_4\server.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import express from "express";
import path from "node:path";
import fs from "node:fs/promises";
import { router as p1Router } from "./p1_server.js";
import { router as p2Router } from "./p2_server.js";
// import mime from "mime-types";

export const dirname = import.meta.dirname;
const port = 3000;
const app = express();
app.use(express.json());
app.use(express.static(path.join(dirname, "public")));

async function log(request, response, next) {
    const method = request.method;
    const url = request.originalUrl;
    const ip = request.ip;
    const date = new Date().toISOString();
    await fs.appendFile(path.join(dirname, "record.log"), `time:${date}\n` + `method:${method}\nurl:${url}\nip:${ip}\n##########################\n`, "utf8");
    next();
}

function checkCode(request, response, next) {
    const code = request.query.code;
    if (code == "250") {
        return next();
    } else {
        return response.status(404).sendFile(path.join(dirname, "public", "404.html"))
    }
}

app.use(log);//处理请求之前调用的函数叫app.use（中间件）

app.get("/", (request, response) => {
    response.redirect(301, "/login");
})

app.get("/login", (request, response) => {
    response.status(200).sendFile(path.join(dirname, "public", "login.html"));
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
            redirect: "/home?code=250"
        });

    }
})

app.use("/home", p1Router);
app.use("/home", p2Router);

app.get("/home", checkCode, (request, response) => {
    // response.type("text/html; charset=utf-8");
    response.status(200).sendFile(path.join(dirname, "public", "home.html"));
})

app.listen(port, () => {
    console.log(`正在监听http://localhost:${port}`);
});