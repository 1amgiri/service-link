# Deploying ServiceLink to Vercel

ServiceLink uses a hybrid architecture (React Frontend + Flask Backend) which requires specific steps for Vercel deployment.

## ⚠️ Critical Prerequisite: Cloud Database
Your local MySQL database (XAMPP/localhost) **will not work** on Vercel. You must use a cloud database provider.

### Recommended Free/Cheap Options:
*   **MySQL**: [Aiven](https://aiven.io/mysql) (Free tier available)
*   **PostgreSQL**: [Neon](https://neon.tech/) or [Supabase](https://supabase.com/) (Free tiers). *Note: You'll need to change the connection string in `.env` to `postgresql://...`.*

---

## Steps to Deploy

### 1. Push to GitHub
Make sure your latest code is pushed to your GitHub repository (you just did this!).

### 2. Login to Vercel
Go to [vercel.com](https://vercel.com) and login/signup with your GitHub account.

### 3. Import Project
1.  Click **"Add New..."** -> **"Project"**.
2.  Import your **`service-link`** repository.

### 4. Configure Project
1.  **Framework Preset**: Select **Vite** (Vercel should auto-detect this).
2.  **Root Directory**: Keep as is (`./`).
3.  **Environment Variables**:
    You MUST add these variables in the Vercel dashboard:
    *   `DATABASE_URI`: Your **Cloud Database Connection String** (e.g., `mysql+pymysql://user:pass@host:port/dbname`).
    *   `SECRET_KEY`: A random secret string (e.g., `my-super-secret-key-123`).
    *   `GEMINI_API_KEY`: Your Gemini API Key (if used in frontend).

### 5. Deploy
Click **"Deploy"**. Vercel will:
1.  Build your React frontend.
2.  Detect `api/index.py` and set up the Python serverless functions.
3.  Deploy your app!

---

## Troubleshooting
*   **Database Error**: If the logs say "Can't connect to MySQL server on 'localhost'", you forgot to set the `DATABASE_URI` env var to a cloud database.
*   **Missing Dependencies**: If the build fails saying `ModuleNotFoundError`, make sure all packages are in `backend/requirements.txt` (which they are!).
