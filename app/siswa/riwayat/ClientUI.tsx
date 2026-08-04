// app/siswa/riwayat/ClientUI.tsx
"use client";

import { useRouter } from "next/navigation";
import { Calendar, BookOpen, Calculator, Eye, CheckCircle2, XCircle, FileText, AlertCircle } from "lucide-react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as RechartsTooltip,
	ResponsiveContainer,
} from "recharts";

export default function RiwayatSiswaUI({
	isEmpty,
	listTa,
	activeTaId,
	semesterName,
	studentName,
	kelasNama,
	literasiStats,
	numerasiStats,
	chartData,
	literasiList,
	numerasiList,
}: any) {
	const router = useRouter();

	// Fungsi untuk membuka PDF di tab/jendela baru
	const openPdf = (base64Url: string) => {
		if (!base64Url) return;
		const pdfWindow = window.open("");
		if (pdfWindow)
			pdfWindow.document.write(
				`<iframe width='100%' height='100%' style='border:none; margin:0; padding:0;' src='${base64Url}'></iframe>`,
			);
	};

	if (isEmpty) {
		return (
			<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
				<div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
					<div>
						<h1 className="text-3xl font-black text-slate-900 tracking-tight">Riwayat LiNO</h1>
						<div className="flex items-center gap-3 mt-3">
							<span className="text-sm font-semibold text-slate-500 flex items-center gap-1.5">
								<Calendar className="h-4 w-4" /> Tahun Ajaran:
							</span>
							<select
								value={activeTaId}
								onChange={(e) => router.push(`/siswa/riwayat?ta=${e.target.value}`)}
								className="bg-white border border-slate-300 text-slate-700 text-sm font-bold px-3 py-1.5 rounded-lg outline-none cursor-pointer hover:border-teal-500 transition-colors"
							>
								{listTa.map((ta: any) => (
									<option key={ta.id} value={ta.id}>
										{ta.nama}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				<div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm flex flex-col items-center">
					<AlertCircle className="h-16 w-16 text-slate-300 mb-4" />
					<h3 className="text-lg font-bold text-slate-800 mb-2">Tidak Ada Riwayat</h3>
					<p className="text-slate-500 font-medium">
						Anda tidak memiliki catatan kelas pada Tahun Ajaran{" "}
						<strong className="text-slate-700">{semesterName}</strong>.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
			{/* HEADER & TA FILTER */}
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
				<div>
					<h1 className="text-3xl font-black text-slate-900 tracking-tight">Riwayat LiNO</h1>
					<p className="text-slate-500 font-medium mt-1">
						Arsip capaian Literasi dan Numerasi Anda di Kelas <strong className="text-slate-800">{kelasNama}</strong>.
					</p>
				</div>
				<div className="flex items-center gap-2 bg-white p-1.5 border border-slate-200 rounded-xl shadow-sm">
					<div className="bg-slate-100 p-2 rounded-lg">
						<Calendar className="h-4 w-4 text-slate-500" />
					</div>
					<select
						value={activeTaId}
						onChange={(e) => router.push(`/siswa/riwayat?ta=${e.target.value}`)}
						className="bg-transparent border-none text-slate-800 text-sm font-bold px-2 py-1 pr-6 outline-none cursor-pointer"
					>
						{listTa.map((ta: any) => (
							<option key={ta.id} value={ta.id}>
								{ta.nama}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* TOP CARDS (LITERASI & NUMERASI) */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center relative overflow-hidden">
					<div className="absolute -right-4 -bottom-4 opacity-5">
						<BookOpen className="h-32 w-32" />
					</div>
					<div className="relative z-10">
						<p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
							<CheckCircle2 className="h-4 w-4 text-teal-600" /> Pengumpulan Literasi
						</p>
						<div className="flex items-baseline gap-2">
							<span className="text-5xl font-black text-slate-900">{literasiStats.completed}</span>
							<span className="text-lg font-bold text-slate-400">/ {literasiStats.total} Tugas</span>
						</div>
					</div>
				</div>

				<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center relative overflow-hidden">
					<div className="absolute -right-4 -bottom-4 opacity-5">
						<Calculator className="h-32 w-32" />
					</div>
					<div className="relative z-10">
						<p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
							<FileText className="h-4 w-4 text-blue-600" /> Rata-Rata Numerasi
						</p>
						<div className="flex items-baseline gap-2">
							<span className="text-5xl font-black text-slate-900">{numerasiStats.average}</span>
							<span className="text-sm font-semibold text-slate-500">({numerasiStats.total} Asesmen)</span>
						</div>
					</div>
				</div>
			</div>

			{/* CHART NUMERASI */}
			<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
				<h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center gap-2">
					<Calculator className="h-5 w-5 text-blue-600" /> Grafik Tren Numerasi
				</h3>
				<div className="h-[250px] w-full">
					{chartData.length === 0 ? (
						<div className="w-full h-full flex items-center justify-center text-slate-400 font-medium italic">
							Belum ada data numerasi.
						</div>
					) : (
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
								<defs>
									<linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
										<stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
									</linearGradient>
								</defs>
								<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
								<XAxis
									dataKey="name"
									axisLine={false}
									tickLine={false}
									tick={{ fill: "#64748b", fontSize: 12 }}
									dy={10}
								/>
								<YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
								<RechartsTooltip
									contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
								/>
								<Area
									type="monotone"
									dataKey="score"
									stroke="#3b82f6"
									strokeWidth={3}
									fillOpacity={1}
									fill="url(#colorScore)"
									activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
								/>
							</AreaChart>
						</ResponsiveContainer>
					)}
				</div>
			</div>

			{/* TWO TABLES SECTION */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* TABEL LITERASI */}
				<div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
					<div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
						<BookOpen className="h-5 w-5 text-teal-600" />
						<h3 className="font-bold text-slate-900 text-lg">Riwayat Literasi</h3>
					</div>
					<div className="overflow-x-auto max-h-[400px] overflow-y-auto">
						<table className="w-full text-sm text-left">
							<thead className="bg-white text-slate-500 font-bold border-b border-slate-200 text-xs tracking-wider sticky top-0 z-10 shadow-sm">
								<tr>
									<th className="py-3 px-5">Nama Tugas</th>
									<th className="py-3 px-5 text-center">Status</th>
									<th className="py-3 px-5 text-right">File PDF</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100">
								{literasiList.length === 0 ? (
									<tr>
										<td colSpan={3} className="py-6 text-center text-slate-400 italic">
											Tidak ada tugas literasi.
										</td>
									</tr>
								) : (
									literasiList.map((t: any) => (
										<tr key={t.id} className="hover:bg-slate-50">
											<td className="py-3 px-5 font-bold text-slate-800">{t.judul}</td>
											<td className="py-3 px-5 text-center">
												<span
													className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${t.status === "Selesai" ? "bg-teal-50 text-teal-600" : "bg-slate-100 text-slate-500"}`}
												>
													{t.status === "Selesai" ? (
														<CheckCircle2 className="h-3 w-3" />
													) : (
														<XCircle className="h-3 w-3" />
													)}{" "}
													{t.status}
												</span>
											</td>
											<td className="py-3 px-5 text-right">
												{t.pdf ? (
													<button
														onClick={() => openPdf(t.pdf)}
														className="p-2 bg-white border border-slate-200 text-slate-600 hover:text-teal-600 hover:border-teal-200 hover:bg-teal-50 rounded-lg transition-colors ml-auto flex items-center justify-center"
														title="Lihat Dokumen"
													>
														<Eye className="h-4 w-4" />
													</button>
												) : (
													<span className="text-slate-300">-</span>
												)}
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* TABEL NUMERASI */}
				<div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
					<div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
						<Calculator className="h-5 w-5 text-blue-600" />
						<h3 className="font-bold text-slate-900 text-lg">Riwayat Nilai Numerasi</h3>
					</div>
					<div className="overflow-x-auto max-h-[400px] overflow-y-auto">
						<table className="w-full text-sm text-left">
							<thead className="bg-white text-slate-500 font-bold border-b border-slate-200 text-xs tracking-wider sticky top-0 z-10 shadow-sm">
								<tr>
									<th className="py-3 px-5">Nama Asesmen</th>
									<th className="py-3 px-5 text-center">Tanggal</th>
									<th className="py-3 px-5 text-right">Nilai Akhir</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100">
								{numerasiList.length === 0 ? (
									<tr>
										<td colSpan={3} className="py-6 text-center text-slate-400 italic">
											Tidak ada tugas numerasi.
										</td>
									</tr>
								) : (
									numerasiList.map((t: any) => (
										<tr key={t.id} className="hover:bg-slate-50">
											<td className="py-3 px-5 font-bold text-slate-800">{t.judul}</td>
											<td className="py-3 px-5 text-center text-slate-500 text-xs font-medium">{t.tanggal}</td>
											<td className="py-3 px-5 text-right">
												{t.nilai !== "-" ? (
													<span
														className={`text-base font-black ${Number(t.nilai) >= 70 ? "text-teal-600" : "text-red-500"}`}
													>
														{t.nilai}
													</span>
												) : (
													<span className="text-slate-300 font-bold">-</span>
												)}
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
