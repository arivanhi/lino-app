// components/NumerasiDetailUI.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, X, Calculator, CheckCircle, ClipboardList } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

const KopSurat = () => (
	<div style={{ marginBottom: "20px", backgroundColor: "white" }}>
		<div
			style={{
				display: "flex",
				alignItems: "center",
				borderBottom: "3px solid black",
				paddingBottom: "8px",
				marginBottom: "2px",
			}}
		>
			<img
				src="/logo_sekolah.jpg"
				onError={(e) => (e.currentTarget.src = "/logo.jpeg")}
				style={{ width: "80px", height: "80px", objectFit: "contain", margin: "0 10px" }}
			/>
			<div style={{ flex: 1, textAlign: "center" }}>
				<h2
					style={{
						fontFamily: '"Times New Roman", Times, serif',
						fontSize: "22px",
						fontWeight: "bold",
						margin: "0 0 4px 0",
						letterSpacing: "1px",
						color: "#000",
					}}
				>
					SMA NEGERI 2 BREBES
				</h2>
				<p style={{ fontFamily: "Arial, sans-serif", fontSize: "11pt", margin: "0 0 2px 0", color: "#000" }}>
					Jl. Jend. A. Yani 77 Brebes 52212 Telp. (0283) 671060
				</p>
				<p style={{ fontFamily: "Arial, sans-serif", fontSize: "11pt", margin: 0, color: "#000" }}>
					Website: www.sman2-brebes.sch.id - Email: smadabes@ymail.com
				</p>
			</div>
			<div style={{ width: "100px" }}></div>
		</div>
		<div style={{ borderBottom: "1px solid black" }}></div>
	</div>
);

export default function NumerasiDetailUI({
	kelasNama,
	waliKelas,
	semesterName,
	tasks,
	students,
	avgKelas,
	backUrl,
}: any) {
	const router = useRouter();
	const [isExportModalOpen, setIsExportModalOpen] = useState(false);
	const [jangkaWaktu, setJangkaWaktu] = useState("SEMESTER");
	const [isDownloading, setIsDownloading] = useState(false);

	// Kalkulasi Tingkat Kelulusan (Nilai rata-rata siswa >= 70)
	const lulusCount = students.filter((s: any) => s.average !== "-" && Number(s.average) >= 70).length;
	const pctLulus = students.length > 0 ? Math.round((lulusCount / students.length) * 100) : 0;

	// Persiapkan Data Grafik: Rata-rata per Tugas
	const chartData = tasks.map((t: any, idx: number) => {
		let sum = 0;
		let count = 0;
		students.forEach((s: any) => {
			if (s.scores[t.id] !== null) {
				sum += s.scores[t.id];
				count++;
			}
		});
		const avg = count > 0 ? sum / count : 0;
		return {
			name: t.judul.includes("Numerasi") ? t.judul.replace("Numerasi", "Num") : `Tugas ${idx + 1}`,
			score: Math.round(avg),
		};
	});

	const handleDownload = async () => {
		setIsDownloading(true);
		const html2pdf = (await import("html2pdf.js")).default;
		const element = document.getElementById("pdf-numerasi-detail");

		const opt = {
			margin: 0,
			filename: `Detail_Numerasi_${kelasNama}_${semesterName.replace(/\s/g, "_")}.pdf`,
			image: { type: "jpeg", quality: 1 },
			html2canvas: { scale: 2, useCORS: true },
			jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
			pagebreak: { mode: ["css", "legacy"] },
		};

		html2pdf()
			.set(opt)
			.from(element)
			.save()
			.then(() => {
				setIsDownloading(false);
				setIsExportModalOpen(false);
			});
	};

	const teksPeriode =
		jangkaWaktu === "SEMESTER"
			? `Semester ${semesterName}`
			: jangkaWaktu === "1 BULAN"
				? "1 Bulan Terakhir"
				: "2 Bulan Terakhir";

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 relative">
			<div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
				<div className="flex items-start gap-4">
					{backUrl && (
						<button
							onClick={() => router.push(backUrl)}
							className="mt-1 p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 shadow-sm"
						>
							<ArrowLeft className="h-5 w-5" />
						</button>
					)}
					<div>
						<h1 className="text-3xl font-bold text-slate-900">Detail Analitik Numerasi - Kelas {kelasNama}</h1>
						<p className="text-sm font-semibold text-slate-500 mt-1">Tinjauan komprehensif kinerja numerasi siswa.</p>
					</div>
				</div>
				<button
					onClick={() => setIsExportModalOpen(true)}
					className="px-4 py-2.5 bg-white border border-slate-300 text-slate-800 text-sm font-bold rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2 h-fit"
				>
					<Download className="h-4 w-4" /> Export Data Kelas
				</button>
			</div>

			{/* STATS CARDS */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white p-6 rounded-2xl border-l-4 border-l-teal-400 border-y border-r border-slate-200 shadow-sm relative overflow-hidden">
					<p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Rata-Rata Kelas</p>
					<p className="text-4xl font-black text-slate-900">{avgKelas}</p>
					<div className="absolute right-4 top-4 bg-teal-50 p-2 rounded-full">
						<Calculator className="h-5 w-5 text-teal-600" />
					</div>
				</div>
				<div className="bg-white p-6 rounded-2xl border-l-4 border-l-blue-400 border-y border-r border-slate-200 shadow-sm relative overflow-hidden">
					<p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Tingkat Kelulusan</p>
					<p className="text-4xl font-black text-slate-900">{pctLulus}%</p>
					<p className="text-xs font-medium text-slate-500 mt-2">
						{lulusCount} dari {students.length} Siswa Lulus
					</p>
					<div className="absolute right-4 top-4 bg-blue-50 p-2 rounded-full">
						<CheckCircle className="h-5 w-5 text-blue-600" />
					</div>
				</div>
				<div className="bg-white p-6 rounded-2xl border-l-4 border-l-slate-800 border-y border-r border-slate-200 shadow-sm relative overflow-hidden">
					<p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">Jumlah Tugas</p>
					<p className="text-4xl font-black text-slate-900">{tasks.length}</p>
					<p className="text-xs font-medium text-slate-500 mt-2">Semester {semesterName}</p>
					<div className="absolute right-4 top-4 bg-slate-100 p-2 rounded-full">
						<ClipboardList className="h-5 w-5 text-slate-600" />
					</div>
				</div>
			</div>

			{/* CHART DITENGAH */}
			<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
				<h3 className="font-bold text-slate-900 text-lg mb-6">Tren Nilai Numerasi</h3>
				<div className="h-[250px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={chartData} barSize={40}>
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
							<RechartsTooltip cursor={{ fill: "#f1f5f9" }} contentStyle={{ borderRadius: "8px" }} />
							<Bar dataKey="score" fill="#7dd3fc" radius={[4, 4, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* TABLE DIBAWAH */}
			<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
				<div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
					<h3 className="font-bold text-slate-900 text-lg">Data Nilai Siswa</h3>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-sm text-left border-collapse">
						<thead className="bg-white text-slate-500 font-bold border-b border-slate-200 text-xs tracking-wider uppercase">
							<tr>
								<th className="py-4 px-5">No</th>
								<th className="py-4 px-5">Nama Siswa</th>
								<th className="py-4 px-5">NIS</th>
								{tasks.map((t: any) => (
									<th key={t.id} className="py-4 px-5 text-center">
										{t.judul}
									</th>
								))}
								<th className="py-4 px-5 text-center">Rata-rata</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{students.map((s: any, idx: number) => (
								<tr key={s.siswaId} className="hover:bg-slate-50">
									<td className="py-4 px-5 text-slate-500">{idx + 1}</td>
									<td className="py-4 px-5 font-bold text-slate-800">{s.nama}</td>
									<td className="py-4 px-5 text-slate-500">{s.nis}</td>
									{tasks.map((t: any) => {
										const val = s.scores[t.id];
										return (
											<td key={t.id} className="py-4 px-5 text-center font-semibold text-slate-700">
												{val !== null ? val : "-"}
											</td>
										);
									})}
									<td
										className={`py-4 px-5 text-center font-black ${s.average !== "-" && Number(s.average) >= 70 ? "text-teal-600" : s.average !== "-" ? "text-red-500" : "text-slate-900"}`}
									>
										{s.average}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* MODAL EXPORT PDF */}
			{isExportModalOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
							<h2 className="text-lg font-bold text-slate-800 border-l-4 border-teal-600 pl-2">Export Data Kelas</h2>
							<button onClick={() => setIsExportModalOpen(false)} className="text-slate-400 hover:text-slate-600">
								<X className="h-5 w-5" />
							</button>
						</div>
						<div className="p-6 space-y-4">
							<div>
								<label className="block text-xs font-bold text-slate-700 mb-1">Jangka Waktu</label>
								<select
									value={jangkaWaktu}
									onChange={(e) => setJangkaWaktu(e.target.value)}
									className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none text-slate-900 bg-white"
								>
									<option value="1 BULAN">1 Bulan Terakhir</option>
									<option value="2 BULAN">2 Bulan Terakhir</option>
									<option value="SEMESTER">Satu Semester (Penuh)</option>
								</select>
							</div>
							<button
								onClick={handleDownload}
								disabled={isDownloading}
								className="w-full mt-2 px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 flex justify-center items-center gap-2"
							>
								{isDownloading ? "Memproses PDF..." : "Generate PDF"}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* HIDDEN PDF TEMPLATE (LANDSCAPE) */}
			<div style={{ position: "fixed", top: 0, left: 0, zIndex: -9999, opacity: 0, pointerEvents: "none" }}>
				<div
					id="pdf-numerasi-detail"
					style={{ width: "297mm", backgroundColor: "white", color: "black", boxSizing: "border-box" }}
				>
					{/* Cover */}
					<div
						style={{
							height: "170mm",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							textAlign: "center",
							padding: "40px",
						}}
					>
						<img
							src="/logo_sekolah.jpg"
							onError={(e) => (e.currentTarget.src = "/logo.jpeg")}
							style={{ width: "120px", height: "120px", marginBottom: "24px", objectFit: "contain" }}
						/>
						<h1 style={{ fontSize: "32px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "8px" }}>
							LAPORAN NUMERASI KELAS
						</h1>
						<h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#0f172a" }}>Kelas {kelasNama}</h2>
						<div style={{ width: "50px", height: "4px", backgroundColor: "#0f172a", margin: "24px auto" }}></div>
						<p style={{ fontSize: "18px", fontWeight: "600" }}>{teksPeriode}</p>
						<p style={{ fontSize: "16px", marginTop: "8px" }}>Wali Kelas: {waliKelas}</p>
						<p style={{ fontSize: "14px", marginTop: "auto", fontWeight: "bold" }}>SMA NEGERI 2 BREBES</p>
					</div>

					{/* Halaman 2: Grafik & Ringkasan */}
					<div className="html2pdf__page-break"></div>
					<div style={{ padding: "0 20mm 15mm 20mm" }}>
						<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
							<thead style={{ display: "table-header-group" }}>
								<tr>
									<td style={{ paddingTop: "20px" }}>
										<KopSurat />
									</td>
								</tr>
								<tr>
									<td style={{ textAlign: "center", padding: "10px 0" }}>
										<h3 style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}>
											Grafik Tren Numerasi ({teksPeriode})
										</h3>
									</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px" }}>
											<BarChart width={800} height={350} data={chartData}>
												<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
												<XAxis
													dataKey="name"
													axisLine={false}
													tickLine={false}
													tick={{ fill: "#475569", fontSize: 12 }}
													dy={10}
												/>
												<YAxis
													domain={[0, 100]}
													axisLine={false}
													tickLine={false}
													tick={{ fill: "#475569", fontSize: 12 }}
													dx={-10}
												/>
												{/* IsAnimationActive false sangat penting untuk PDF */}
												<Bar dataKey="score" fill="#7dd3fc" radius={[4, 4, 0, 0]} isAnimationActive={false} />
											</BarChart>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					{/* Halaman 3+: Tabel Detail */}
					<div className="html2pdf__page-break"></div>
					<div style={{ padding: "0 20mm 15mm 20mm" }}>
						<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
							<thead style={{ display: "table-header-group" }}>
								<tr>
									<td colSpan={tasks.length + 3} style={{ paddingTop: "20px" }}>
										<KopSurat />
									</td>
								</tr>
								<tr>
									<td colSpan={tasks.length + 3} style={{ textAlign: "center", padding: "10px 0 20px 0" }}>
										<h3 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>Data Detail Nilai Siswa</h3>
									</td>
								</tr>
								<tr style={{ backgroundColor: "#f1f5f9" }}>
									<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "left" }}>Nama Siswa</th>
									<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "left" }}>NIS</th>
									{tasks.map((h: any) => (
										<th key={h.id} style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center" }}>
											{h.judul}
										</th>
									))}
									<th
										style={{
											border: "1px solid #cbd5e1",
											padding: "8px",
											textAlign: "center",
											backgroundColor: "#e2e8f0",
										}}
									>
										Rata-Rata
									</th>
								</tr>
							</thead>
							<tbody>
								{students.map((s: any) => (
									<tr key={s.siswaId}>
										<td style={{ border: "1px solid #cbd5e1", padding: "8px", fontWeight: "bold" }}>{s.nama}</td>
										<td style={{ border: "1px solid #cbd5e1", padding: "8px" }}>{s.nis}</td>
										{tasks.map((h: any) => (
											<td
												key={h.id}
												style={{
													border: "1px solid #cbd5e1",
													padding: "8px",
													textAlign: "center",
													color: s.scores[h.id] !== null && s.scores[h.id] < 50 ? "red" : "black",
												}}
											>
												{s.scores[h.id] !== null ? s.scores[h.id] : "-"}
											</td>
										))}
										<td
											style={{
												border: "1px solid #cbd5e1",
												padding: "8px",
												textAlign: "center",
												fontWeight: "bold",
												backgroundColor: "#f8fafc",
											}}
										>
											{s.average}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
