import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

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

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            roles: {
              include: {
                role: {
                  include: {
                    permissions: {
                      include: {
                        permission: true,
                      },
                    },
                  },
                },
              },
            },
            permissions: {
              include: {
                permission: true,
              },
            },
            company: true,
            branch: true,
          },
        })

        if (!user || !user.isActive) {
          throw new Error('المستخدم غير موجود أو غير مفعل')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error('كلمة المرور غير صحيحة')
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        })

        // Extract permissions
        const rolePermissions = user.roles.flatMap(ur => 
          ur.role.permissions.map(rp => ({
            resource: rp.permission.resource,
            action: rp.permission.action,
          }))
        )
        
        const userPermissions = user.permissions.map(up => ({
          resource: up.permission.resource,
          action: up.permission.action,
        }))

        const allPermissions = [...rolePermissions, ...userPermissions]

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          image: user.avatar,
          roles: user.roles.map(ur => ur.role.name),
          permissions: allPermissions,
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
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      roles: {
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true,
                },
              },
            },
          },
        },
      },
      permissions: {
        include: {
          permission: true,
        },
      },
    },
  })

  if (!user || !user.isActive) return false

  // Check role permissions
  const hasRolePermission = user.roles.some(ur =>
    ur.role.permissions.some(rp =>
      rp.permission.resource === resource && rp.permission.action === action
    )
  )

  // Check user permissions
  const hasUserPermission = user.permissions.some(up =>
    up.permission.resource === resource && up.permission.action === action
  )

  return hasRolePermission || hasUserPermission
}

