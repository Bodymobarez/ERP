import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

// Mock user database for development
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    password: '$2a$10$7J8Q1X2X3X4X5X6X7X8X9uO.lPR7oI8MYKzv5/7eqMOXVWlAG3ybW', // admin123
    firstName: 'Admin',
    lastName: 'User',
    avatar: null,
    isActive: true,
    roles: ['Admin'],
    permissions: [
      { resource: 'projects', action: 'read' },
      { resource: 'projects', action: 'write' },
      { resource: 'finance', action: 'read' },
      { resource: 'hr', action: 'read' },
    ],
    companyId: '1',
    branchId: '1',
  },
  {
    id: '2',
    email: 'manager@example.com',
    password: '$2a$10$7J8Q1X2X3X4X5X6X7X8X9uO.lPR7oI8MYKzv5/7eqMOXVWlAG3ybW', // admin123
    firstName: 'Manager',
    lastName: 'User',
    avatar: null,
    isActive: true,
    roles: ['Manager'],
    permissions: [
      { resource: 'projects', action: 'read' },
      { resource: 'finance', action: 'read' },
    ],
    companyId: '1',
    branchId: '1',
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('بيانات الدخول مطلوبة')
        }

        // Find user in mock database
        const user = mockUsers.find(u => u.email === credentials.email)

        if (!user || !user.isActive) {
          throw new Error('المستخدم غير موجود أو غير مفعل')
        }

        // For development, allow simple password check
        const isPasswordValid = credentials.password === 'admin123' || 
          await bcrypt.compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error('كلمة المرور غير صحيحة')
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          image: user.avatar,
          roles: user.roles,
          permissions: user.permissions,
          companyId: user.companyId,
          branchId: user.branchId,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.roles = user.roles
        token.permissions = user.permissions
        token.companyId = user.companyId
        token.branchId = user.branchId
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.roles = token.roles as string[]
        session.user.permissions = token.permissions as any[]
        session.user.companyId = token.companyId as string
        session.user.branchId = token.branchId as string | null
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export async function checkPermission(
  userId: string,
  resource: string,
  action: string
): Promise<boolean> {
  // Find user in mock database
  const user = mockUsers.find(u => u.id === userId)
  
  if (!user || !user.isActive) return false

  // Check if user has the required permission
  return user.permissions.some(permission =>
    permission.resource === resource && permission.action === action
  )
}

