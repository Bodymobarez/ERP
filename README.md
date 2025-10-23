# Enterprise ERP System

A comprehensive, modern Enterprise Resource Planning (ERP) system built with Next.js 14, Prisma, and Neon PostgreSQL. Features beautiful UI with Tailwind CSS and Shadcn UI components.

## 🚀 Features

### Core Modules
- **User Management**: Complete authentication with role-based access control
- **Projects**: Project management with tasks, phases, milestones, and progress tracking
- **Finance**: Accounting, invoicing, payments, journals, and accounts
- **HR**: Employee management, attendance, leave management, and payroll
- **Procurement**: Purchase requests, orders, RFQs, and supplier management
- **Inventory**: Item management, warehouses, and stock movements
- **Contracts**: Contract management with terms and amendments
- **CRM**: Client and supplier management, leads, and opportunities
- **Equipment**: Equipment tracking, maintenance, and assignments
- **Documents**: Document management with versioning and approvals
- **Analytics**: Comprehensive dashboards, reports, and insights

### Technical Features
- 🎨 Beautiful, modern UI with 8K design
- 🔐 Secure authentication with NextAuth.js
- 📊 Real-time analytics and dashboards
- 🔔 Notification system
- ✅ Approval workflows
- 🗄️ Neon PostgreSQL database
- 🎯 Type-safe with TypeScript
- 📱 Fully responsive design
- ⚡ Fast and optimized with Next.js 14

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Neon PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **UI**: Tailwind CSS + Shadcn UI
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Charts**: Recharts, Chart.js
- **Forms**: React Hook Form + Zod

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Neon PostgreSQL account (for production) or local PostgreSQL

## 🚀 Getting Started

### 1. Clone the repository

```bash
cd enterprise-erp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@your-neon-host.neon.tech/erp_database?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_DIR="./public/uploads"
```

#### Getting Neon Database URL:
1. Visit [neon.tech](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy the connection string
5. Paste it in your `.env` file as `DATABASE_URL`

### 4. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed database with sample data
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Default Credentials

For development/testing (after seeding):

```
Email: admin@example.com
Password: admin123
```

## 📁 Project Structure

```
enterprise-erp/
├── app/                      # Next.js 14 App Router
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication
│   │   ├── projects/       # Projects API
│   │   ├── finance/        # Finance API
│   │   ├── hr/             # HR API
│   │   └── ...             # Other modules
│   ├── auth/               # Auth pages
│   ├── dashboard/          # Dashboard pages
│   │   ├── projects/       # Projects UI
│   │   ├── finance/        # Finance UI
│   │   ├── hr/             # HR UI
│   │   └── ...             # Other modules
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── layout/             # Layout components
│   │   ├── sidebar.tsx     # Sidebar navigation
│   │   └── header.tsx      # Header
│   ├── ui/                 # UI components (Shadcn)
│   └── providers.tsx       # App providers
├── lib/                     # Utility functions
│   ├── prisma.ts           # Prisma client
│   ├── auth.ts             # Auth configuration
│   └── utils.ts            # Helper functions
├── prisma/                  # Database schema
│   └── schema.prisma       # Prisma schema
├── public/                  # Static files
├── types/                   # TypeScript types
└── package.json            # Dependencies
```

## 🗄️ Database Schema

The system includes comprehensive schemas for all modules:

- **Core**: Users, Roles, Permissions, Companies, Branches
- **Projects**: Projects, Tasks, Phases, Milestones, Progress
- **Finance**: Accounts, Journals, Invoices, Payments
- **HR**: Employees, Attendance, Leave, Payroll
- **Procurement**: Purchase Requests, POs, RFQs, Suppliers
- **Inventory**: Items, Warehouses, Stock Movements
- **Contracts**: Contracts, Terms, Amendments
- **CRM**: Clients, Leads, Opportunities
- **Equipment**: Equipment, Maintenance, Assignments
- **Documents**: Documents, Versions, Approvals
- **System**: Notifications, Audit Logs

## 🔐 Authentication & Authorization

- JWT-based authentication with NextAuth.js
- Role-based access control (RBAC)
- Permission-based authorization
- Secure password hashing with bcrypt
- Session management

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1920px+)
- Laptop (1366px+)
- Tablet (768px+)
- Mobile (375px+)

## 🎨 UI Components

Built with Shadcn UI for a modern, accessible experience:
- Cards, Buttons, Inputs
- Dropdowns, Modals, Alerts
- Tables, Forms, Charts
- Avatar, Badge, Progress
- And many more...

## 📊 API Routes

All modules have RESTful API routes:

```
GET    /api/[module]           # List items
POST   /api/[module]           # Create item
GET    /api/[module]/[id]      # Get item
PATCH  /api/[module]/[id]      # Update item
DELETE /api/[module]/[id]      # Delete item
```

Example modules: projects, invoices, employees, items, clients, etc.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean
- AWS
- Google Cloud

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint
```

## 📈 Performance

- Server-side rendering (SSR)
- API route caching
- Optimized images
- Code splitting
- Lazy loading

## 🔧 Customization

### Adding a New Module

1. Create Prisma schema in `prisma/schema.prisma`
2. Create API routes in `app/api/[module]/`
3. Create UI pages in `app/dashboard/[module]/`
4. Add navigation link in `components/layout/sidebar.tsx`
5. Run `npx prisma db push` to update database

### Styling

- Modify `tailwind.config.ts` for theme customization
- Edit `app/globals.css` for global styles
- Use Shadcn UI components for consistency

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Prisma for the excellent ORM
- Neon for serverless PostgreSQL
- Shadcn for beautiful UI components
- Vercel for hosting platform

## 📞 Support

For support, email support@example.com or open an issue on GitHub.

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced reporting
- [ ] Multi-language support
- [ ] Email notifications
- [ ] Real-time collaboration
- [ ] API documentation (Swagger)
- [ ] Advanced analytics
- [ ] Integration with third-party services

---

Built with ❤️ using Next.js 14

