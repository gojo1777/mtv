# ✅ සම්පූර්ණයි! Your Firebase is Ready! 🎉

## 🔥 Firebase Project: movie-7fae6

Your complete Firebase configuration is already integrated into the project!

---

## 🚀 Final Steps to Launch / අවසන් පියවර 2ක්:

### ✅ Step 1: Enable Authentication & Create Admin User

#### 1.1 Enable Email/Password Authentication:
1. Go to: https://console.firebase.google.com/u/0/project/movie-7fae6/authentication/providers
2. Click on **"Email/Password"**
3. Click **"Enable"** toggle
4. Click **"Save"**

#### 1.2 Create Admin User:
1. Go to: https://console.firebase.google.com/u/0/project/movie-7fae6/authentication/users
2. Click **"Add User"** button
3. Enter your admin credentials:
   ```
   Email: admin@movies.lk (හෝ ඔබේ email එකක්)
   Password: YourStrongPassword123
   ```
4. Click **"Add User"**

**⚠️ IMPORTANT:** මේ email සහ password මතක තියාගන්න - Admin panel login එකට ඕන වෙයි!

---

### ✅ Step 2: Setup MongoDB Database

#### Option A: MongoDB Atlas (FREE - Recommended)

1. **Create Account:**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up with Google or Email

2. **Create Free Cluster:**
   - Click **"Build a Database"**
   - Choose **"M0 FREE"** tier
   - Select region closest to you (e.g., Singapore)
   - Click **"Create Cluster"**

3. **Create Database User:**
   - Left sidebar → **Database Access**
   - Click **"Add New Database User"**
   - Username: `movieadmin`
   - Password: Create strong password (save it!)
   - Database User Privileges: **"Atlas admin"**
   - Click **"Add User"**

4. **Whitelist Your IP:**
   - Left sidebar → **Network Access**
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Click **"Confirm"**

5. **Get Connection String:**
   - Left sidebar → **Database** → Click **"Connect"**
   - Choose **"Connect your application"**
   - Copy the connection string:
   ```
   mongodb+srv://movieadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password
   - Replace `?retryWrites` with `/movies?retryWrites` (adds database name)

**Final connection string should look like:**
```
mongodb+srv://movieadmin:YourPassword123@cluster0.xxxxx.mongodb.net/movies?retryWrites=true&w=majority
```

---

## 💻 Run the Project / Project එක Run කරන්න

### 1. Extract the ZIP file
```bash
unzip sinhala-movies-web.zip
cd sinhala-movies-web
```

### 2. Update `.env.local` file

Open `.env.local` and replace the MongoDB URI:

```env
# Replace this line with your MongoDB connection string
MONGODB_URI=mongodb+srv://movieadmin:YourPassword@cluster0.xxxxx.mongodb.net/movies?retryWrites=true&w=majority

# Firebase is already configured! ✅
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDmMAV2QXHxR8c_2vLMt9JgO5KlLH971Ek
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=movie-7fae6.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=movie-7fae6
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=movie-7fae6.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=659548876964
NEXT_PUBLIC_FIREBASE_APP_ID=1:659548876964:web:b4f820126cea5912127631
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-B92KHJ2VEZ
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Install and Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

**Open your browser:** http://localhost:3000

---

## 🎬 Add Your First Movie

1. Go to: http://localhost:3000/admin
2. Login with the Firebase email/password you created
3. Click **"+ Add New Movie"**
4. Fill in the details:
   - **Title**: Avengers: Endgame
   - **සිංහල නම**: ඇවෙන්ජර්ස්: එන්ඩ්ගේම්
   - **Description**: Epic Marvel finale...
   - **Year**: 2019
   - **Genre**: Action, Adventure, Sci-Fi
   - **Language**: Sinhala Dub (or Sinhala Sub)
   - **Image URL**: https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg
   - **Rating**: 8.5
5. Click **"Add Movie"**

---

## 🌐 Deploy to Vercel

### Method 1: Vercel CLI (Quick)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Method 2: GitHub + Vercel Dashboard

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Sinhala Movies Website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/sinhala-movies.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to: https://vercel.com/new
   - Import your GitHub repository
   - Add environment variables in Vercel:
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
   - Click **"Deploy"**

---

## 📸 Where to Get Movie Posters?

1. **TMDb (The Movie Database):**
   - https://www.themoviedb.org
   - Search for movie → Images → Copy image URL
   - Format: `https://image.tmdb.org/t/p/w500/IMAGE_PATH.jpg`

2. **IMDb:**
   - https://www.imdb.com
   - Right-click poster → Copy image address

3. **Upload to Imgur:**
   - https://imgur.com
   - Upload image → Copy direct link

---

## 🎯 Important Links:

- **Firebase Console**: https://console.firebase.google.com/u/0/project/movie-7fae6
- **Firebase Authentication**: https://console.firebase.google.com/u/0/project/movie-7fae6/authentication/users
- **Local Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

---

## 🆘 Troubleshooting / ගැටළු විසඳීම:

### ❌ "Cannot connect to MongoDB"
- Check if MongoDB Atlas IP whitelist has 0.0.0.0/0
- Verify username and password in connection string
- Make sure you replaced `<password>` with actual password
- Database name should be in URL: `/movies?retryWrites`

### ❌ "Firebase auth not working"
- Go to Firebase Console → Authentication → Sign-in method
- Make sure Email/Password is **enabled**
- Check if admin user exists in Users tab

### ❌ "Cannot login to admin panel"
- Use exact email/password from Firebase Console
- Open browser console (F12) to see errors
- Clear browser cache and cookies

### ❌ "Module not found" errors
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

---

## ✨ Features You Have:

✅ **Firebase Authentication** - Admin login secured  
✅ **MongoDB Database** - All movies stored  
✅ **Responsive Design** - Works on mobile & desktop  
✅ **Search & Filter** - Find movies easily  
✅ **Admin Panel** - Add/delete movies  
✅ **Categories** - Sinhala Dub, Sinhala Sub  
✅ **Vercel Ready** - Deploy in minutes  

---

## 🎉 You're All Set! / සියල්ල සූදානම්!

Your complete Sinhala Movies website with:
- ✅ Firebase: **movie-7fae6** (configured!)
- ⏳ MongoDB: (add your connection string)

**Next:** Just add your MongoDB URI and you're ready to launch! 🚀

Good luck! සුභ පැතුම්! 🎬
