/*
 * @Author: linziyi linziyi_nanjin@sina.com
 * @Date: 2026-09-05 10:42:05
 * @LastEditors: linziyi linziyi_nanjin@sina.com
 * @LastEditTime: 2026-09-05 17:29:04
 * @FilePath: \node_4\public\p2.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const list = document.getElementById("list");
const form = document.getElementById("form");
form.addEventListener("submit", handler);
const del = document.getElementById("del");
del.addEventListener("click", clear)
const li = document.getElementsByTagName("li");

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
        const listItem = document.createElement("li");
        const check = document.createElement("input");
        const label = document.createElement("label");
        check.id = filename;
        check.type = "checkbox";
        label.htmlFor = filename;
        label.textContent = originalname;
        listItem.name = filename;
        listItem.append(check, label);
        list.append(listItem);
        alert(`${answer}
            ${originalname}
            ${destination}
            ${filename}
            ${size}`);
    } catch (err) {
        alert(err);
        console.log(err);
    }
}

async function clear(e) {
    e.preventDefault();
    let del_list = new Set();
    [...li].forEach((li) => {
        const check = li.children[0];
        if (check.checked) {
            del_list.add(`${check.id}`);
            li.remove();
        }
    })
    try {
        const response = await fetch("/home/p2", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                filenames: [...del_list]
            })
        });
        const result = await response.json();
        if (!response.ok) {
            throw result.answer;
        }
        alert(`${result.answer}`);
    } catch (err) {
        alert(err);
        console.log(err);
    }
}