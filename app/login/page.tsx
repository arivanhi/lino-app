// app/login/page.tsx
"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Lock, Eye, EyeOff, LogIn, HelpCircle } from "lucide-react";

export default function LoginPage() {
	const router = useRouter();
	const currentYear = new Date().getFullYear();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsMounted(true), 100);
		return () => clearTimeout(timer);
	}, []);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const res = await signIn("credentials", {
				username,
				password,
				redirect: false,
			});

			if (res?.error) {
				setError(res.error);
				setIsLoading(false);
			} else {
				router.push("/");
			}
		} catch (err) {
			setError("Terjadi kesalahan pada sistem. Silakan coba lagi.");
			setIsLoading(false);
		}
	};

	return (
		// Container utama: flex-col (HP atas-bawah) dan lg:flex-row (Desktop kiri-kanan)
		<div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
			{/* SISI KIRI: Background Gelap dengan Teks */}
			{/* Di HP: padding lebih kecil (px-8 py-10), tinggi menyesuaikan konten */}
			{/* Di Desktop: padding besar (lg:px-20), tinggi full screen (lg:min-h-screen) */}
			<div className="relative w-full lg:w-[45%] bg-[#1a2234] flex flex-col justify-center px-8 lg:px-20 py-12 lg:py-16 overflow-hidden lg:min-h-screen">
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
					<div className="absolute -top-20 -left-20 w-72 h-72 lg:w-96 lg:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
				</div>

				<div
					className={`relative z-10 transition-all duration-1000 transform ${
						isMounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
					}`}
				>
					{/* Di HP: Teks lebih kecil (text-3xl) agar tidak makan tempat */}
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 lg:mb-6">
						Menyalakan
						<br />
						Cahaya Literasi,
						<br />
						Menguatkan
						<br />
						Numerasi
					</h1>
					{/* Di HP: Teks deskripsi disembunyikan (hidden sm:block) agar form login langsung terlihat */}
					<p className="hidden sm:block text-slate-400 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed">
						Platform evaluasi dan pembelajaran terpadu untuk membangun fondasi masa depan pendidikan.
					</p>
				</div>

				{/* Di HP: Posisi relative dan margin top. Di Desktop: absolute di pojok kiri bawah */}
				<div className="relative mt-8 lg:mt-0 lg:absolute lg:bottom-8 lg:left-20 z-10">
					<p className="text-slate-500 text-xs sm:text-sm font-medium">© {currentYear} Lino Platform</p>
				</div>
			</div>

			{/* SISI KANAN: Form Login Glassmorphism */}
			{/* Di HP: padding ditekan (p-4), flex-1 agar mengisi sisa layar */}
			<div className="relative w-full lg:w-[55%] flex flex-1 items-center justify-center p-4 sm:p-8 lg:p-12 overflow-hidden bg-slate-50">
				<div className="absolute inset-0 pointer-events-none overflow-hidden">
					<div className="absolute top-[5%] right-[5%] w-48 h-48 lg:w-72 lg:h-72 bg-blue-200/60 rounded-full mix-blend-multiply filter blur-2xl lg:blur-3xl animate-blob"></div>
					<div className="absolute bottom-[5%] left-[10%] w-48 h-48 lg:w-72 lg:h-72 bg-cyan-200/60 rounded-full mix-blend-multiply filter blur-2xl lg:blur-3xl animate-blob animation-delay-2000"></div>
				</div>

				{/* Form Container */}
				{/* Di HP: padding form lebih sempit (p-6) agar tidak mentok tepi layar */}
				<div
					className={`relative z-10 w-full max-w-md p-6 sm:p-10 transition-all duration-1000 delay-150 transform ${
						isMounted ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
					}`}
				>
					<div className="absolute inset-0 bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl -z-10"></div>

					<div className="flex flex-col items-center mb-6 lg:mb-8">
						{/* Di HP: Logo sedikit diperkecil (w-16 h-16) */}
						<div className="bg-white p-2.5 lg:p-3 rounded-2xl shadow-sm mb-4 lg:mb-5">
							<Image
								src="/logo.jpeg"
								alt="Logo Lino"
								width={70}
								height={70}
								className="rounded-xl object-contain w-16 h-16 lg:w-[70px] lg:h-[70px]"
								priority
							/>
						</div>
						<h2 className="text-xl lg:text-2xl font-bold text-slate-800 text-center">Selamat Datang di Lino</h2>
						<p className="text-slate-500 text-xs lg:text-sm text-center mt-1.5 lg:mt-2">
							Silakan masuk menggunakan akun Anda.
						</p>
					</div>

					<form onSubmit={handleLogin} className="space-y-4 lg:space-y-5">
						{error && (
							<div className="p-3 text-xs lg:text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg text-center animate-pulse">
								{error}
							</div>
						)}

						<div className="space-y-1.5">
							<label className="text-xs font-semibold text-slate-700 ml-1">Username / NISN / NPP</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
									<User className="h-4 w-4 lg:h-5 lg:w-5 text-slate-400" />
								</div>
								<input
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="w-full pl-10 lg:pl-11 pr-4 py-2.5 lg:py-3 bg-white/70 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl outline-none transition-all text-sm lg:text-base placeholder:text-slate-400 text-slate-700"
									placeholder="Masukkan Username Anda"
									required
								/>
							</div>
						</div>

						<div className="space-y-1.5">
							<label className="text-xs font-semibold text-slate-700 ml-1">Password</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
									<Lock className="h-4 w-4 lg:h-5 lg:w-5 text-slate-400" />
								</div>
								<input
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full pl-10 lg:pl-11 pr-12 py-2.5 lg:py-3 bg-white/70 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl outline-none transition-all text-sm lg:text-base placeholder:text-slate-400 text-slate-700"
									placeholder="••••••••"
									required
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4 lg:h-5 lg:w-5" />
									) : (
										<Eye className="h-4 w-4 lg:h-5 lg:w-5" />
									)}
								</button>
							</div>
						</div>

						<div className="flex items-center justify-between pt-1">
							<label className="flex items-center gap-2 cursor-pointer group">
								<input
									type="checkbox"
									className="w-3.5 h-3.5 lg:w-4 lg:h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
								/>
								<span className="text-xs lg:text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
									Remember Me
								</span>
							</label>
							<button
								type="button"
								className="text-xs lg:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
							>
								Lupa Password?
							</button>
						</div>

						<button
							type="submit"
							disabled={isLoading}
							className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 lg:py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-4 text-sm lg:text-base"
						>
							{isLoading ? (
								<div className="w-4 h-4 lg:w-5 lg:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
							) : (
								<>
									Masuk <LogIn className="h-4 w-4" />
								</>
							)}
						</button>
					</form>

					<div className="mt-6 lg:mt-8 pt-5 lg:pt-6 border-t border-slate-200/60 text-center">
						<button
							type="button"
							className="inline-flex items-center gap-1.5 text-xs lg:text-sm text-slate-500 hover:text-slate-800 transition-colors"
						>
							<HelpCircle className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
							Butuh bantuan untuk masuk?
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
