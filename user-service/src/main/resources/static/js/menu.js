async function placeOrder(restaurant, foodItem, price) {

    const toast = document.getElementById("toast");

    const userId = localStorage.getItem("userId");

    if (!userId) {

        toast.className = "alert alert-warning shadow";
        toast.innerHTML = "⚠ Please login first.";
        toast.style.display = "block";

        setTimeout(() => {
            toast.style.display = "none";
            window.location.href = "/loginPage";
        }, 2000);

        return;

    }

    const order = {

        userId: Number(userId),
        restaurant: restaurant,
        foodItem: foodItem,
        quantity: 1,
        totalPrice: price

    };

    try {

        const response = await fetch("http://localhost:8082/orders", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(order)

        });

        if (response.ok) {

            toast.className = "alert alert-success shadow";
            toast.innerHTML = "✅ Order placed successfully!";
            toast.style.display = "block";

        } else {

            const error = await response.text();

            toast.className = "alert alert-danger shadow";
            toast.innerHTML = "❌ " + error;
            toast.style.display = "block";

        }

    } catch (error) {

        console.error(error);

        toast.className = "alert alert-danger shadow";
        toast.innerHTML = "⚠ Unable to connect to Order Service.";
        toast.style.display = "block";

    }

    setTimeout(() => {

        toast.style.display = "none";

    }, 2500);

}