const form = document.getElementById("login_form");
form.addEventListener("submit", login);

async function login(e) {
    e.preventDefault();
    const name_d = document.getElementById("name");
    const email_d = document.getElementById("email");
    const password_d = document.getElementById("password");
    const name = name_d.value.trim();
    const email = email_d.value.trim();
    const password = password_d.value.trim();
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        const result = await response.json();
        if (response.status == 401) {
            const message = result.answer;
            const name_err = message.name_err;
            const email_err = message.email_err;
            const password_err = message.password_err;
            if (name_err) {
                err_handler(name_d);
            } if (email_err) {
                err_handler(email_d);
            } if (password_err) {
                err_handler(password_d);
            }
            throw new Error("submission failed");
        } else if (response.status == 200){
            const redirect=result.redirect;
            window.location.href=redirect;
        }
    } catch (err) {
        console.log(err);
    }
}

function err_handler(err) {
    err.value = "";
    err.placeholder = "err";
}