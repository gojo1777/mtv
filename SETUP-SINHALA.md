# 🎬 සිංහල Movies වෙබ් සයිට් - ඉක්මන් සකස් කිරීමේ මාර්ගෝපදේශය

## 📝 මුලික පියවර

### 1️⃣ MongoDB Database එක හදන්න

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) වෙබ් අඩවියට යන්න
2. නොමිලේ ගිණුමක් සාදන්න (Free account)
3. "Build a Database" ක්ලික් කරන්න
4. Free tier (M0) තෝරන්න
5. Cluster එක සාදන්න
6. Database Access → Add New Database User
   - Username සහ Password එකක් දෙන්න
   - Built-in Role: "Atlas admin" තෝරන්න
7. Network Access → Add IP Address → "Allow Access from Anywhere" (0.0.0.0/0)
8. Database → Connect → "Connect your application"
9. Connection string එක copy කරන්න:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
   ```
10. `<username>` සහ `<password>` ඔබේ details වලින් replace කරන්න

### 2️⃣ Firebase Project එක හදන්න

1. [Firebase Console](https://console.firebase.google.com/) වෙබ් අඩවියට යන්න
2. "Add Project" → Project name දෙන්න → Continue
3. Google Analytics අක්‍රිය කරන්න → Create project
4. Project සාදුනාම:
   - **Authentication සක්‍රීය කරන්න:**
     - Build → Authentication → Get Started
     - Sign-in method → Email/Password → Enable → Save
   
5. **Admin User එක හදන්න:**
   - Authentication → Users → Add user
   - Email සහ Password දෙන්න (මේක admin login එකට)
   - Add user ක්ලික් කරන්න

6. **Config details ගන්න:**
   - Project Overview → Project settings (⚙️)
   - Scroll down → "Your apps" → Web icon (</>)
   - App nickname දෙන්න → Register app
   - Firebase configuration copy කරන්න:
   ```javascript
   apiKey: "AIzaSy..."
   authDomain: "project.firebaseapp.com"
   projectId: "project-id"
   storageBucket: "project.appspot.com"
   messagingSenderId: "123456789"
   appId: "1:123456:web:abc123"
   ```

### 3️⃣ Project එක Setup කරන්න

1. **ප්‍රොජෙක්ට් එක download කරන්න**
   - මේ folder එක ඔබේ computer එකට download කරන්න

2. **Terminal එක open කරන්න** (VS Code හෝ Command Prompt)

3. **Dependencies install කරන්න:**
   ```bash
   cd sinhala-movies-web
   npm install
   ```

4. **.env.local ගොනුව සාදන්න:**
   - Project folder එකේ `.env.example` ගොනුව copy කරන්න
   - Rename කරන්න `.env.local` කියලා
   - ඔබේ MongoDB සහ Firebase details ඇතුලත් කරන්න:

   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sinhala-movies
   
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456:web:abc123
   
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

5. **Development server එක run කරන්න:**
   ```bash
   npm run dev
   ```

6. Browser එකේ විවෘත කරන්න: http://localhost:3000

### 4️⃣ Vercel එකට Deploy කරන්න

#### Method 1: Vercel CLI භාවිතා කරමින්

```bash
# Vercel CLI install කරන්න
npm i -g vercel

# Vercel login වෙන්න
vercel login

# Deploy කරන්න
vercel
```

#### Method 2: GitHub + Vercel Dashboard

1. **GitHub Repository එකක් හදන්න:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/sinhala-movies.git
   git push -u origin main
   ```

2. **Vercel Dashboard:**
   - [Vercel.com](https://vercel.com) වෙබ් අඩවියට යන්න
   - GitHub account එකෙන් login වෙන්න
   - "Add New" → "Project"
   - ඔබේ GitHub repository එක import කරන්න
   - "Deploy" කලින්:

3. **Environment Variables එකතු කරන්න:**
   - Vercel dashboard එකේ → Settings → Environment Variables
   - `.env.local` file එකේ තියන හැම variable එකක්ම add කරන්න:
     ```
     MONGODB_URI
     NEXT_PUBLIC_FIREBASE_API_KEY
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
     NEXT_PUBLIC_FIREBASE_PROJECT_ID
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
     NEXT_PUBLIC_FIREBASE_APP_ID
     NEXT_PUBLIC_SITE_URL (මෙතන ඔබේ Vercel URL එක දෙන්න)
     ```

4. **Deploy කරන්න:**
   - "Deploy" button එක ක්ලික් කරන්න
   - ටික වෙලාවකින් deployment එක complete වෙයි
   - ඔබේ live URL එක ලැබෙනවා (example: https://your-app.vercel.app)

### 5️⃣ Movies Add කරන්න

1. ඔබේ website එකට යන්න
2. `/admin` URL එකට යන්න
3. Firebase එකේ හැදූ email/password එකෙන් login වෙන්න
4. "Add New Movie" ක්ලික් කරන්න
5. Movie details ටික fill කරන්න:
   - Title (English)
   - සිංහල නම
   - Description
   - Year
   - Genre (Action, Drama, Comedy - comma වලින් separate කරන්න)
   - Language (Sinhala Dub / Sinhala Sub / Both)
   - Image URL (movie poster link එක)
   - Rating (0-10)
6. "Add Movie" ක්ලික් කරන්න

## 🎯 වැදගත් සටහන්

### Movie Images සඳහා:
- [IMDb](https://www.imdb.com) වලින් movie posters download කරන්න පුළුවන්
- [Imgur](https://imgur.com) වලට upload කරලා link එක use කරන්න
- හෝ Firebase Storage use කරන්න

### Problems නම්:

**MongoDB connect වෙන්නේ නැත්නම්:**
- MongoDB Atlas එකේ IP whitelist එක check කරන්න
- Connection string එක හරියට copy වුනාද බලන්න
- Username සහ password හරිද බලන්න

**Firebase auth වැඩ කරන්නේ නැත්නම්:**
- Email/Password authentication enable වුනාද බලන්න
- Environment variables හරියට add වුනාද check කරන්න
- Admin user එක Firebase console එකේ තියනවද බලන්න

**Vercel deploy වෙන්නේ නැත්නම්:**
- හැම environment variable එකක්ම add කරලද බලන්න
- Build logs බලන්න errors නම්
- MongoDB URI එක `MONGODB_URI` කියලා ඇතිද (typo නැතිද)

## ✅ සාර්ථකයි!

දැන් ඔබේ සිංහල Movies වෙබ් අඩවිය live!

- Public website: https://your-app.vercel.app
- Admin panel: https://your-app.vercel.app/admin

සුභ පැතුම්! 🎉
