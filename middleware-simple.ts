export { default } from 'next-auth/middleware'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/projects/:path*',
    '/finance/:path*',
    '/hr/:path*',
    '/procurement/:path*',
    '/inventory/:path*',
    '/contracts/:path*',
    '/crm/:path*',
    '/equipment/:path*',
    '/documents/:path*',
    '/analytics/:path*',
    '/settings/:path*',
  ],
}

