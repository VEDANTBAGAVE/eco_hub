import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzoFv_eiYF9MiwCwAKeFUZTwBnrPtxHHE",
  authDomain: "eco-friendly-store.firebaseapp.com",
  projectId: "eco-friendly-store",
  storageBucket: "eco-friendly-store.appspot.com",
  messagingSenderId: "809792193062",
  appId: "1:809792193062:web:320478197ae3123b991ce7",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to load orders from Firestore
async function loadOrders() {
  const ordersCollection = collection(db, "orders");
  const orderList = document.getElementById("order-list");
  const querySnapshot = await getDocs(ordersCollection);

  querySnapshot.forEach((doc) => {
    const order = doc.data();
    const orderRow = document.createElement("tr");

    // Create table row for order details
    orderRow.innerHTML = `
      <td>${doc.id}</td>
      <td>${order.name}</td>
      <td>${order.email}</td>
      <td>${order.address}</td>
      <td>${order.orderTotal || "N/A"}</td>
      <td id="status-${doc.id}">${order.status || "Pending"}</td>
      <td>
          <select onchange="updateOrderStatus('${doc.id}')">
              <option value="">Update Status</option>
              <option value="Package Ready">Package Ready</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
          </select>
      </td>
    `;

    orderList.appendChild(orderRow);

    // Add product details
    const orderItemsList = document.createElement("ul");
    orderItemsList.classList.add("list-group");

    order.orderItems.forEach((item) => {
      const orderItem = document.createElement("li");
      orderItem.classList.add("list-group-item");

      // Check if properties are defined before using them
      const itemName = item.name || "Unknown Product";
      const itemImage = item.image || "path/to/default/image.jpg"; // Provide a default image path
      const itemPrice =
        item.price !== undefined ? item.price.toFixed(2) : "N/A";
      const itemQuantity = item.quantity || 0;

      orderItem.innerHTML = `
        <img src="${itemImage}" alt="${itemName}" style="width: 50px; height: auto; margin-right: 10px;">
        ${itemName} - $${itemPrice} (Quantity: ${itemQuantity})
      `;

      orderItemsList.appendChild(orderItem);
    });

    // Append product details to the order row
    orderRow.appendChild(orderItemsList);
  });
}

// Function to update order status
async function updateOrderStatus(orderId) {
  const statusSelect = document.querySelector(`#status-${orderId} ~ select`);
  const newStatus = statusSelect.value;

  if (newStatus) {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status: newStatus });
    document.getElementById(`status-${orderId}`).textContent = newStatus;
    alert("Order status updated!");
  }
}

// Load orders when the page loads
loadOrders();
