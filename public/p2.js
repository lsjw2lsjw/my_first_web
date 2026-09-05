/*
 * @Author: linziyi linziyi_nanjin@sina.com
 * @Date: 2026-09-05 10:42:05
 * @LastEditors: linziyi linziyi_nanjin@sina.com
 * @LastEditTime: 2026-09-05 15:53:31
 * @FilePath: \node_4\public\p2.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const form = document.getElementById("form");
form.addEventListener("submit", handler);

async function handler(e) {
    e.preventDefault();
    const formData = new FormData(form);
    try {
        const response = await fetch("/home/p2", {
            method: "POST",
            body: formData
        });
        const result = await response.json();
        if (!response.ok) {
            throw result.answer;
        }
        const { answer } = result;
        const { message } = result;
        const { originalname, destination, filename, size } = message;
        alert(`${answer}
            ${originalname}
            ${destination}
            ${filename}
            ${size}`)
    } catch (err) {
        alert(err);
        console.log(err);
    }
}