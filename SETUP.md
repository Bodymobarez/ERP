# 🚀 Setup Guide - Enterprise ERP System

This guide will walk you through setting up the Enterprise ERP system step by step.

## Prerequisites

Before you begin, ensure you have:
- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- A **Neon PostgreSQL** account (free tier available)
- A code editor (VS Code recommended)

## Step 1: Verify Node.js Installation

```bash
node --version  # Should show v18 or higher
npm --version   # Should show npm version
```

## Step 2: Install Dependencies

Navigate to the project directory and install all required packages:

```bash
cd enterprise-erp
npm install
```

This will install all dependencies including:
- Next.js 14
- Prisma ORM
- NextAuth.js
- Tailwind CSS
- Shadcn UI components
- And more...

## Step 3: Setup Neon PostgreSQL Database

### Creating a Neon Account

1. Visit [neon.tech](https://neon.tech)
2. Click "Sign Up" (it's free!)
3. Sign up with GitHub, Google, or email
4. Verify your email if needed

### Creating a Database

1. Once logged in, click "Create Project"
2. Choose a project name (e.g., "ERP System")
3. Select a region close to you
4. Click "Create Project"

### Getting Connection String

1. After project creation, you'll see the connection details
2. Click "Connection String" tab
3. Copy the connection string (it looks like this):
   ```
   postgresql://user:password@ep-example-123456.us-east-2.aws.neon.tech/dbname?sslmode=require
   ```

## Step 4: Configure Environment Variables

1. In the project root, you'll find a `.env` file
2. Open it and replace the `DATABASE_URL` with your Neon connection string:

```env
# Replace this with your actual Neon connection string
DATABASE_URL="postgresql://user:password@ep-example-123456.us-east-2.aws.neon.tech/erp_database?sslmode=require"

# Keep these as they are for local development
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="change-this-to-a-random-secret"

MAX_FILE_SIZE=10485760
UPLOAD_DIR="./public/uploads"
```

### Generating a Secure Secret

For `NEXTAUTH_SECRET`, generate a secure random string:

```bash
# On macOS/Linux
openssl rand -base64 32

# Or use any random string generator online
```

Copy the generated string and replace `NEXTAUTH_SECRET` value.

## Step 5: Initialize the Database

Now let's set up the database schema:

```bash
# Generate Prisma Client
npx prisma generate

# Push the schema to Neon database
npx prisma db push
```

You should see output indicating successful schema creation.

## Step 6: Seed the Database (Optional but Recommended)

Seed the database with sample data for testing:

```bash
npm run db:seed
```

This creates:
- Admin user (email: admin@example.com, password: admin123)
- Sample company and branch
- Sample roles and permissions
- Sample projects, invoices, employees, inventory items
- And more...

## Step 7: Start the Development Server

```bash
npm run dev
```

You should see:
```
✓ Ready in X.Xs
○ Local:   http://localhost:3000
```

## Step 8: Access the Application

1. Open your browser
2. Navigate to [http://localhost:3000](http://localhost:3000)
3. You should see the beautiful landing page

## Step 9: Sign In

1. Click "Sign In" button
2. Use these credentials:
   - Email: `admin@example.com`
   - Password: `admin123`
3. You'll be redirected to the dashboard

## 🎉 Success!

You should now see the main dashboard with all modules accessible from the sidebar.

## Exploring the System

### Available Modules

- **Dashboard**: Overview with analytics and recent activity
- **Projects**: Project management with tasks and milestones
- **Finance**: Invoices, payments, and accounting
- **HR**: Employee management, attendance, payroll
- **Procurement**: Purchase requests, orders, suppliers
- **Inventory**: Items, warehouses, stock movements
- **Contracts**: Contract management
- **CRM**: Clients, leads, opportunities
- **Equipment**: Equipment tracking and maintenance
- **Documents**: Document management with versioning
- **Analytics**: Reports and insights
- **Settings**: System configuration

## Viewing the Database

To view and edit your database directly:

```bash
npm run db:studio
```

This opens Prisma Studio in your browser at [http://localhost:5555](http://localhost:5555)

## Common Issues & Solutions

### Issue: Database connection failed

**Solution**: 
- Check if your `DATABASE_URL` is correct
- Ensure your Neon database is active
- Verify you have internet connection

### Issue: Port 3000 already in use

**Solution**:
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or run on different port
PORT=3001 npm run dev
```

### Issue: Prisma schema errors

**Solution**:
```bash
# Regenerate Prisma Client
npx prisma generate

# Reset and push schema
npx prisma db push --force-reset
```

### Issue: Can't sign in

**Solution**:
- Make sure database is seeded: `npm run db:seed`
- Check if user exists in Prisma Studio
- Verify `NEXTAUTH_SECRET` is set in `.env`

## Next Steps

### For Development

1. Explore the codebase structure
2. Modify components in `components/` directory
3. Add new API routes in `app/api/`
4. Customize styles in `app/globals.css`

### For Production

1. Update environment variables for production
2. Generate a strong `NEXTAUTH_SECRET`
3. Deploy to Vercel, Netlify, or your preferred platform
4. Configure production Neon database connection

## Production Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_URL` (your production URL)
   - `NEXTAUTH_SECRET`
   - Other variables from `.env`
6. Click "Deploy"

Your app will be live in minutes!

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com)

## Need Help?

- Check the main [README.md](README.md) for more information
- Review the project structure
- Check API routes in `app/api/`
- Look at component examples in `components/`

## Security Notes

⚠️ **Important for Production:**

1. Never commit `.env` file to Git
2. Use strong, unique passwords
3. Change default admin credentials
4. Enable HTTPS in production
5. Keep dependencies updated
6. Implement rate limiting
7. Enable CORS only for trusted domains
8. Use environment-specific secrets

---

Happy coding! 🚀

