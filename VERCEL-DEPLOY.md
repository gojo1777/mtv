# 🚀 Vercel Deployment Guide - සිංහලෙන්

## විකල්ප 2ක් තියනවා Vercel එකට deploy කරන්න:

---

## 🎯 Option 1: Vercel CLI (ඉක්මන්!)

### පියවර:

```bash
# 1. Vercel CLI install කරන්න (එක වතාවක් විතරයි)
npm i -g vercel

# 2. Vercel account එකට login වෙන්න
vercel login
# Browser එකේ open වෙලා confirm කරන්න

# 3. Project folder එකේ හිටලා deploy කරන්න
cd sinhala-movies-web
vercel
```

### Vercel අහනවා:

**1. "Set up and deploy?"** → `Y` (Yes)

**2. "Which scope?"** → Select your account (Enter)

**3. "Link to existing project?"** → `N` (No - new project)

**4. "What's your project's name?"** → `sinhala-movies` (or any name)

**5. "In which directory is your code located?"** → `./` (Enter)

**6. "Want to modify settings?"** → `N` (No)

### දැන් environment variables add කරන්න:

Vercel deploy වෙලා ඉවර වුනම:

```bash
# Add environment variables
vercel env add MONGODB_URI
# Paste: mongodb+srv://sayuaradark_db_user:qK3BV8XVv2JJJD5a@cluster0.w8wb15r.mongodb.net/movies?retryWrites=true&w=majority&appName=Cluster0

vercel env add NEXT_PUBLIC_FIREBASE_API_KEY
# Paste: AIzaSyDmMAV2QXHxR8c_2vLMt9JgO5KlLH971Ek

vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
# Paste: movie-7fae6.firebaseapp.com

vercel env add NEXT_PUBLIC_FIREBASE_PROJECT_ID
# Paste: movie-7fae6

vercel env add NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
# Paste: movie-7fae6.firebasestorage.app

vercel env add NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
# Paste: 659548876964

vercel env add NEXT_PUBLIC_FIREBASE_APP_ID
# Paste: 1:659548876964:web:b4f820126cea5912127631

vercel env add NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
# Paste: G-B92KHJ2VEZ

# Redeploy with environment variables
vercel --prod
```

---

## 🎯 Option 2: GitHub + Vercel Dashboard (විස්තරාත්මක)

### Step 1: GitHub එකට Push කරන්න

```bash
# Git initialize කරන්න (project folder එකේ)
cd sinhala-movies-web
git init

# .gitignore already එකතු වෙලා තියනවා, check කරන්න
cat .gitignore

# Files add කරන්න
git add .

# First commit
git commit -m "Initial commit - Sinhala Movies Website"

# GitHub repository එකක් හදන්න:
# 1. https://github.com/new වෙබ් අඩවියට යන්න
# 2. Repository name: sinhala-movies (or any name)
# 3. Make it Private (recommended) or Public
# 4. Click "Create repository"

# Repository URL copy කරලා:
git remote add origin https://github.com/YOUR-USERNAME/sinhala-movies.git

# Push කරන්න
git branch -M main
git push -u origin main
```

### Step 2: Vercel එකට Import කරන්න

1. **Vercel වෙබ් අඩවියට යන්න:**
   - https://vercel.com
   - Sign up with GitHub account

2. **New Project:**
   - Dashboard → "Add New..." → "Project"
   - "Import Git Repository" section එකේ
   - ඔබේ `sinhala-movies` repository එක select කරන්න
   - "Import" click කරන්න

3. **Configure Project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)

4. **Environment Variables Add කරන්න:**
   
   Click "Environment Variables" section:

   ```
   Name: MONGODB_URI
   Value: mongodb+srv://sayuaradark_db_user:qK3BV8XVv2JJJD5a@cluster0.w8wb15r.mongodb.net/movies?retryWrites=true&w=majority&appName=Cluster0
   ```

   ```
   Name: NEXT_PUBLIC_FIREBASE_API_KEY
   Value: AIzaSyDmMAV2QXHxR8c_2vLMt9JgO5KlLH971Ek
   ```

   ```
   Name: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   Value: movie-7fae6.firebaseapp.com
   ```

   ```
   Name: NEXT_PUBLIC_FIREBASE_PROJECT_ID
   Value: movie-7fae6
   ```

   ```
   Name: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   Value: movie-7fae6.firebasestorage.app
   ```

   ```
   Name: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   Value: 659548876964
   ```

   ```
   Name: NEXT_PUBLIC_FIREBASE_APP_ID
   Value: 1:659548876964:web:b4f820126cea5912127631
   ```

   ```
   Name: NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
   Value: G-B92KHJ2VEZ
   ```

   ```
   Name: NEXT_PUBLIC_SITE_URL
   Value: https://your-app-name.vercel.app
   (මෙක deploy වුන පස්සේ actual URL එක දාන්න)
   ```

5. **Deploy:**
   - "Deploy" button click කරන්න
   - Wait 2-3 minutes...
   - ✅ Done!

### Step 3: Update Site URL

Deploy වුන පස්සේ:

1. Vercel dashboard → Your project → Settings → Environment Variables
2. `NEXT_PUBLIC_SITE_URL` edit කරන්න
3. Value එක change කරන්න ඔබේ actual Vercel URL එකට
   - Example: `https://sinhala-movies-abc123.vercel.app`
4. Save
5. Deployments → Latest deployment → "Redeploy"

---

## 🔄 Future Updates Deploy කරන්න

### GitHub method use කරනවා නම්:

```bash
# Code changes කරන්න
# Save files

# Git commit
git add .
git commit -m "Added new features"
git push

# Vercel automatically redeploys! 🎉
```

### Vercel CLI use කරනවා නම්:

```bash
# Code changes කරන්න
# Save files

vercel --prod
```

---

## 🌍 Custom Domain Add කරන්න (Optional)

ඔබේම domain එකක් තියනවා නම්:

1. Vercel Dashboard → Your Project → Settings → Domains
2. "Add" click කරන්න
3. ඔබේ domain enter කරන්න (example: sinhalamovies.com)
4. Vercel DNS records දෙනවා
5. ඒවා ඔබේ domain registrar එකේ add කරන්න
6. Wait for DNS propagation (5-60 minutes)
7. ✅ Done!

---

## ✅ Deployment Checklist:

පළමු deployment එකට කලින්:

- [ ] Firebase Admin user created
- [ ] Email/Password authentication enabled
- [ ] MongoDB connection working locally
- [ ] All environment variables ready
- [ ] Tested locally with `npm run dev`
- [ ] Code pushed to GitHub (if using GitHub method)

---

## 🆘 Common Issues:

### ❌ Build fails with "Module not found"
- Make sure all dependencies in `package.json`
- Check import paths are correct

### ❌ "Cannot connect to database"
- Verify MongoDB URI in environment variables
- Check MongoDB Atlas allows IP 0.0.0.0/0
- Make sure database name is in URI: `/movies?...`

### ❌ Firebase auth not working
- Verify all Firebase env variables are added
- Check Firebase project ID matches
- Ensure Email/Password auth is enabled

### ❌ Environment variables not working
- Make sure they're added in Vercel dashboard
- Check for typos in variable names
- Redeploy after adding variables

### ❌ Site shows 404 or blank page
- Check build logs in Vercel dashboard
- Verify `next.config.js` is correct
- Try redeploying

---

## 📊 After Deployment:

1. **Test your live site:**
   - Visit: https://your-app.vercel.app
   - Test: https://your-app.vercel.app/admin
   - Login and add a movie

2. **Monitor:**
   - Vercel Dashboard → Analytics
   - Check visitor stats
   - Monitor errors

3. **Share:**
   - Share your URL!
   - Add to social media
   - Tell friends! 🎉

---

## 🎉 Congratulations! 

Your Sinhala Movies website is now LIVE on the internet! 🌍

**Share it:**
- https://your-app.vercel.app

**Admin panel:**
- https://your-app.vercel.app/admin

---

**Happy deploying! සුභ පැතුම්! 🚀**
