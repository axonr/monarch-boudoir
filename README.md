# Monarch Boudoir - Luxury Portrait Photography Landing Page

A stunning, fully-functional luxury boudoir photography landing page built with **Next.js**, **React**, **Tailwind CSS**, and **Framer Motion**. Features a complete booking consultation system with server-side form handling, database storage, and email notifications.

## 🌟 Features

### Frontend
- **Hero Section** with full-screen background image and scroll animations
- **About Section** with asymmetric layout and fade-in effects
- **What's Included** section showcasing services with hover effects
- **Testimonials Carousel** with interactive controls and smooth transitions
- **FAQ Accordion** with collapsible Q&A
- **Booking Consultation Form** with real-time validation
- **Sticky Navigation** with mobile hamburger menu
- **Fully Responsive** design (mobile, tablet, desktop)
- **Scroll-Triggered Animations** throughout using Framer Motion
- **Footer** with contact information and social links

### Backend
- **tRPC API** for type-safe client-server communication
- **MySQL/TiDB Database** for booking storage
- **Form Validation** with Zod schema validation
- **Email Notifications** for booking confirmations
- **Admin Notifications** for new bookings
- **Secure Server-Side Handling** of all form submissions

### Design
- **Luxury Color Palette**: Magenta/Pink (#d946ef) with gold accents (#fbbf24)
- **Premium Typography**: Playfair Display for headings, Inter for body
- **Elegant Animations**: Smooth, non-intrusive scroll effects
- **Professional Polish**: Meticulous attention to detail throughout

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (or npm/yarn)
- MySQL/TiDB database

### Installation

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/monarch-boudoir-landing.git
cd monarch-boudoir-landing

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
pnpm run dev
```

Visit `http://localhost:3000` in your browser.

## 📁 Project Structure

```
monarch-boudoir-landing/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx          # Main landing page with all sections
│   │   │   └── NotFound.tsx       # 404 page
│   │   ├── components/
│   │   │   ├── Navigation.tsx     # Sticky nav with mobile menu
│   │   │   ├── ui/               # shadcn/ui components
│   │   │   └── ...
│   │   ├── App.tsx               # Main app component
│   │   ├── index.css             # Global styles & animations
│   │   └── main.tsx              # React entry point
│   ├── index.html                # HTML template
│   └── public/                   # Static assets
├── server/
│   ├── routers.ts                # tRPC procedure definitions
│   ├── db.ts                     # Database query helpers
│   ├── email.ts                  # Email notification service
│   └── _core/                    # Framework internals
├── drizzle/
│   ├── schema.ts                 # Database schema
│   └── migrations/               # SQL migrations
├── shared/                       # Shared types and constants
├── DEPLOYMENT.md                 # Deployment guide
└── README.md                     # This file
```

## 🎨 Design System

### Colors
- **Primary**: Magenta (#d946ef) - Main brand color
- **Secondary**: Gold (#fbbf24) - Accent color
- **Background**: Off-white (#f8f8f6)
- **Foreground**: Dark charcoal (#1a1a1a)

### Typography
- **Headings**: Playfair Display (serif) - Bold, elegant
- **Body**: Inter (sans-serif) - Clean, readable

### Animations
- **Fade In**: 0.6s ease-out
- **Slide Up**: 0.6s ease-out with 20px offset
- **Stagger**: 0.1s delay between items
- **Scroll Trigger**: Animations trigger on scroll into view

## 🔧 Configuration

### Environment Variables

Create `.env.local` with:

```env
# Database
DATABASE_URL=mysql://user:password@host:3306/monarch_boudoir

# Authentication
JWT_SECRET=your-secret-key
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im

# Application
VITE_APP_ID=your-app-id
VITE_APP_TITLE=Monarch Boudoir
VITE_APP_LOGO=https://your-logo-url.com/logo.png

# APIs
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-api-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=your-frontend-api-key

# Analytics
VITE_ANALYTICS_ENDPOINT=https://analytics.manus.im
VITE_ANALYTICS_WEBSITE_ID=your-website-id

# Owner
OWNER_NAME=Your Name
OWNER_OPEN_ID=your-open-id
```

## 📦 Dependencies

### Frontend
- **React 19**: UI library
- **Tailwind CSS 4**: Utility-first styling
- **Framer Motion**: Animation library
- **shadcn/ui**: Component library
- **Lucide React**: Icon library
- **react-intersection-observer**: Scroll detection

### Backend
- **Express 4**: Web server
- **tRPC 11**: Type-safe API
- **Drizzle ORM**: Database ORM
- **Zod**: Schema validation
- **MySQL2**: Database driver

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test server/bookings.test.ts

# Watch mode
pnpm test --watch
```

## 🏗️ Building

```bash
# Development build
pnpm run dev

# Production build
pnpm run build

# Start production server
pnpm run start

# Type checking
pnpm check

# Format code
pnpm format
```

## 📤 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Other Platforms

The application can be deployed to any Node.js hosting:
- Railway
- Render
- Heroku
- AWS
- Google Cloud
- Azure

## 🔐 Security

- ✅ Server-side form validation
- ✅ Input sanitization with Zod
- ✅ Secure database connections
- ✅ Environment variable protection
- ✅ CORS configuration
- ✅ Rate limiting ready

## 📊 Performance

- ✅ Optimized images from Unsplash CDN
- ✅ Code splitting via Vite
- ✅ Lazy loading for components
- ✅ Efficient database queries
- ✅ Production-ready build optimization

## 🎯 Features Checklist

- [x] Hero section with animations
- [x] About section with asymmetric layout
- [x] What's Included showcase
- [x] Testimonials carousel
- [x] FAQ accordion
- [x] Booking form with validation
- [x] Server-side form handling
- [x] Database storage
- [x] Email notifications
- [x] Sticky navigation
- [x] Mobile menu
- [x] Responsive design
- [x] Scroll animations
- [x] Footer with contact info

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 3000
lsof -i :3000
kill -9 <PID>
```

### Database Connection Error
- Verify DATABASE_URL is correct
- Check database server is running
- Ensure credentials are valid

### Build Failures
```bash
# Clear and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm run build
```

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 👨‍💼 Support

For issues or questions:
1. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
2. Review error messages in browser console
3. Check server logs in `.manus-logs/`

---

**Built with ❤️ for Monarch Boudoir**

*Celebrating elegance, confidence, and beauty through luxury portrait photography.*
