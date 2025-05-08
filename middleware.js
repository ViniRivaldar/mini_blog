import { NextResponse } from "next/server";

export default function middleware(req){
    const token = req.cookies.get('auth-storage')

    if(!token){
        return NextResponse.redirect(new URL('/', req.url))
    }

    const path = req.nextUrl.pathname
    const adminRoutes= ['/painel', '/painel/postagem']

    if (adminRoutes.some(route => path.startsWith(route))){
        const adminCookie = req.cookies.get('user-admin');
        const isAdmin = adminCookie?.value === 'true';

        if (!isAdmin) {
            return NextResponse.redirect(new URL('/perfil', req.url));
          }
    }
}

export const config = {
    matcher: ['/perfil', '/painel', '/painel/:path*'],
};