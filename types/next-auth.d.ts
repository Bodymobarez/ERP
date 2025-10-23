import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    name: string
    image?: string | null
    roles: string[]
    permissions: Array<{ resource: string; action: string }>
    companyId: string | null
    branchId: string | null
  }

  interface Session {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    roles: string[]
    permissions: Array<{ resource: string; action: string }>
    companyId: string | null
    branchId: string | null
  }
}

