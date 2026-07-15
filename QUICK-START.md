# 🚀 Quick Start Guide - ඉක්මන් ආරම්භය

## ✅ Firebase Already Configured! / Firebase දැනටමත් සකසා ඇත!

Your Firebase project **"movie-7fae6"** is already set up in the code!

## 📝 Next Steps / ඊළඟ පියවර:

### 1. Firebase Admin User හදන්න

1. Go to: https://console.firebase.google.com/u/0/project/movie-7fae6/authentication/users
2. Click "Add User"
3. Enter email and password (මෙක admin login එකට)
   - Example: admin@sayuradark.com
   - Password: YourStrongPassword123
4. Click "Add User"

**⚠️ මේ credentials ටික මතක තියාගන්න - admin panel login එකට ඕන වෙයි!**

### 2. MongoDB Setup කරන්න

#### Option 1: MongoDB Atlas (Recommended / නිර්දේශිත)

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a FREE cluster (M0)
4. Database Access → Add New User:
   - Username: `sayuradark`
   - Password: `YourStrongPassword123`
   - Database User Privileges: `Atlas admin`
5. Network Access → Add IP Address:
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
6. Database → Connect → "Connect your application"
7. Copy the connection string:
   ```
   mongodb+srv://sayuradark:YourStrongPassword123@cluster0.xxxxx.mongodb.net/sayura-movies?retryWrites=true&w=majority
   ```
8. Replace `<password>` with your actual password

#### දැන් .env.local file එක update කරන්න:

Open `.env.local` file and replace:
```env
MONGODB_URI=mongodb+srv://sayuradark:YourPassword@cluster0.xxxxx.mongodb.net/sayura-movies?retryWrites=true&w=majority
```

### 3. Install & Run / ස්ථාපනය සහ ධාවනය

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open browser: http://localhost:3000

### 4. Login to Admin Panel

1. Go to: http://localhost:3000/admin
2. Enter the email & password you created in Firebase
3. Start adding movies! 🎬

### 5. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

When prompted, add these environment variables:
```
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDmMAV2QXHxR8c_2vLMt9JgO5KlLH971Ek
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=movie-7fae6.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=movie-7fae6
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=movie-7fae6.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=659548876964
NEXT_PUBLIC_FIREBASE_APP_ID=1:659548876964:web:b4f820126cea5912127631
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-B92KHJ2VEZ
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
```

## 🎯 Important URLs / වැදගත් URL

- **Firebase Console**: https://console.firebase.google.com/u/0/project/movie-7fae6
- **Public Site**: http://localhost:3000 (or your Vercel URL)
- **Admin Panel**: http://localhost:3000/admin

## ✨ Features Ready to Use / භාවිතයට සූදානම් විශේෂාංග:

✅ Firebase Authentication (Email/Password)
✅ MongoDB Database Integration
✅ Admin Panel for Managing Movies
✅ Responsive Design (Mobile + Desktop)
✅ Search & Filter
✅ Movie Categories (Dub/Sub)
✅ Vercel Deployment Ready

## 🆘 Need Help? / උදව්වක් ඕනද?

**MongoDB connection issues:**
- Make sure IP whitelist includes 0.0.0.0/0
- Check username and password are correct
- Verify connection string format

**Firebase auth not working:**
- Go to Firebase Console → Authentication
- Make sure Email/Password is enabled
- Check if admin user exists

**Can't login to admin:**
- Use the exact email/password from Firebase Console
- Check browser console for errors (F12)

---

## 🎉 You're Ready! / ඔබ සූදානම්!

ඔබේ Firebase project එක configure වෙලා. දැන් MongoDB connection එක add කරලා run කරන්න!

Good luck! 🚀
