# 🎬 සිංහල Movies - Sinhala Dubbed & Subtitled Films Website

Full-stack movie website with MongoDB database, Firebase admin authentication, and Vercel deployment support.

## ✨ Features

- 📱 Responsive design (Mobile + Desktop)
- 🎬 Movie catalog with Sinhala dubbed and subtitled films
- 🔍 Search and filter functionality
- 🔐 Admin panel with Firebase authentication
- 📊 MongoDB database for movie storage
- ⚡ Built with Next.js 14 (App Router)
- 🚀 Ready for Vercel deployment

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React
- **Database**: MongoDB
- **Authentication**: Firebase Auth
- **Deployment**: Vercel
- **Styling**: CSS Modules

## 📋 Prerequisites

Before you begin, make sure you have:
- Node.js 18+ installed
- MongoDB database (MongoDB Atlas recommended)
- Firebase project created
- Vercel account (for deployment)

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. MongoDB Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string (Replace `<password>` with your password)
4. Add to `.env.local` as `MONGODB_URI`

### 4. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project
3. Enable **Authentication** → Email/Password
4. Get config from Project Settings → General → Your apps
5. Add to `.env.local`

**Create Admin User:**
- Go to Firebase Console → Authentication
- Add user with email and password
- Use these credentials to login to admin panel

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🌐 Vercel Deployment

### Option 1: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Add environment variables:
   - Copy all variables from `.env.local`
   - Paste into Vercel environment variables
6. Click "Deploy"

### Important: Environment Variables in Vercel

Add these in Vercel Dashboard → Settings → Environment Variables:

```
MONGODB_URI
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_SITE_URL (use your Vercel URL)
```

## 📁 Project Structure

```
sinhala-movies-web/
├── app/
│   ├── admin/           # Admin panel
│   ├── api/             # API routes
│   └── page.js          # Home page
├── components/          # React components
├── lib/                 # Utilities (MongoDB, Firebase)
├── models/              # Mongoose models
├── styles/              # CSS files
└── public/              # Static files
```

## 🎯 How to Use

### Admin Panel

1. Go to `/admin`
2. Login with Firebase credentials
3. Add movies with:
   - Title (English & Sinhala)
   - Description
   - Year, Genre, Language
   - Image URL
   - Download/Streaming links
   - Rating

### Public Website

- Browse all movies on home page
- Filter by Sinhala Dub or Sub
- Search movies
- Click movie for details

## 🔒 Security Notes

- Never commit `.env.local` to Git
- Keep Firebase API keys secure
- Use Firebase rules to restrict database access
- Enable MongoDB IP whitelist in production

## 📝 Adding Movies

1. Login to Admin Panel (`/admin`)
2. Click "Add New Movie"
3. Fill in movie details:
   - **Title**: English name
   - **Sinhala Title**: සිංහල නම
   - **Description**: Movie description
   - **Year**: Release year
   - **Genre**: Action, Drama, etc. (comma separated)
   - **Language**: Sinhala Dub / Sinhala Sub / Both
   - **Image URL**: Movie poster URL
   - **Rating**: 0-10
   - **Featured**: Check to show in hero section

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Check `MONGODB_URI` in environment variables
- Verify IP whitelist in MongoDB Atlas

### "Firebase auth error"
- Verify all Firebase env variables
- Check if Email/Password auth is enabled
- Confirm admin user exists in Firebase Console

### Build errors in Vercel
- Check all environment variables are added
- Verify MongoDB connection string format
- Check build logs for specific errors

## 📞 Support

For issues or questions:
- Check MongoDB Atlas connection
- Verify Firebase project settings
- Review Vercel deployment logs

## 🎉 Success!

Your Sinhala movies website is now live! 

- Public site: Your Vercel URL
- Admin panel: `your-url.vercel.app/admin`

---

Made with ❤️ for Sinhala movie lovers
