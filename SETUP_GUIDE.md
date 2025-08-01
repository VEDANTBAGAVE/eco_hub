# 🚀 Setup Guide - Eco-Friendly E-commerce Store

## 📋 Prerequisites

Before setting up this project, make sure you have:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Git](https://git-scm.com/) installed
- A [Firebase](https://firebase.google.com/) account

## 🔧 Initial Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/eco-friendly-store.git
cd eco-friendly-store
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Firebase Setup

#### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "eco-friendly-store")
4. Follow the setup wizard

#### Step 2: Enable Services
1. **Authentication**: Go to Authentication → Sign-in method → Enable Email/Password
2. **Firestore Database**: Go to Firestore Database → Create database → Start in test mode
3. **Storage**: Go to Storage → Get started → Start in test mode

#### Step 3: Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → Web app
4. Register app and copy the config

#### Step 4: Update Configuration
1. Open `src/config/firebase.js`
2. Replace the placeholder values with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

#### Step 5: Update Firebase Project Reference
1. Open `.firebaserc`
2. Replace `YOUR_FIREBASE_PROJECT_ID` with your actual project ID

### 4. Environment Variables (Optional)
Create a `.env` file in the root directory:
```env
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id

# Email Configuration (for order notifications)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 5. Add Sample Data (Optional)
1. Go to Firestore Database in Firebase Console
2. Create a collection called "products"
3. Add sample products with the following structure:

```json
{
  "name": "Bamboo Cutting Board",
  "description": "Eco-friendly bamboo cutting board",
  "price": 29.99,
  "image": "bamboo_cutting_board.jpeg",
  "category": "kitchen",
  "stock": 50
}
```

## 🏃‍♂️ Running the Project

### Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Production Build
```bash
npm start
```

## 📁 Project Structure

```
eco_hub/
├── public/                 # Static files
│   ├── index.html         # Homepage
│   ├── auth.html          # Login/Register
│   ├── cart.html          # Shopping cart
│   ├── checkout.html      # Checkout process
│   ├── profile.html       # User profile
│   └── assets/            # CSS, JS, Images
├── src/                   # Source code
│   ├── config/            # Configuration files
│   ├── services/          # Business logic
│   └── utils/             # Utility functions
└── functions/             # Firebase Cloud Functions
```

## 🔐 Security Notes

- **Never commit real Firebase credentials** to public repositories
- Use environment variables for sensitive data
- The current configuration uses placeholder values for security
- Replace all `YOUR_*` placeholders with your actual values

## 🚀 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://username.github.io/repository-name`

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build` (if applicable)
3. Set publish directory: `public`
4. Deploy automatically

## 🐛 Troubleshooting

### Common Issues

1. **Firebase not initialized**
   - Check if Firebase config is correct
   - Ensure all services are enabled in Firebase Console

2. **Authentication not working**
   - Verify Email/Password is enabled in Firebase Authentication
   - Check browser console for errors

3. **Images not loading**
   - Ensure images are in `public/assets/images/`
   - Check file paths in HTML files

4. **Cart not working**
   - Check browser localStorage
   - Verify JavaScript files are loading correctly

### Getting Help

- Check the browser console for JavaScript errors
- Verify Firebase Console for database/storage issues
- Review the `README.md` for detailed documentation

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Firebase documentation
3. Create an issue in the GitHub repository

---

**Happy Coding! 🌱♻️** 