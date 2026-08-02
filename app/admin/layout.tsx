// app/admin/layout.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, BookOpen, Calculator, History, LogOut, Menu, X, UserCircle } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();

	const [session, setSession] = useState<any>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		getSession().then((data) => {
			if (!data) {
				router.push("/login");
			} else {
				setSession(data);
			}
		});
	}, [router]);

	const handleLogout = async () => {
		await signOut({ redirect: false });
		router.push("/login");
	};

	const menuItems = [
		{ name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
		{ name: "Literasi", icon: BookOpen, path: "/admin/literasi" },
		{ name: "Numerasi", icon: Calculator, path: "/admin/numerasi" },
		{ name: "Riwayat Lino", icon: History, path: "/admin/riwayat" },
	];

	if (!session) return null;

	return (
		<div className="min-h-screen bg-slate-50 flex">
			{/* Background overlay untuk mobile */}
			{isSidebarOpen && (
				<div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
			)}

			{/* SIDEBAR: Diubah menggunakan h-screen dan sticky agar penuh ke bawah */}
			<aside
				className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 ease-in-out ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				}`}
			>
				<div className="p-6 border-b border-slate-100 flex items-center gap-3">
					<div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 relative">
						<Image
							src="/logo_sekolah.jpg"
							alt="Logo Sekolah"
							fill
							className="object-cover"
							onError={(e) => {
								(e.target as HTMLImageElement).src = "/logo.jpeg";
							}}
						/>
					</div>
					<div>
						<h2 className="text-lg font-bold text-slate-800 leading-tight">LiNO Platform</h2>
						<p className="text-xs text-slate-500 font-medium">SMA Negeri 2 Brebes</p>
					</div>
					<button onClick={() => setIsSidebarOpen(false)} className="ml-auto lg:hidden text-slate-500">
						<X className="h-5 w-5" />
					</button>
				</div>

				{/* Navigasi mengambil sisa ruang (flex-1) */}
				<nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
					{menuItems.map((item) => {
						const isActive = pathname.startsWith(item.path);
						return (
							<Link
								key={item.name}
								href={item.path}
								className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm ${
									isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
								}`}
								onClick={() => setIsSidebarOpen(false)}
							>
								<item.icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
								{item.name}
							</Link>
						);
					})}
				</nav>

				{/* Tombol Logout didorong ke paling bawah */}
				<div className="p-4 border-t border-slate-100 mt-auto">
					<button
						onClick={handleLogout}
						className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-sm"
					>
						<LogOut className="h-5 w-5 text-slate-400 group-hover:text-red-500" />
						Logout
					</button>
				</div>
			</aside>

			{/* MAIN CONTENT AREA */}
			<div className="flex-1 flex flex-col min-w-0">
				<header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
					<div className="flex items-center gap-4">
						<button
							onClick={() => setIsSidebarOpen(true)}
							className="lg:hidden text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition-colors"
						>
							<Menu className="h-5 w-5" />
						</button>
						<h1 className="hidden md:block text-slate-800 font-semibold truncate">
							LiNO, Literasi dan Numerasi Online
						</h1>
						<h1 className="md:hidden text-slate-800 font-semibold truncate">LiNO</h1>
					</div>

					<div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
						<div className="text-right hidden sm:block">
							<p className="text-sm font-bold text-slate-800 leading-none">{session?.user?.nama}</p>
							<p className="text-xs text-slate-500 font-medium mt-1">{session?.user?.role?.replace("_", " ")}</p>
						</div>
						<UserCircle className="h-8 w-8 text-slate-400" />
					</div>
				</header>

				<main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#fafafa]">{children}</main>
			</div>
		</div>
	);
}
