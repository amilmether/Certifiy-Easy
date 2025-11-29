# Vercel Deployment Checklist ✅

## Pre-Deployment Setup

Your project is now configured for Vercel! Follow these steps:

### Step 1: Push Changes to GitHub
```bash
git add .
git commit -m "Configure Vercel deployment with serverless API"
git push origin main
```

### Step 2: Set Up on Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New" → "Project"**
3. Import your GitHub repository: **amilmether/Certifiy-Easy**
4. Click **"Import"**

### Step 3: Configure Build Settings
Vercel should auto-detect these settings, but verify:
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

### Step 4: Add Environment Variables
Go to **Settings → Environment Variables** and add:

**Required:**
- `DATABASE_URL` = Your Neon PostgreSQL connection string
  - Format: `postgresql://user:password@host/database?sslmode=require`
  - Get this from: [neon.tech](https://neon.tech) → Project → Connection string

**Optional (if using in your app):**
- `NODE_ENV` = `production`
- Any API keys (Google OAuth, Resend email, etc.)

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (should take 2-3 minutes)
3. Once successful, you'll get a live URL!

## Project Structure Verified ✅

```
Certifiy-Easy/
├── api/index.ts              ← Serverless API handler
├── dist/
│   ├── public/               ← Static frontend build
│   └── index.cjs             ← Bundled server code
├── client/                   ← React frontend
├── server/                   ← Express backend
├── vercel.json              ← Vercel config ✅
├── .vercelignore            ← Build optimization ✅
└── package.json             ← Dependencies ✅
```

## What's Deployed

**Frontend:** React + Vite (Built to `dist/public`)
**Backend:** Express APIs (Serverless function at `/api`)
**Database:** Neon PostgreSQL (Serverless)

## Important Notes

⚠️ **WebSocket Support:** Vercel serverless has limitations with WebSocket connections. If your app uses WebSocket (from `ws` package), consider:
- Using Vercel's Hobby/Pro plan for longer function timeouts
- Moving real-time features to a separate service

⚠️ **Session Storage:** The app uses `memorystore` which won't persist across function invocations. For production:
- Use `connect-pg-simple` to store sessions in PostgreSQL (already in dependencies!)
- Update `server/index.ts` to use PostgreSQL sessions

⚠️ **File Uploads:** Vercel functions have a 512MB max response size and temp files are ephemeral. For file handling:
- Use cloud storage (AWS S3, Cloudinary, etc.)
- Store references in database

## Troubleshooting

### Build fails
- Check `npm run build` works locally: `npm run build`
- Verify all environment variables are set

### API not responding
- Check Vercel function logs: Dashboard → Deployments → Function logs
- Ensure `DATABASE_URL` is set correctly

### Database connection errors
- Verify Neon connection string in `DATABASE_URL`
- Check Neon project is active

### Frontend shows blank page
- Check browser console for errors
- Verify rewrite rules in `vercel.json` are correct

## Next Steps

1. Push your code and test deployment
2. Monitor the deployment logs
3. Test your app on the Vercel URL
4. Set up custom domain (optional)

---

**Good luck! 🚀**
