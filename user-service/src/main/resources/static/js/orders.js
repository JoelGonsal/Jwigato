const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const emptyBox = document.getElementById("empty");
const table = document.getElementById("ordersTable");
const totalBox = document.getElementById("grandTotal");

async function loadOrders() {

    loading.classList.remove("d-none");
    errorBox.classList.add("d-none");
    emptyBox.classList.add("d-none");

    table.innerHTML = "";
    totalBox.textContent = "₹0.00";

    const userId = localStorage.getItem("userId");

    if (!userId) {

        loading.classList.add("d-none");

        errorBox.classList.remove("d-none");
        errorBox.innerHTML = "⚠ Please login first.";

        setTimeout(() => {

            window.location.href = "/loginPage";

        }, 1500);

        return;

    }

    try {

        const response = await fetch(`http://localhost:8082/orders/user/${userId}`);

        if (!response.ok) {

            const error = await response.text();
            throw new Error(error || "Unable to fetch orders.");

        }

        const orders = await response.json();

        loading.classList.add("d-none");

        if (orders.length === 0) {

            emptyBox.classList.remove("d-none");
            return;

        }

        let html = "";
        let grandTotal = 0;

        orders.forEach(order => {

            const quantity = order.quantity ?? 0;
            const price = Number(order.totalPrice) || 0;

            grandTotal += price;

            html += `
                <tr>
                    <td>${order.id}</td>
                    <td>${order.restaurant}</td>
                    <td>${order.foodItem}</td>
                    <td>${quantity}</td>
                    <td class="text-success fw-bold">₹${price.toFixed(2)}</td>
                </tr>
            `;

        });

        table.innerHTML = html;
        totalBox.textContent = `₹${grandTotal.toFixed(2)}`;

    } catch (err) {

        loading.classList.add("d-none");

        errorBox.classList.remove("d-none");
        errorBox.innerHTML = "⚠ " + err.message;

        console.error(err);

    }

}

document.addEventListener("DOMContentLoaded", loadOrders);