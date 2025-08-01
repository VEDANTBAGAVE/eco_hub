// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
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

// Function to handle sign up
async function signUp() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;
  const phoneNumber = document.getElementById("phone").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      username: username,
      phone: phoneNumber,
      gender: gender,
      email: email,
    });

    alert("User created successfully!");
    window.location.href = "profile.html";
  } catch (error) {
    console.error("Error creating user: ", error);
    alert(error.message);
  }
}

// Function to handle sign in
async function signIn() {
  const email = document.getElementById("signin-email").value.trim();
  const password = document.getElementById("signin-password").value;

  // Check for empty fields
  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    alert("Sign in successful!");
    window.location.href = "profile.html";
  } catch (error) {
    console.error("Error signing in: ", error);
    alert(error.message);
  }
}

// Event listeners for the forms
document.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.getElementById("sign-in-form");
  if (signInForm) {
    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
      signIn();
    });
  }

  const signUpForm = document.getElementById("sign-up-form");
  if (signUpForm) {
    signUpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      signUp();
    });
  }
});
