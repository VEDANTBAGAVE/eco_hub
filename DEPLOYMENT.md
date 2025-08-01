# Deployment Guide

This guide will help you deploy the Eco-Friendly E-commerce Store to various platforms.

## 🚀 GitHub Pages Deployment

### Prerequisites
- GitHub account
- Git installed on your machine

### Steps

1. **Create a GitHub Repository**
   ```bash
   # Initialize git repository
   git init
   git add .
   git commit -m "Initial commit"
   
   # Create a new repository on GitHub and push
   git remote add origin https://github.com/yourusername/eco_hub.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "GitHub Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Click "Save"

3. **Configure Firebase for Production**
   - Update Firebase configuration in all HTML and JS files
   - Replace the demo Firebase project with your own
   - Update the API keys and project settings

## 🔥 Firebase Hosting Deployment

### Prerequisites
- Firebase account
- Firebase CLI installed: `npm install -g firebase-tools`

### Steps

1. **Login to Firebase**
   ```bash
   firebase login
   ```

2. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```
   - Select your project
   - Set public directory to `.` (root)
   - Configure as single-page app: `No`
   - Don't overwrite index.html

3. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

## 🌐 Netlify Deployment

### Steps

1. **Connect to GitHub**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository

2. **Configure Build Settings**
   - Build command: Leave empty (static site)
   - Publish directory: `.` (root)

3. **Deploy**
   - Click "Deploy site"
   - Your site will be live at a Netlify URL

## 🔧 Environment Setup

### For Local Development

1. **Install Dependencies**
   ```bash
   npm install
   cd functions && npm install
   ```

2. **Set Environment Variables**
   - Copy `env.example` to `.env`
   - Fill in your Firebase and email credentials

3. **Start Development Server**
   ```bash
   npm start
   ```

### For Production

1. **Update Firebase Configuration**
   - Replace all Firebase config objects in:
     - `templates/index.html`
     - `templates/auth.html`
     - `templates/product-details.html`
     - All files in `js/` directory

2. **Update Email Configuration**
   - Set up environment variables for email service
   - Use app passwords for Gmail

## 📝 Important Notes

### Security Considerations
- Firebase API keys are safe to expose in client-side code
- Email credentials should be kept secure
- Use environment variables for sensitive data

### Performance Optimization
- Optimize images before uploading
- Minify CSS and JavaScript for production
- Enable compression on your hosting platform

### SEO Optimization
- Add meta tags to HTML files
- Create a sitemap.xml
- Add robots.txt file

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Connection Errors**
   - Check if Firebase project is properly configured
   - Verify API keys are correct
   - Ensure Firestore rules allow read/write

2. **Email Not Working**
   - Check if Gmail app password is correct
   - Verify environment variables are set
   - Check if 2FA is enabled on Gmail

3. **Images Not Loading**
   - Verify Firebase Storage is configured
   - Check if images are uploaded to Storage
   - Ensure Storage rules allow public read

### Getting Help
- Check Firebase Console for errors
- Review browser console for JavaScript errors
- Check network tab for failed requests

## 📞 Support

If you encounter issues during deployment:
1. Check the troubleshooting section above
2. Review Firebase documentation
3. Open an issue in the GitHub repository 