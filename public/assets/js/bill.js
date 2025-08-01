// bill.js
// Fetch the order details from local storage
const orderDetails = JSON.parse(localStorage.getItem("lastOrderDetails"));

const orderDetailsDiv = document.getElementById("order-details");

if (orderDetails) {
  const orderHTML = `
        <h3>Order ID: ${orderDetails.orderId}</h3>
        <p><strong>Name:</strong> ${orderDetails.name}</p>
        <p><strong>Email:</strong> ${orderDetails.email}</p>
        <p><strong>Address:</strong> ${orderDetails.address}</p>
        <p><strong>Payment Method:</strong> ${orderDetails.paymentMethod}</p>
        <p><strong>Order Total:</strong> ${orderDetails.orderTotal}</p>
        <h4>Order Items:</h4>
        <ul>
            ${orderDetails.orderItems
              .map(
                (item) => `
                <li>
                    ${item.name} - $${item.price.toFixed(2)} (Quantity: ${
                  item.quantity
                })
                </li>
            `
              )
              .join("")}
        </ul>
    `;

  orderDetailsDiv.innerHTML = orderHTML;
} else {
  orderDetailsDiv.innerHTML = "<p>No order details found.</p>";
}

// Print Bill functionality
document.getElementById("print-bill").addEventListener("click", () => {
  window.print();
});
