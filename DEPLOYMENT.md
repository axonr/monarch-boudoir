# Monarch Boudoir Landing Page - Deployment Guide

## Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- pnpm package manager
- Git installed
- GitHub account
- Vercel account (for deployment)

## Local Development Setup

### 1. Install Dependencies

```bash
cd /home/ubuntu/monarch-boudoir-landing
pnpm install
```

### 2. Set Environment Variables

Copy the template and update with your values:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
- Database credentials
- API keys
- Application settings

### 3. Run Development Server

```bash
pnpm run dev
```

The application will be available at `http://localhost:3000`

### 4. Build for Production

```bash
pnpm run build
```

### 5. Start Production Server

```bash
pnpm run start
```

## Deployment to Vercel

### Step 1: Push to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Monarch Boudoir landing page"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/monarch-boudoir-landing.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose your GitHub repository
5. Click "Import"

### Step 3: Configure Environment Variables

In Vercel project settings:

1. Go to "Settings" → "Environment Variables"
2. Add all variables from `.env.local`:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `VITE_APP_ID`
   - `VITE_APP_TITLE`
   - `VITE_APP_LOGO`
   - `OAUTH_SERVER_URL`
   - `VITE_OAUTH_PORTAL_URL`
   - `BUILT_IN_FORGE_API_URL`
   - `BUILT_IN_FORGE_API_KEY`
   - `VITE_FRONTEND_FORGE_API_URL`
   - `VITE_FRONTEND_FORGE_API_KEY`
   - `VITE_ANALYTICS_ENDPOINT`
   - `VITE_ANALYTICS_WEBSITE_ID`
   - `OWNER_NAME`
   - `OWNER_OPEN_ID`

### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

## Database Setup

### Local Database (MySQL/TiDB)

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE monarch_boudoir;"

# Run migrations
pnpm run db:push
```

### Production Database

Ensure your production database is configured and accessible via `DATABASE_URL`.

## Testing

### Run Tests

```bash
pnpm test
```

### Build Verification

```bash
pnpm check
pnpm run build
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# On macOS/Linux
lsof -i :3000
kill -9 <PID>

# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Connection Issues

1. Verify `DATABASE_URL` is correct
2. Check database credentials
3. Ensure database server is running
4. Test connection: `mysql -u user -p -h host -D database`

### Build Failures

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Rebuild
pnpm run build
```

## Performance Optimization

### Image Optimization

Images are loaded from Unsplash CDN with optimized URLs:
- Responsive sizing parameters
- Format optimization
- Lazy loading support

### Code Splitting

- Automatic code splitting via Vite
- Route-based lazy loading
- Component-level optimization

### Database Optimization

- Indexed queries for fast lookups
- Connection pooling
- Query optimization

## Security Considerations

1. **Environment Variables**: Never commit `.env.local` to Git
2. **CORS**: Configure CORS headers for production domain
3. **Rate Limiting**: Implement rate limiting on booking endpoint
4. **Input Validation**: All form inputs are validated server-side
5. **Database**: Use strong passwords and SSL connections

## Monitoring

### Vercel Analytics

- Enable Web Analytics in Vercel dashboard
- Monitor performance metrics
- Track user engagement

### Error Tracking

- Check Vercel deployment logs
- Monitor application errors
- Set up error alerts

## Maintenance

### Regular Updates

```bash
# Update dependencies
pnpm update

# Check for vulnerabilities
pnpm audit
```

### Database Backups

- Set up automated backups
- Test restore procedures
- Monitor database size

## Support

For issues or questions:
- Check deployment logs in Vercel dashboard
- Review application errors in browser console
- Contact hosting support if needed

---

**Last Updated**: July 2, 2026
**Version**: 1.0.0
