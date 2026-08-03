// src/middleware.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const { pathname } = req.nextUrl;

	// 1. Jika belum login dan mencoba mengakses halaman selain login, lempar ke /login
	const isAuthPage = pathname.startsWith("/login");
	if (!token) {
		if (!isAuthPage) {
			return NextResponse.redirect(new URL("/login", req.url));
		}
		return NextResponse.next();
	}

	// 2. Tentukan Dashboard tujuan berdasarkan Role dari E-Journal
	let dashboardUrl = "/";
	const userRole = token.role as string;

	if (userRole === "SISWA") {
		dashboardUrl = "/siswa/dashboard";
	} else if (userRole === "WALI_KELAS") {
		dashboardUrl = "/wali-kelas/dashboard";
	} else if (userRole === "KEPSEK") {
		dashboardUrl = "/pimpinan/dashboard";
	} else if (["ADMIN_TU", "WAKA", "KOORDINATOR"].includes(userRole)) {
		dashboardUrl = "/admin/dashboard";
	} else {
		// Guru reguler yang bukan wali kelas diblokir atau diarahkan ke halaman khusus
		dashboardUrl = "/unauthorized";
	}

	// 3. Jika sudah login tapi mencoba ke halaman "/login" atau rute root "/", arahkan ke dashboard
	if (isAuthPage || pathname === "/") {
		return NextResponse.redirect(new URL(dashboardUrl, req.url));
	}

	// 4. Proteksi Rute (Role-Based Access Control)
	if (pathname.startsWith("/siswa") && userRole !== "SISWA") {
		return NextResponse.redirect(new URL(dashboardUrl, req.url));
	}

	if (pathname.startsWith("/wali-kelas") && userRole !== "WALI_KELAS") {
		return NextResponse.redirect(new URL(dashboardUrl, req.url));
	}

	if (pathname.startsWith("/pimpinan") && userRole !== "KEPSEK") {
		return NextResponse.redirect(new URL(dashboardUrl, req.url));
	}

	if (pathname.startsWith("/admin") && !["ADMIN_TU", "WAKA", "KOORDINATOR"].includes(userRole)) {
		return NextResponse.redirect(new URL(dashboardUrl, req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/login", "/siswa/:path*", "/wali-kelas/:path*", "/pimpinan/:path*", "/admin/:path*"],
};
