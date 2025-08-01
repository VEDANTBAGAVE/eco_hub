import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to load user profile and orders
async function loadProfileAndOrders(user) {
  const userInfoDiv = document.getElementById("user-info");
  const userDocRef = doc(db, "users", user.uid); // Getting the user document reference

  try {
    const userDoc = await getDoc(userDocRef); // Fetch user document
    if (userDoc.exists()) {
      const userData = userDoc.data();
      userInfoDiv.innerHTML = `
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Username:</strong> ${userData.username}</p>
        <p><strong>Phone:</strong> ${userData.phone}</p>
        <p><strong>Gender:</strong> ${userData.gender}</p>
      `;
    }

    // Load user orders
    const ordersRef = collection(db, "orders");
    const userOrdersQuery = query(ordersRef, where("email", "==", user.email)); // Fetch orders for the logged-in user

    const querySnapshot = await getDocs(userOrdersQuery);
    const orderList = document.getElementById("order-list");
    querySnapshot.forEach((doc) => {
      const order = doc.data();
      const orderRow = document.createElement("tr");

      // Create a row for each order
      orderRow.innerHTML = `
        <td>${doc.id}</td>
        <td>${order.name}</td>
        <td>${order.email}</td>
        <td>${order.address}</td>
        <td>${order.orderTotal}</td>
        <td>${order.status || "Pending"}</td>
        <td>
          <ul class="list-group">
            ${order.orderItems
              .map(
                (item) => `
                <li class="list-group-item">
                  <img src="${item.image}" alt="${
                  item.name
                }" style="width: 50px; height: auto; margin-right: 10px;">
                  ${item.name} - $${item.price.toFixed(2)} (Quantity: ${
                  item.quantity
                })
                </li>
              `
              )
              .join("")}
          </ul>
        </td>
      `;
      orderList.appendChild(orderRow);
    });
  } catch (error) {
    console.error("Error loading user profile and orders:", error);
  }
}

// Check authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    loadProfileAndOrders(user);
  } else {
    // User is signed out, redirect to auth page
    window.location.href = "auth.html";
  }
});

// Add event listener to logout button
document.getElementById("logout-button").addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert("Successfully logged out.");
      window.location.href = "index.html"; // Redirect to the home page
    })
    .catch((error) => {
      // An error happened.
      console.error("Error during logout: ", error);
    });
});
