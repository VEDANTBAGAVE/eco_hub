# Eco-Friendly E-commerce Store

A modern, responsive e-commerce website built for selling eco-friendly and sustainable products. This project demonstrates a full-stack web application with Firebase integration for authentication, database, and storage.

## 🌱 Features

- **Product Catalog**: Browse through a curated collection of eco-friendly products
- **User Authentication**: Secure login and registration system
- **Shopping Cart**: Add, remove, and manage items in your cart
- **Order Management**: Complete checkout process with order tracking
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Firebase Integration**: Real-time database and cloud storage
- **Email Notifications**: Automated order confirmation emails

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 4.5.2
- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **Authentication**: Firebase Authentication
- **Storage**: Firebase Storage
- **Email**: Nodemailer

## 📁 Project Structure

```
eco_hub/
├── css/
│   └── style.css          # Custom styles
├── js/
│   ├── auth.js           # Authentication logic
│   ├── cart.js           # Shopping cart functionality
│   ├── checkout.js       # Checkout process
│   ├── orders.js         # Order management
│   ├── product.js        # Product display logic
│   ├── profile.js        # User profile management
│   └── server.js         # Express server for email
├── templates/
│   ├── index.html        # Home page
│   ├── auth.html         # Login/Register page
│   ├── cart.html         # Shopping cart page
│   ├── checkout.html     # Checkout page
│   ├── orders.html       # Order history page
│   └── product-details.html # Product details page
├── images/               # Product images
├── functions/            # Firebase Cloud Functions
└── products.json         # Product data
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/eco_hub.git
   cd eco_hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd functions && npm install
   ```

3. **Firebase Setup** ⚠️ **REQUIRED**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication, Firestore Database, and Storage
   - **Replace placeholder credentials** in `src/config/firebase.js` with your actual Firebase config
   - See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed step-by-step instructions

4. **Environment Variables** (Optional)
   Create a `.env` file in the root directory:
   ```
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_auth_domain
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_STORAGE_BUCKET=your_storage_bucket
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

### ⚠️ Important Security Note
This repository contains **placeholder Firebase credentials** for security. **You must replace them with your own Firebase project credentials** before the application will work. See the [Setup Guide](SETUP_GUIDE.md) for detailed instructions.

## 🔧 Configuration

### Firebase Configuration

Update the Firebase configuration in the following files:
- `templates/index.html`
- `templates/auth.html`
- `templates/product-details.html`
- `js/auth.js`
- `js/cart.js`
- `js/checkout.js`
- `js/orders.js`
- `js/profile.js`

### Email Configuration

Update the email settings in `js/server.js`:
```javascript
const transporter = nodemailer.createTransporter({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## 📱 Features Overview

### Product Catalog
- Browse products by category
- Search functionality
- Product filtering by price range
- Detailed product information

### Shopping Cart
- Add/remove items
- Quantity adjustment
- Price calculation
- Persistent cart data

### User Authentication
- Email/password registration
- Secure login system
- Password reset functionality
- User profile management

### Checkout Process
- Shipping information collection
- Payment integration ready
- Order confirmation
- Email notifications

## 🎨 Customization

### Styling
The project uses Bootstrap 4.5.2 for responsive design. Custom styles are in `css/style.css`.

### Adding Products
1. Add product images to the `images/` directory
2. Update `products.json` with product information
3. Upload images to Firebase Storage
4. Add product data to Firestore

## 🔒 Security Considerations

- Firebase API keys are exposed in client-side code (this is normal for Firebase web apps)
- Email credentials should be stored in environment variables
- Implement proper input validation
- Use HTTPS in production

## 📦 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. Set the source to the main branch

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Bootstrap for the responsive framework
- Firebase for the backend services
- Unsplash for product images
- The eco-friendly community for inspiration

## 📞 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

**Note**: This is a demo project. For production use, ensure all security measures are properly implemented and sensitive data is properly secured. 