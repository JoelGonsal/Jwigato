const form = document.getElementById("registerForm");
const message = document.getElementById("message");
const registerBtn = document.getElementById("registerBtn");

if (form) {

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        message.innerHTML = "";

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;

        if (name === "" || email === "" || password === "") {

            message.innerHTML = `
                <div class="alert alert-warning">
                    Please fill in all fields.
                </div>
            `;
            return;

        }

        if (password.length < 6) {

            message.innerHTML = `
                <div class="alert alert-warning">
                    Password must contain at least 6 characters.
                </div>
            `;
            return;

        }

        registerBtn.disabled = true;

        registerBtn.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2"></span>
            Creating Account...
        `;

        const user = {

            name: name,
            email: email,
            password: password,
            role: role

        };

        try {

            const response = await fetch("/users/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)

            });

            if (response.ok) {

                message.innerHTML = `
                    <div class="alert alert-success">
                        ✅ Registration Successful! Redirecting to Login...
                    </div>
                `;

                form.reset();

                setTimeout(() => {

                    window.location.href = "/loginPage";

                }, 1800);

            } else {

                const error = await response.text();

                message.innerHTML = `
                    <div class="alert alert-danger">
                        ❌ ${error}
                    </div>
                `;

            }

        } catch (error) {

            console.error(error);

            message.innerHTML = `
                <div class="alert alert-danger">
                    ⚠ Unable to connect to the server.
                </div>
            `;

        } finally {

            registerBtn.disabled = false;

            registerBtn.innerHTML = `
                Register
            `;

        }

    });

}

function togglePassword() {

    const password = document.getElementById("password");
    const icon = document.getElementById("togglePassword");

    if (password.type === "password") {

        password.type = "text";

        if (icon) {

            icon.classList.remove("bi-eye");
            icon.classList.add("bi-eye-slash");

        }

    } else {

        password.type = "password";

        if (icon) {

            icon.classList.remove("bi-eye-slash");
            icon.classList.add("bi-eye");

        }

    }

}