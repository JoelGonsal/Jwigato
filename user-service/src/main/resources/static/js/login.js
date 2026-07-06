const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const loginBtn = document.getElementById("loginBtn");
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";
            togglePassword.classList.replace("bi-eye", "bi-eye-slash");

        } else {

            password.type = "password";
            togglePassword.classList.replace("bi-eye-slash", "bi-eye");

        }

    });

}

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        message.innerHTML = "";

        const email = document.getElementById("email").value.trim();
        const passwordValue = password.value.trim();

        if (email === "" || passwordValue === "") {

            message.innerHTML = `
                <div class="alert alert-warning">
                    Please enter your email and password.
                </div>
            `;
            return;

        }

        loginBtn.disabled = true;

        loginBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Logging in...
        `;

        try {

            const response = await fetch("/users/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    password: passwordValue
                })

            });

            const result = await response.text();

            if (response.ok) {

                message.innerHTML = `
                    <div class="alert alert-success">
                        Login Successful! Redirecting...
                    </div>
                `;

                // Temporary user id until backend returns actual user
                localStorage.setItem("userId", "1");

                setTimeout(() => {

                    window.location.href = "/menu";

                }, 1200);

            } else {

                message.innerHTML = `
                    <div class="alert alert-danger">
                        ${result}
                    </div>
                `;

            }

        } catch (error) {

            console.error(error);

            message.innerHTML = `
                <div class="alert alert-danger">
                    Unable to connect to server.
                </div>
            `;

        } finally {

            loginBtn.disabled = false;
            loginBtn.innerHTML = "Login";

        }

    });

}