# MyFrenchDriver Development Guide

## Quick Start

### 🚀 Run Both Frontend & Backend Together

```bash
# Install all dependencies (frontend + backend)
npm run install:all

# Start both frontend and backend in development mode
npm run dev
```

This will start:
- **Backend API** on `http://localhost:5000`
- **Frontend** on `http://localhost:5173`

### 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in development mode |
| `npm run frontend:dev` | Start only the frontend (Vite dev server) |
| `npm run backend:dev` | Start only the backend (with nodemon) |
| `npm run backend:start` | Start backend in production mode |
| `npm run start` | Start backend in production + frontend in dev mode |
| `npm run install:all` | Install dependencies for both frontend and backend |
| `npm run backend:install` | Install only backend dependencies |

### 🔧 Manual Setup (if needed)

If you prefer to run them separately:

1. **Install dependencies:**
   ```bash
   # Frontend dependencies
   npm install
   
   # Backend dependencies
   cd backend
   npm install
   cd ..
   ```

2. **Start Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```

3. **Start Frontend (Terminal 2):**
   ```bash
   npm run frontend:dev
   ```

### 🌐 URLs

**Local Development:**
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Admin Panel:** http://localhost:5173/admin

**Production:**
- **Frontend:** https://zimzim2255.github.io/my-french-driver-1/
- **Backend API:** https://my-french-driver-1.vercel.app/api
- **Admin Panel:** https://zimzim2255.github.io/my-french-driver-1/admin

### 🔐 Environment Variables

Make sure to set up your environment variables:

**Backend (.env):**
```env
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
MONGODB_URI=your_mongodb_connection_string
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 🛠️ Development Notes

- The frontend automatically fetches Stripe configuration from the backend
- All sensitive keys are stored securely on the backend
- Hot reload is enabled for both frontend and backend
- CORS is configured to allow frontend-backend communication

### 🚨 Troubleshooting

**Port conflicts:**
- Backend runs on port 5000
- Frontend runs on port 5173
- Make sure these ports are available

**Backend not starting:**
- Check if MongoDB is running
- Verify environment variables are set
- Check backend logs for errors

**Frontend can't connect to backend:**
- Ensure backend is running on port 5000
- Check CORS configuration
- Verify API base URL in frontend .env

## 🚀 Deployment

### Backend Deployment (Vercel)

1. **Deploy to Vercel:**
   ```bash
   cd backend
   vercel --prod
   ```

2. **Set Environment Variables in Vercel:**
   - Go to your Vercel dashboard
   - Add all environment variables from `backend/.env`
   - Make sure to set `NODE_ENV=production`

### Frontend Deployment (GitHub Pages)

1. **Build for Production:**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

### Environment Switching

**For Local Development:**
```bash
npm run dev:local          # Uses localhost backend
```

**For Production Testing:**
```bash
npm run dev:production     # Uses Vercel backend
```

**Build Commands:**
```bash
npm run build              # Production build (uses Vercel backend)
npm run build:local        # Local build (uses localhost backend)
```