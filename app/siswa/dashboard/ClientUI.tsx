// app/siswa/dashboard/ClientUI.tsx
"use client";

import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as RechartsTooltip,
	ResponsiveContainer,
} from "recharts";
import {
	Clock,
	CheckCircle2,
	TrendingUp,
	TrendingDown,
	BookOpen,
	PenTool,
	ArrowRight,
	FileText,
	AlertTriangle,
} from "lucide-react";
import Link from "next/link";

export default function DashboardSiswaUI({
	studentName,
	kelasNama,
	literasiStats,
	numerasiStats,
	ongoingLiterasi,
	detailNumerasi,
}: any) {
	const isAvgGood = Number(numerasiStats.average) >= 75;

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
			{/* HEADER */}
			<div className="mb-8">
				<h1 className="text-3xl font-black text-slate-900 tracking-tight">Halo, {studentName}!</h1>
				<p className="text-slate-600 font-medium mt-1">Siswa Kelas {kelasNama}</p>
			</div>

			{/* TOP CARDS */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Card 1: Deadline Terdekat */}
				<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col">
					<FileText className="absolute -right-6 -bottom-6 h-32 w-32 text-slate-50 opacity-50" />
					<div className="relative z-10 flex-1">
						<div className="flex justify-between items-center mb-4">
							<p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Deadline Terdekat</p>
							<Clock className="h-4 w-4 text-amber-500" />
						</div>
						{literasiStats.nearestTask ? (
							<>
								<h3 className="text-xl font-bold text-slate-800 leading-tight mb-2">
									{literasiStats.nearestTask.judul}
								</h3>
								<p
									className={`text-sm font-bold flex items-center gap-1.5 ${literasiStats.nearestTask.isTerlambat ? "text-red-600" : "text-amber-600"}`}
								>
									<AlertTriangle className="h-4 w-4" />
									{literasiStats.nearestTask.isTerlambat
										? "Tugas Terlambat!"
										: `${literasiStats.nearestTask.sisaHari} Hari Lagi`}
								</p>
							</>
						) : (
							<div className="flex flex-col justify-center h-full">
								<h3 className="text-slate-400 font-semibold italic">Tidak ada tenggat waktu.</h3>
							</div>
						)}
					</div>
				</div>

				{/* Card 2: Tugas Literasi Selesai */}
				<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
					<div className="flex justify-between items-center mb-2">
						<p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tugas Literasi Selesai</p>
						<CheckCircle2 className="h-5 w-5 text-teal-600" />
					</div>
					<div>
						<div className="flex items-baseline gap-2 mb-2">
							<span className="text-5xl font-black text-slate-900">{literasiStats.completed}</span>
							<span className="text-lg font-bold text-slate-400">/ {literasiStats.total}</span>
						</div>
						<p className="text-sm font-semibold text-slate-500 mb-3">Tugas Selesai</p>

						{/* Progress Bar */}
						<div className="w-full bg-slate-100 rounded-full h-2.5">
							<div
								className="bg-teal-600 h-2.5 rounded-full transition-all duration-1000"
								style={{
									width: `${literasiStats.total > 0 ? (literasiStats.completed / literasiStats.total) * 100 : 0}%`,
								}}
							></div>
						</div>
					</div>
				</div>

				{/* Card 3: Rata-Rata Numerasi */}
				<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
					<div className="flex justify-between items-center mb-2">
						<p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rata-Rata Numerasi</p>
						{isAvgGood ? (
							<TrendingUp className="h-5 w-5 text-slate-900" />
						) : (
							<TrendingDown className="h-5 w-5 text-red-500" />
						)}
					</div>
					<div>
						<span className={`text-5xl font-black ${isAvgGood ? "text-slate-900" : "text-red-600"}`}>
							{numerasiStats.average}
						</span>
						<p
							className={`text-sm font-semibold mt-3 flex items-center gap-1 ${isAvgGood ? "text-teal-600" : "text-red-500"}`}
						>
							{isAvgGood ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
							Status Nilai {isAvgGood ? "Sangat Baik" : "Kurang"}
						</p>
					</div>
				</div>
			</div>

			{/* MIDDLE SECTION */}
			<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
				{/* CHART NUMERASI (3 Kolom) */}
				<div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
					<div className="flex justify-between items-center mb-6">
						<h3 className="font-bold text-slate-900 text-lg">Tren Nilai Numerasi</h3>
						<span className="bg-white border border-teal-600 text-teal-700 text-xs font-bold px-3 py-1 rounded-md">
							Semester Ini
						</span>
					</div>
					<div className="h-[250px] w-full">
						{numerasiStats.trendData.length === 0 ? (
							<div className="w-full h-full flex items-center justify-center text-slate-400 font-semibold italic">
								Belum ada data nilai numerasi.
							</div>
						) : (
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={numerasiStats.trendData}>
									<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
									<XAxis
										dataKey="name"
										axisLine={false}
										tickLine={false}
										tick={{ fill: "#64748b", fontSize: 12 }}
										dy={10}
									/>
									<YAxis
										domain={[0, 100]}
										axisLine={false}
										tickLine={false}
										tick={{ fill: "#64748b", fontSize: 12 }}
										dx={-10}
									/>
									<RechartsTooltip
										contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
									/>
									<Line
										type="monotone"
										dataKey="score"
										stroke="#0d9488"
										strokeWidth={4}
										dot={{ r: 6, fill: "#0d9488", strokeWidth: 2, stroke: "#fff" }}
										activeDot={{ r: 8 }}
									/>
								</LineChart>
							</ResponsiveContainer>
						)}
					</div>
				</div>

				{/* DAFTAR LITERASI (2 Kolom) */}
				<div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
					<div className="p-6 border-b border-slate-100">
						<h3 className="font-bold text-slate-900 text-lg leading-tight">Daftar Tugas Literasi Berjalan</h3>
					</div>
					<div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[250px]">
						{ongoingLiterasi.length === 0 ? (
							<div className="h-full flex items-center justify-center text-slate-400 font-semibold italic p-4">
								Semua tugas literasi telah diselesaikan!
							</div>
						) : (
							ongoingLiterasi.map((t: any) => (
								<div
									key={t.id}
									className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-teal-200 transition-colors"
								>
									<div className="flex items-center gap-4">
										<div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
											{t.sisaHari % 2 === 0 ? (
												<BookOpen className="h-5 w-5 text-teal-700" />
											) : (
												<PenTool className="h-5 w-5 text-teal-700" />
											)}
										</div>
										<div>
											<h4 className="text-sm font-bold text-slate-800 leading-snug">{t.judul}</h4>
											<p className="text-xs text-slate-500 mt-0.5">{t.topik}</p>
										</div>
									</div>
									<span
										className={`text-xs font-bold px-2.5 py-1 rounded-md shrink-0 ${t.isTerlambat ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}
									>
										{t.isTerlambat ? "Terlambat" : `${t.sisaHari} Hari`}
									</span>
								</div>
							))
						)}
					</div>
				</div>
			</div>

			{/* BOTTOM SECTION: TABEL NUMERASI */}
			<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
				<div className="p-6 border-b border-slate-100 flex justify-between items-center">
					<h3 className="font-bold text-slate-900 text-lg">Detail Nilai Numerasi</h3>
					<Link
						href="/siswa/numerasi"
						className="text-sm font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1"
					>
						Lihat Semua <ArrowRight className="h-4 w-4" />
					</Link>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-sm text-left">
						<thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-xs tracking-wider">
							<tr>
								<th className="py-4 px-6">Nama Asesmen</th>
								<th className="py-4 px-6 text-center">Tanggal Tes</th>
								<th className="py-4 px-6 text-center">Status</th>
								<th className="py-4 px-6 text-right">Nilai Akhir</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{detailNumerasi.length === 0 ? (
								<tr>
									<td colSpan={4} className="py-8 text-center text-slate-500 italic">
										Belum ada asesmen numerasi yang dijadwalkan.
									</td>
								</tr>
							) : (
								detailNumerasi.slice(0, 5).map((n: any, idx: number) => {
									const isSelesai = n.status === "Selesai";
									const scoreColor =
										isSelesai && Number(n.nilai) >= 70
											? "text-teal-600"
											: isSelesai
												? "text-red-500"
												: "text-slate-400";

									// Warna strip pinggir bergiliran sesuai gambar referensi
									const borderColors = [
										"border-l-slate-900",
										"border-l-teal-600",
										"border-l-amber-400",
										"border-l-blue-500",
										"border-l-purple-500",
									];
									const borderColor = borderColors[idx % borderColors.length];

									return (
										<tr key={n.id} className="hover:bg-slate-50 transition-colors">
											<td className="py-4 px-6 font-bold text-slate-800">
												<div className={`pl-3 border-l-4 ${borderColor}`}>{n.namaAsesmen}</div>
											</td>
											<td className="py-4 px-6 text-center text-slate-500 font-medium">{n.tanggal}</td>
											<td className="py-4 px-6 text-center">
												<span
													className={`text-xs font-bold px-2.5 py-1 rounded-md ${isSelesai ? "bg-slate-100 text-slate-700" : "bg-amber-50 text-amber-600"}`}
												>
													{n.status}
												</span>
											</td>
											<td className={`py-4 px-6 text-right font-black text-base ${scoreColor}`}>{n.nilai}</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
