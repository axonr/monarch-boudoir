# GitHub & Vercel Setup Guide

## Step 1: Create GitHub Repository

### 1.1 Create a new repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `monarch-boudoir-landing`
3. Description: `Luxury boudoir photography landing page with booking system`
4. Choose visibility: **Public** (recommended) or **Private**
5. Click "Create repository"

### 1.2 Initialize Git locally

```bash
cd /home/ubuntu/monarch-boudoir-landing

# Initialize git if not already done
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Monarch Boudoir landing page

- Hero section with animations
- About section with asymmetric layout
- What's Included showcase
- Testimonials carousel
- FAQ accordion
- Booking consultation form
- Sticky navigation with mobile menu
- Fully responsive design
- Server-side form handling with database storage
- Email notifications for bookings"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/monarch-boudoir-landing.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

### 1.3 Verify on GitHub

1. Go to your repository: `https://github.com/YOUR_USERNAME/monarch-boudoir-landing`
2. Verify all files are present
3. Check commit history

## Step 2: Deploy to Vercel

### 2.1 Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with GitHub
3. Click "New Project"
4. Click "Import Git Repository"
5. Search for `monarch-boudoir-landing`
6. Click "Import"

### 2.2 Configure Project Settings

1. **Project Name**: `monarch-boudoir-landing`
2. **Framework**: Auto-detected (should be "Other")
3. **Root Directory**: `./` (default)
4. Click "Continue"

### 2.3 Add Environment Variables

In the "Environment Variables" section, add all required variables:

```
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
VITE_APP_ID=your-app-id
VITE_APP_TITLE=Monarch Boudoir
VITE_APP_LOGO=https://your-logo-url.com/logo.png
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-api-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=your-frontend-api-key
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_ANALYTICS_WEBSITE_ID=your-website-id
OWNER_NAME=Your Name
OWNER_OPEN_ID=your-open-id
```

### 2.4 Deploy

1. Click "Deploy"
2. Wait for build to complete (usually 2-5 minutes)
3. You'll see a success message with your deployment URL

### 2.5 Verify Deployment

1. Click the deployment URL
2. Verify all sections load correctly:
   - Hero section with animations
   - Navigation bar
   - About section
   - What's Included
   - Testimonials carousel
   - FAQ section
   - Booking form
   - Footer

## Step 3: Custom Domain (Optional)

### 3.1 Add Custom Domain

1. In Vercel project settings → "Domains"
2. Enter your domain name
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take 24-48 hours)

### 3.2 SSL Certificate

Vercel automatically provisions free SSL certificates via Let's Encrypt.

## Step 4: Continuous Deployment

### 4.1 Auto-Deploy on Push

Vercel automatically deploys when you push to `main` branch:

```bash
# Make changes locally
git add .
git commit -m "Update booking form styling"

# Push to GitHub
git push origin main

# Vercel automatically deploys within seconds
```

### 4.2 Preview Deployments

Every pull request automatically gets a preview deployment:

1. Create a branch: `git checkout -b feature/new-section`
2. Make changes and commit
3. Push: `git push origin feature/new-section`
4. Create pull request on GitHub
5. Vercel creates preview URL automatically

## Step 5: Monitoring & Maintenance

### 5.1 Monitor Deployments

1. Go to Vercel dashboard
2. Click your project
3. View deployment history
4. Check build logs if issues occur

### 5.2 View Analytics

1. In Vercel dashboard → "Analytics"
2. Monitor page performance
3. Track user engagement

### 5.3 Error Tracking

1. Check browser console for client errors
2. View server logs in Vercel dashboard
3. Set up error notifications (optional)

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Run `pnpm run build` locally to reproduce

### Database Connection Error

1. Verify `DATABASE_URL` is correct
2. Ensure database is accessible from Vercel
3. Check database credentials

### Deployment Takes Too Long

1. Check for large dependencies
2. Optimize build process
3. Contact Vercel support if issue persists

### Custom Domain Not Working

1. Verify DNS records are configured correctly
2. Wait for DNS propagation
3. Clear browser cache
4. Check Vercel domain settings

## Rollback to Previous Deployment

1. In Vercel dashboard, go to "Deployments"
2. Find the deployment you want to restore
3. Click the three dots menu
4. Select "Promote to Production"

## Update Code After Deployment

```bash
# Make changes locally
nano client/src/pages/Home.tsx

# Test locally
pnpm run dev

# Commit changes
git add .
git commit -m "Fix booking form validation"

# Push to GitHub
git push origin main

# Vercel automatically deploys
```

## Useful Commands

```bash
# Check git status
git status

# View commit history
git log --oneline

# Create new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main

# Delete local branch
git branch -d feature/old-feature

# Pull latest changes
git pull origin main
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Documentation](https://docs.github.com)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

---

**Deployment Complete!** 🎉

Your Monarch Boudoir landing page is now live and ready to receive bookings.
