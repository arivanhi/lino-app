// components/NumerasiDetailUI.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, X, Calculator, CheckCircle, ClipboardList, Search, BookOpen, Eye } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

// ============================================================================
// KOMPONEN KOP SURAT
// ============================================================================
const KopSurat = () => (
	<div style={{ marginBottom: "20px", backgroundColor: "white", pageBreakInside: "avoid" }}>
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
					Website: sman2brebes.sch.id - Email: smandabes@gmail.com
				</p>
			</div>
			<div style={{ width: "100px" }}></div>
		</div>
		<div style={{ borderBottom: "1px solid black" }}></div>
	</div>
);

// ============================================================================
// KOMPONEN PEMBANTU PAGINATION MANUAL (PDF)
// ============================================================================
const chunkArray = <T,>(arr: T[], size: number): T[][] => {
	const chunked = [];
	for (let i = 0; i < arr.length; i += size) {
		chunked.push(arr.slice(i, i + size));
	}
	return chunked;
};

const PageContainer = ({
	children,
	orientation = "portrait",
	isLast
}: {
	children: React.ReactNode;
	orientation?: "portrait" | "landscape";
	isLast?: boolean;
}) => {
	const isPortrait = orientation === "portrait";
	const width = isPortrait ? "210mm" : "297mm"; // A4 Landscape width
	const height = isPortrait ? "296mm" : "208mm"; // A4 Landscape height (dikurangi 2mm untuk toleransi margin)

	return (
		<div
			style={{
				width,
				height,
				backgroundColor: "white",
				color: "black",
				boxSizing: "border-box",
				padding: "10mm 15mm",
				position: "relative",
				display: "flex",
				flexDirection: "column",
				pageBreakAfter: isLast ? "auto" : "always",
				overflow: "hidden"
			}}
		>
			{children}
		</div>
	);
};

const PageFooter = ({ current, total }: { current: number; total: number }) => (
	<div
		style={{
			marginTop: "auto",
			paddingTop: "10px",
			borderTop: "1px solid #e2e8f0",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			fontSize: "9pt",
			color: "#64748b",
		}}
	>
		<span>Dicetak dari Sistem Lino - SMA Negeri 2 Brebes</span>
		<span>
			Halaman {current} dari {total}
		</span>
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

	// STATE TANGGAL (DATE PICKER)
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [isDownloading, setIsDownloading] = useState(false);

	const [search, setSearch] = useState("");

	const [selectedNumHistory, setSelectedNumHistory] = useState<any[] | null>(null);
	const [studentNameModal, setStudentNameModal] = useState("");

	// Sorting Nama Siswa Abjad (A-Z)
	const sortedStudents = useMemo(() => {
		return [...students].sort((a: any, b: any) => a.nama.localeCompare(b.nama));
	}, [students]);

	const filteredStudents = sortedStudents.filter(
		(s: any) => s.nama.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search),
	);

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
		if (!startDate || !endDate) {
			alert("Silakan pilih Tanggal Mulai dan Tanggal Selesai terlebih dahulu.");
			return;
		}
		setIsDownloading(true);
		setTimeout(async () => {
			try {
				const html2pdf = (await import("html2pdf.js")).default;
				const element = document.getElementById("pdf-numerasi-detail");

				const opt = {
					margin: 0, // KUNCI: Margin 0 agar mengikuti PageContainer
					filename: `Detail_Numerasi_${kelasNama}_${semesterName.replace(/\s/g, "_")}.pdf`,
					image: { type: "jpeg", quality: 1 },
					html2canvas: { scale: 2, useCORS: true },
					jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }, // Landscape
					pagebreak: { mode: ["css"] },
				};

				await html2pdf().set(opt).from(element).save();
			} catch (error) {
				console.error("PDF Export error:", error);
				alert("Terjadi kesalahan saat memproses PDF.");
			} finally {
				setIsDownloading(false);
				setIsExportModalOpen(false);
			}
		}, 500);
	};

	const formatD = (dStr: string) => new Date(dStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
	const teksPeriode = (!startDate || !endDate) ? `Semester ${semesterName}` : `Periode: ${formatD(startDate)} s.d. ${formatD(endDate)}`;

	// ============================================================================
	// PAGINATION PDF: MAKSIMAL 10 BARIS DATA AGAR TIDAK MENGGANGGU HEADER TABEL
	// ============================================================================
	const PDF_MAX_ROWS = 10;
	const tasksChunks = chunkArray(tasks, PDF_MAX_ROWS);
	if (tasksChunks.length === 0) tasksChunks.push([]);

	const studentsChunks = chunkArray(sortedStudents, PDF_MAX_ROWS);
	if (studentsChunks.length === 0) studentsChunks.push([]);

	const pdfTotalPages = 1 + tasksChunks.length + studentsChunks.length;
	let pageCounter = 1;

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

			{/* TABLE SISWA WEB UI */}
			<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col mt-8">
				<div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 bg-slate-50">
					<h3 className="font-bold text-slate-900 text-lg">Data Detail Siswa</h3>
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
						<input
							type="text"
							placeholder="Cari siswa..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							// PERBAIKAN: Text color dipertegas
							className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm w-full sm:w-64 outline-none focus:border-slate-500 text-slate-900 placeholder:text-slate-400"
						/>
					</div>
				</div>

				{/* PERBAIKAN: Pembatasan tinggi tabel agar muat ~10 baris visual + fitur Scroll Vertikal */}
				<div className="overflow-x-auto overflow-y-auto max-h-[500px] custom-scrollbar">
					<table className="w-full text-sm text-left border-collapse">
						<thead className="bg-white text-slate-500 font-bold border-b border-slate-200 text-xs tracking-wider uppercase sticky top-0 z-10 shadow-sm">
							<tr>
								<th className="py-4 px-5 text-center">No</th>
								<th className="py-4 px-5">Nama Siswa</th>
								<th className="py-4 px-5">NIS</th>
								{tasks.map((t: any) => (
									<th key={t.id} className="py-4 px-5 text-center">
										{t.judul}
									</th>
								))}
								<th className="py-4 px-5 text-center">Rata-rata</th>
								<th className="py-4 px-5 text-center">Aksi</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{filteredStudents.length === 0 ? (
								<tr>
									<td colSpan={10} className="p-6 text-center text-slate-500">Tidak ada data siswa ditemukan.</td>
								</tr>
							) : (
								filteredStudents.map((s: any, idx: number) => (
									<tr key={s.siswaId} className="hover:bg-slate-50">
										<td className="py-4 px-5 text-center text-slate-500 font-medium">{idx + 1}</td>
										<td className="py-4 px-5 font-bold text-slate-800">{s.nama}</td>
										<td className="py-4 px-5 text-slate-500">{s.nis}</td>
										{tasks.map((t: any) => {
											const val = s.scores[t.id];
											return (
												<td key={t.id} className="py-4 px-5 text-center font-semibold text-slate-700">
													<span className={val !== null && val < 50 ? "text-red-500" : ""}>
														{val !== null ? val : "-"}
													</span>
												</td>
											);
										})}
										<td
											className={`py-4 px-5 text-center font-black ${s.average !== "-" && Number(s.average) >= 70 ? "text-teal-600" : s.average !== "-" ? "text-red-500" : "text-slate-900"}`}
										>
											{s.average}
										</td>
										<td className="py-4 px-5 text-center">
											<button
												onClick={() => {
													setStudentNameModal(s.nama);
													setSelectedNumHistory(s.numHistory);
												}}
												className="text-xs font-bold text-amber-600 hover:text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
											>
												Lihat Tugas
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* --- MODAL LIHAT TUGAS NUMERASI SISWA --- */}
			{selectedNumHistory && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
							<div>
								<h2 className="text-lg font-bold text-slate-900">Riwayat Numerasi</h2>
								<p className="text-xs font-semibold text-slate-500">{studentNameModal}</p>
							</div>
							<button onClick={() => setSelectedNumHistory(null)} className="text-slate-400 hover:text-slate-600">
								<X className="h-5 w-5" />
							</button>
						</div>
						<div className="p-6 max-h-[60vh] overflow-y-auto space-y-3 custom-scrollbar">
							{selectedNumHistory.length === 0 ? (
								<p className="text-sm text-slate-500 italic text-center">Belum ada tugas yang dikerjakan.</p>
							) : (
								selectedNumHistory.map((h: any, i: number) => (
									<div
										key={i}
										className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100"
									>
										<div className="flex items-center gap-3">
											<Calculator className="h-5 w-5 text-slate-400" />
											<div>
												<p className="text-sm font-bold text-slate-800">{h.judul}</p>
												<p
													className={`text-xs font-bold ${h.nilai !== null && h.nilai < 50 ? "text-red-500" : h.nilai !== null ? "text-teal-600" : "text-slate-400"}`}
												>
													Nilai: {h.nilai !== null ? h.nilai : "-"}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-2">
											{h.soalPdf && (
												<button
													onClick={() => {
														const pdfWindow = window.open("");
														if (pdfWindow) pdfWindow.document.write(`<iframe width='100%' height='100%' src='${h.soalPdf}'></iframe>`);
													}}
													className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-amber-50 text-amber-600 tooltip transition-colors"
													title="Lihat Soal"
												>
													<BookOpen className="h-4 w-4" />
												</button>
											)}
											{h.jawabanPdf && (
												<button
													onClick={() => {
														const pdfWindow = window.open("");
														if (pdfWindow) pdfWindow.document.write(`<iframe width='100%' height='100%' src='${h.jawabanPdf}'></iframe>`);
													}}
													className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-amber-50 text-amber-600 tooltip transition-colors"
													title="Lihat Jawaban"
												>
													<Eye className="h-4 w-4" />
												</button>
											)}
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			)}

			{/* MODAL EXPORT PDF DENGAN DATE PICKER */}
			{isExportModalOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
							<h2 className="text-lg font-bold text-slate-800 border-l-4 border-teal-600 pl-2">
								Export Detail Numerasi
							</h2>
							<button onClick={() => setIsExportModalOpen(false)} className="text-slate-400 hover:text-slate-600">
								<X className="h-5 w-5" />
							</button>
						</div>
						<div className="p-6 space-y-4">
							<div>
								<label className="block text-xs font-bold text-slate-700 mb-1">Target Export</label>
								<input
									type="text"
									disabled
									value={`Detail Kelas ${kelasNama}`}
									className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-slate-50 text-slate-500 font-medium"
								/>
							</div>
							{/* DATE PICKER */}
							<div>
								<label className="block text-xs font-bold text-slate-700 mb-1">Tanggal Mulai</label>
								<input
									type="date"
									value={startDate}
									onChange={(e) => setStartDate(e.target.value)}
									className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none text-slate-900 bg-white"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-slate-700 mb-1">Tanggal Selesai</label>
								<input
									type="date"
									value={endDate}
									onChange={(e) => setEndDate(e.target.value)}
									className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none text-slate-900 bg-white"
								/>
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

			{/* HIDDEN PDF TEMPLATE (LANDSCAPE MAX 10 BARIS/HALAMAN) */}
			<div style={{ position: "absolute", top: "-9999px", left: "-9999px", visibility: "hidden" }}>
				<div id="pdf-numerasi-detail" style={{ backgroundColor: "white", width: "297mm" }}>

					{/* Halaman 1: Cover */}
					<PageContainer orientation="landscape" isLast={false}>
						<div
							style={{
								flex: 1,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								textAlign: "center",
							}}
						>
							<img
								src="/logo_sekolah.jpg"
								onError={(e) => (e.currentTarget.src = "/logo.jpeg")}
								style={{ width: "120px", height: "120px", marginBottom: "24px", objectFit: "contain" }}
							/>
							<h1 style={{ fontSize: "32px", fontWeight: "bold", textTransform: "uppercase", marginBottom: "8px" }}>
								LAPORAN DETAIL NUMERASI
							</h1>
							<h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#0f172a" }}>Kelas {kelasNama}</h2>
							<div style={{ width: "50px", height: "4px", backgroundColor: "#0f172a", margin: "24px auto" }}></div>
							<p style={{ fontSize: "18px", fontWeight: "600" }}>{teksPeriode}</p>
							<p style={{ fontSize: "16px", marginTop: "8px" }}>Wali Kelas: {waliKelas}</p>
							<p style={{ fontSize: "14px", marginTop: "60px", fontWeight: "bold" }}>SMA NEGERI 2 BREBES</p>
						</div>
						<PageFooter current={pageCounter++} total={pdfTotalPages} />
					</PageContainer>
					<div className="html2pdf__page-break"></div>

					{/* Halaman 2+: Daftar Tugas */}
					{tasksChunks.map((chunk, chunkIdx) => (
						<div key={`tasks-page-${chunkIdx}`}>
							<PageContainer orientation="landscape" isLast={false}>
								<KopSurat />
								<h3 style={{ fontSize: "16pt", fontWeight: "bold", textTransform: "uppercase", textAlign: "center", marginBottom: "20px" }}>
									Daftar Tugas Numerasi {tasksChunks.length > 1 ? `(Bag. ${chunkIdx + 1})` : ""}
								</h3>
								<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11pt" }}>
									<thead>
										<tr style={{ backgroundColor: "#f1f5f9" }}>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "10%" }}>No</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left", width: "60%" }}>Judul Tugas</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "30%" }}>Diberikan Pada</th>
										</tr>
									</thead>
									<tbody>
										{chunk.length === 0 ? (
											<tr>
												<td colSpan={3} style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", fontStyle: "italic" }}>
													Belum ada tugas.
												</td>
											</tr>
										) : (
											chunk.map((t: any, idx: number) => (
												<tr key={t.id} style={{ pageBreakInside: "avoid" }}>
													<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
														{chunkIdx * PDF_MAX_ROWS + idx + 1}
													</td>
													<td style={{ border: "1px solid #cbd5e1", padding: "10px", fontWeight: "bold" }}>{t.judul}</td>
													<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
														{new Date(t.createdAt).toLocaleDateString("id-ID", {
															day: "numeric", month: "short", year: "numeric",
														})}
													</td>
												</tr>
											))
										)}
									</tbody>
								</table>
								<PageFooter current={pageCounter++} total={pdfTotalPages} />
							</PageContainer>
							<div className="html2pdf__page-break"></div>
						</div>
					))}

					{/* Halaman 3+: Daftar Nilai Siswa */}
					{studentsChunks.map((chunk, chunkIdx) => {
						const isVeryLastPage = chunkIdx === studentsChunks.length - 1;
						return (
							<div key={`students-page-${chunkIdx}`}>
								<PageContainer orientation="landscape" isLast={isVeryLastPage}>
									<KopSurat />
									<h3 style={{ fontSize: "16pt", fontWeight: "bold", textTransform: "uppercase", textAlign: "center", marginBottom: "20px" }}>
										Rincian Nilai Siswa {studentsChunks.length > 1 ? `(Bag. ${chunkIdx + 1})` : ""}
									</h3>
									<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11pt" }}>
										<thead>
											<tr style={{ backgroundColor: "#f1f5f9" }}>
												<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center", width: "5%" }}>No</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "left", width: "35%" }}>Nama Siswa</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "left", width: "15%" }}>NIS</th>
												{tasks.map((t: any) => (
													<th key={t.id} style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center" }}>
														{t.judul}
													</th>
												))}
												<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center", backgroundColor: "#e2e8f0" }}>
													Rata-rata
												</th>
											</tr>
										</thead>
										<tbody>
											{chunk.map((s: any, idx: number) => (
												<tr key={s.siswaId} style={{ pageBreakInside: "avoid" }}>
													<td style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center" }}>
														{chunkIdx * PDF_MAX_ROWS + idx + 1}
													</td>
													<td style={{ border: "1px solid #cbd5e1", padding: "8px", fontWeight: "bold" }}>{s.nama}</td>
													<td style={{ border: "1px solid #cbd5e1", padding: "8px" }}>{s.nis}</td>
													{tasks.map((t: any) => {
														const val = s.scores[t.id];
														return (
															<td
																key={t.id}
																style={{
																	border: "1px solid #cbd5e1",
																	padding: "8px",
																	textAlign: "center",
																	color: val !== null && val < 50 ? "red" : "black",
																	fontWeight: val !== null && val < 50 ? "bold" : "normal"
																}}
															>
																{val !== null ? val : "-"}
															</td>
														);
													})}
													<td
														style={{
															border: "1px solid #cbd5e1",
															padding: "8px",
															textAlign: "center",
															fontWeight: "bold",
															color: s.average !== "-" && Number(s.average) < 50 ? "red" : "black"
														}}
													>
														{s.average}
													</td>
												</tr>
											))}
										</tbody>
									</table>
									<PageFooter current={pageCounter++} total={pdfTotalPages} />
								</PageContainer>
								{!isVeryLastPage && <div className="html2pdf__page-break"></div>}
							</div>
						);
					})}
				</div>
			</div>

			{/* Custom CSS untuk styling custom scrollbar pada Web UI */}
			<style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent; 
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1; 
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8; 
                }
            `}</style>
		</div>
	);
}