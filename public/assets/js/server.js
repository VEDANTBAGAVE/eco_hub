const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com", // Replace with your email
    pass: process.env.EMAIL_PASS || "your-app-password", // Replace with your app password
  },
});

// Route to send bill
app.post("/send-bill", async (req, res) => {
  const { email, orderDetails } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER || "your-email@gmail.com", // Replace with your email
    to: email,
    subject: "Your Order Bill",
    html: `<h1>Order Summary</h1>${orderDetails}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
