// app/admin/riwayat/[kelasId]/ClientUI.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Eye, X, FileText, Calendar, User, BookOpen, Calculator, BarChart2 } from "lucide-react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as RechartsTooltip,
	ResponsiveContainer,
} from "recharts";

type LitStudent = { siswaId: string; nama: string; nis: string; completed: number; total: number; history: any[] };
type NumStudent = {
	siswaId: string;
	nama: string;
	nis: string;
	taken: number;
	totalNum: number;
	scores: Record<string, number | null>;
	average: number | string;
};

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

// PERBAIKAN: pageBreakAfter dihapus agar tidak berbenturan dengan html2pdf__page-break
const PageContainer = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			style={{
				width: "297mm",
				height: "209.8mm", // Sangat pas dengan A4 Landscape tanpa overflow
				backgroundColor: "white",
				color: "black",
				boxSizing: "border-box",
				padding: "10mm 15mm",
				position: "relative",
				display: "flex",
				flexDirection: "column",
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

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================
export default function RiwayatDetailClientUI({
	kelasNama,
	waliKelas,
	semesterName,
	literasiSiswa,
	numerasiSiswa,
	numHeaders,
	backUrl,
}: {
	kelasNama: string;
	waliKelas: string;
	semesterName: string;
	literasiSiswa: LitStudent[];
	numerasiSiswa: NumStudent[];
	numHeaders: { id: string; judul: string }[];
	backUrl?: string;
}) {
	const router = useRouter();
	const [selectedLitHistory, setSelectedLitHistory] = useState<any[] | null>(null);
	const [selectedNumHistory, setSelectedNumHistory] = useState<any[] | null>(null);
	const [studentNameModal, setStudentNameModal] = useState("");

	// STATE EXPORT DENGAN DATE PICKER
	const [isExportModalOpen, setIsExportModalOpen] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [isDownloading, setIsDownloading] = useState(false);

	// SORTING SISWA ABJAD (A-Z)
	const sortedLitSiswa = useMemo(() => {
		return [...literasiSiswa].sort((a, b) => a.nama.localeCompare(b.nama));
	}, [literasiSiswa]);

	const sortedNumSiswa = useMemo(() => {
		return [...numerasiSiswa].sort((a, b) => a.nama.localeCompare(b.nama));
	}, [numerasiSiswa]);

	// Kalkulasi Rata-rata Total Kelas
	const totalRataNum = useMemo(() => {
		let sum = 0;
		let validSiswaCount = 0;
		numerasiSiswa.forEach(s => {
			if (s.average !== "-" && !isNaN(Number(s.average))) {
				sum += Number(s.average);
				validSiswaCount++;
			}
		});
		return validSiswaCount > 0 ? sum / validSiswaCount : 0;
	}, [numerasiSiswa]);

	// Data Grafik Numerasi
	const chartData = numHeaders.map((h, idx) => {
		const validScores = numerasiSiswa.map((s) => s.scores[h.id]).filter((score) => score !== null) as number[];
		const avg = validScores.length > 0 ? validScores.reduce((a, b) => a + b, 0) / validScores.length : 0;
		return {
			name: h.judul.includes("Numerasi") ? h.judul.replace("Numerasi", "Num") : `Num ${idx + 1}`,
			actual: Math.round(avg),
		};
	});

	const handleDownloadDetail = async () => {
		if (!startDate || !endDate) {
			alert("Silakan pilih Tanggal Mulai dan Tanggal Selesai terlebih dahulu.");
			return;
		}

		setIsDownloading(true);
		setTimeout(async () => {
			try {
				const html2pdf = (await import("html2pdf.js")).default;
				const element = document.getElementById("pdf-detail-report");
				if (!element) return;

				const opt = {
					margin: 0,
					filename: `Detail_Lino_${kelasNama}_${semesterName.replace(/\s/g, "_")}.pdf`,
					image: { type: "jpeg", quality: 1 },
					html2canvas: { scale: 2, useCORS: true },
					jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }, // Landscape Wajib
					pagebreak: { mode: ["css"] }, // Murni CSS
				};

				await html2pdf().set(opt).from(element).save();
			} catch (error) {
				console.error("PDF Export error:", error);
				alert("Terjadi kesalahan saat mengekspor laporan.");
			} finally {
				setIsDownloading(false);
				setIsExportModalOpen(false);
			}
		}, 500);
	};

	const openPdf = (base64: string) => {
		const pdfWindow = window.open("");
		if (pdfWindow) pdfWindow.document.write(`<iframe width='100%' height='100%' src='${base64}'></iframe>`);
	};

	const formatD = (dStr: string) => new Date(dStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
	const teksPeriode = (!startDate || !endDate) ? `Semester ${semesterName}` : `Periode: ${formatD(startDate)} s.d. ${formatD(endDate)}`;

	// ============================================================================
	// PAGINATION PDF: MAX 10 BARIS DATA AGAR RAPI DI LANDSCAPE
	// ============================================================================
	const PDF_MAX_ROWS = 10;

	const literasiChunks = chunkArray(sortedLitSiswa, PDF_MAX_ROWS);
	if (literasiChunks.length === 0) literasiChunks.push([]);

	const numerasiChunks = chunkArray(sortedNumSiswa, PDF_MAX_ROWS);
	if (numerasiChunks.length === 0) numerasiChunks.push([]);

	const pdfTotalPages = 1 + 1 + literasiChunks.length + numerasiChunks.length; // Cover + Chart + Lit + Num
	let pageCounter = 1;

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 relative">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
				<div className="flex items-start gap-4">
					<button
						onClick={() => backUrl ? router.push(backUrl) : router.back()}
						className="mt-1 p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 shadow-sm transition-colors"
						title="Kembali"
					>
						<ArrowLeft className="h-5 w-5" />
					</button>
					<div>
						<h1 className="text-3xl font-bold text-slate-900">Kelas {kelasNama} - Riwayat Detail</h1>
						<p className="text-sm font-semibold text-slate-500 mt-1 flex items-center gap-3">
							<span className="flex items-center gap-1.5">
								<Calendar className="h-4 w-4" /> {semesterName}
							</span>
							<span className="flex items-center gap-1.5">
								<User className="h-4 w-4" /> Wali Kelas: {waliKelas}
							</span>
						</p>
					</div>
				</div>
				<button
					onClick={() => setIsExportModalOpen(true)}
					className="px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-slate-800 flex items-center gap-2 h-fit transition-colors"
				>
					<Download className="h-4 w-4" /> Export Data PDF
				</button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
				{/* LITERACY ENGAGEMENT */}
				<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col max-h-[500px]">
					<h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
						<BookOpen className="h-5 w-5 text-teal-600" /> Literacy Engagement
					</h3>
					<div className="overflow-y-auto pr-2 custom-scrollbar flex-1">
						<table className="w-full text-sm text-left border-collapse">
							<thead className="bg-slate-50 text-slate-500 font-semibold sticky top-0 z-10 shadow-sm">
								<tr>
									<th className="py-2 px-2">No</th>
									<th className="py-2 px-2">Nama Siswa</th>
									<th className="py-2 px-2 text-center">Terkumpul</th>
									<th className="py-2 px-2 text-right">Aksi</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100">
								{sortedLitSiswa.length === 0 ? (
									<tr>
										<td colSpan={4} className="py-6 text-center text-slate-500">Tidak ada data.</td>
									</tr>
								) : (
									sortedLitSiswa.map((s, idx) => (
										<tr key={s.siswaId} className="hover:bg-slate-50">
											<td className="py-3 px-2 text-slate-500 font-medium">{idx + 1}</td>
											<td className="py-3 px-2 font-semibold text-slate-800">{s.nama}</td>
											<td className="py-3 px-2 text-center font-bold text-slate-600">
												<span
													className={
														s.completed === s.total ? "text-teal-600" : s.completed < s.total / 2 ? "text-red-600" : ""
													}
												>
													{s.completed}/{s.total}
												</span>
											</td>
											<td className="py-3 px-2 text-right">
												<button
													onClick={() => {
														setStudentNameModal(s.nama);
														setSelectedLitHistory(s.history);
													}}
													className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
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

				{/* NUMERACY TREND */}
				<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
					<h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
						<Calculator className="h-5 w-5 text-amber-500" /> Numeracy Performance
					</h3>
					<div className="flex gap-4 items-center mb-6">
						<div className="bg-slate-50 border border-slate-100 p-6 rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-inner shrink-0">
							<p className="text-3xl font-black text-slate-900">{totalRataNum.toFixed(1)}</p>
							<p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wide text-center">Rata-Rata</p>
						</div>
						<p className="text-sm font-medium text-slate-600">
							Siswa rata-rata telah menyelesaikan <strong className="text-slate-900">{numHeaders.length}</strong> sesi tes numerasi.
						</p>
					</div>
					<div className="flex-1 min-h-[150px] w-full">
						<h4 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1">
							<BarChart2 className="h-3.5 w-3.5" /> Tren Nilai Kelas
						</h4>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={chartData}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
								<XAxis
									dataKey="name"
									axisLine={false}
									tickLine={false}
									tick={{ fill: "#94a3b8", fontSize: 10 }}
									dy={5}
								/>
								<YAxis
									domain={[0, 100]}
									axisLine={false}
									tickLine={false}
									tick={{ fill: "#94a3b8", fontSize: 10 }}
									dx={-5}
								/>
								<RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
								<Line
									type="monotone"
									dataKey="actual"
									stroke="#f59e0b"
									strokeWidth={3}
									dot={{ r: 3, fill: "#f59e0b" }}
									isAnimationActive={false}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>

			{/* TABEL NUMERASI (Web UI: Dibatasi max tinggi menampung +- 5 baris data dgn scroll) */}
			<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
				<h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
					<BarChart2 className="h-5 w-5 text-blue-500" /> Detailed Numeracy Scores
				</h3>
				<div className="overflow-x-auto overflow-y-auto max-h-[280px] custom-scrollbar">
					<table className="w-full text-sm text-left border-collapse">
						<thead className="bg-slate-50 text-slate-700 font-bold border-b-2 border-slate-200 uppercase text-xs tracking-wide sticky top-0 z-10 shadow-sm">
							<tr>
								<th className="py-3 px-4 text-center w-[5%]">No</th>
								<th className="py-3 px-4 w-[25%]">Nama Siswa</th>
								<th className="py-3 px-4 w-[15%]">NIS</th>
								{numHeaders.map((h) => (
									<th key={h.id} className="py-3 px-4 text-center">
										{h.judul}
									</th>
								))}
								<th className="py-3 px-4 text-center bg-slate-100">Average</th>
								<th className="py-3 px-4 text-center">Aksi</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{sortedNumSiswa.length === 0 ? (
								<tr>
									<td colSpan={10} className="py-6 text-center text-slate-500">Tidak ada data.</td>
								</tr>
							) : (
								sortedNumSiswa.map((s, idx) => (
									<tr key={s.siswaId} className="hover:bg-slate-50">
										<td className="py-3 px-4 text-center text-slate-500 font-medium">{idx + 1}</td>
										<td className="py-3 px-4 font-bold text-slate-800">{s.nama}</td>
										<td className="py-3 px-4 text-slate-600 font-medium">{s.nis}</td>
										{numHeaders.map((h) => {
											const val = s.scores[h.id];
											return (
												<td key={h.id} className="py-3 px-4 text-center font-semibold text-slate-700">
													<span className={val !== null && val < 50 ? "text-red-500" : ""}>
														{val !== null ? val : "-"}
													</span>
												</td>
											);
										})}
										<td className={`py-3 px-4 text-center font-black bg-slate-50 ${s.average !== "-" && Number(s.average) < 50 ? "text-red-600" : "text-slate-900"}`}>
											{s.average}
										</td>
										<td className="py-3 px-4 text-center">
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

			{/* --- MODAL PILIH WAKTU EXPORT PDF --- */}
			{isExportModalOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
							<h2 className="text-lg font-bold text-slate-800 border-l-4 border-slate-900 pl-2">
								Download Detail Kelas
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
							<div>
								<label className="block text-xs font-bold text-slate-700 mb-1">Tanggal Mulai</label>
								<input
									type="date"
									value={startDate}
									onChange={(e) => setStartDate(e.target.value)}
									className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none text-slate-900 bg-white focus:border-slate-500"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-slate-700 mb-1">Tanggal Selesai</label>
								<input
									type="date"
									value={endDate}
									onChange={(e) => setEndDate(e.target.value)}
									className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none text-slate-900 bg-white focus:border-slate-500"
								/>
							</div>
							<button
								onClick={handleDownloadDetail}
								disabled={isDownloading}
								className="w-full mt-2 px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 flex justify-center items-center gap-2 transition-colors"
							>
								{isDownloading ? "Memproses PDF..." : "Generate & Download PDF"}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* --- MODAL LIHAT TUGAS LITERASI SISWA --- */}
			{selectedLitHistory && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
							<div>
								<h2 className="text-lg font-bold text-slate-900">Riwayat Tugas</h2>
								<p className="text-xs font-semibold text-slate-500">{studentNameModal}</p>
							</div>
							<button onClick={() => setSelectedLitHistory(null)} className="text-slate-400 hover:text-slate-600">
								<X className="h-5 w-5" />
							</button>
						</div>
						<div className="p-6 max-h-[60vh] overflow-y-auto space-y-3 custom-scrollbar">
							{selectedLitHistory.length === 0 ? (
								<p className="text-sm text-slate-500 italic text-center">Belum ada tugas yang dikerjakan.</p>
							) : (
								selectedLitHistory.map((h, i) => (
									<div
										key={i}
										className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100"
									>
										<div className="flex items-center gap-3">
											<FileText className="h-5 w-5 text-slate-400" />
											<div>
												<p className="text-sm font-bold text-slate-800">{h.judul}</p>
												<p
													className={`text-xs font-bold ${h.status === "SELESAI" ? "text-teal-600" : "text-amber-500"}`}
												>
													{h.status}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-2">
											{h.soalPdf && (
												<button
													onClick={() => openPdf(h.soalPdf)}
													className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-teal-50 text-teal-600 tooltip transition-colors"
													title="Lihat Soal"
												>
													<BookOpen className="h-4 w-4" />
												</button>
											)}
											{h.pdf && (
												<button
													onClick={() => openPdf(h.pdf)}
													className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-teal-50 text-teal-600 tooltip transition-colors"
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
													onClick={() => openPdf(h.soalPdf)}
													className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-amber-50 text-amber-600 tooltip transition-colors"
													title="Lihat Soal"
												>
													<BookOpen className="h-4 w-4" />
												</button>
											)}
											{h.jawabanPdf && (
												<button
													onClick={() => openPdf(h.jawabanPdf)}
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

			{/* --- HIDDEN PDF TEMPLATE (LANDSCAPE MAX 10 DATA/HALAMAN) --- */}
			<div style={{ position: "absolute", top: "-9999px", left: "-9999px", visibility: "hidden" }}>
				<div id="pdf-detail-report" style={{ backgroundColor: "white", width: "297mm" }}>

					{/* Cover Page */}
					<PageContainer>
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
							<h1 style={{ fontSize: "28pt", fontWeight: "bold", textTransform: "uppercase", marginBottom: "8px" }}>
								LAPORAN DETAIL KELAS
							</h1>
							<h2 style={{ fontSize: "22pt", fontWeight: "bold", color: "#0f172a" }}>Kelas {kelasNama}</h2>
							<div style={{ width: "50px", height: "4px", backgroundColor: "#0f172a", margin: "24px auto" }}></div>

							<p style={{ fontSize: "14pt", fontWeight: "bold" }}>{teksPeriode}</p>
							<p style={{ fontSize: "12pt", marginTop: "8px" }}>Wali Kelas: {waliKelas}</p>

							<p style={{ fontSize: "14pt", marginTop: "60px", fontWeight: "bold" }}>SMA NEGERI 2 BREBES</p>
						</div>
						<PageFooter current={pageCounter++} total={pdfTotalPages} />
					</PageContainer>
					<div className="html2pdf__page-break"></div>

					{/* Content Page 1: Grafik Numerasi */}
					<PageContainer>
						<KopSurat />
						<h3 style={{ fontSize: "14pt", fontWeight: "bold", margin: "0 0 20px 0", textAlign: "center" }}>
							Tren Numerasi - Kelas {kelasNama} ({teksPeriode})
						</h3>
						<div
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								paddingTop: "10px",
							}}
						>
							<LineChart width={800} height={320} data={chartData}>
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
								<Line
									type="monotone"
									dataKey="actual"
									stroke="#f59e0b"
									strokeWidth={4}
									dot={{ r: 5, fill: "#f59e0b" }}
									isAnimationActive={false} // Disable animasi agar render PDF sempurna
								/>
							</LineChart>
						</div>
						<PageFooter current={pageCounter++} total={pdfTotalPages} />
					</PageContainer>
					<div className="html2pdf__page-break"></div>

					{/* Content Page 2+: Tabel Literasi (10 Baris per Halaman) */}
					{literasiChunks.map((chunk, chunkIdx) => (
						<div key={`lit-page-${chunkIdx}`}>
							<PageContainer>
								<KopSurat />
								<h3 style={{ fontSize: "14pt", fontWeight: "bold", margin: "0 0 15px 0", textAlign: "center" }}>
									Rekap Literasi Siswa {literasiChunks.length > 1 ? `(Bag. ${chunkIdx + 1})` : ""}
								</h3>
								<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
									<thead>
										<tr style={{ backgroundColor: "#f1f5f9" }}>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "10%" }}>No</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left", width: "40%" }}>Nama Siswa</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left", width: "20%" }}>NIS</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "30%" }}>Tugas Terkumpul</th>
										</tr>
									</thead>
									<tbody>
										{chunk.length === 0 ? (
											<tr>
												<td colSpan={4} style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", fontStyle: "italic" }}>
													Tidak ada data.
												</td>
											</tr>
										) : (
											chunk.map((s: any, idx: number) => (
												<tr key={s.siswaId} style={{ pageBreakInside: "avoid" }}>
													<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
														{chunkIdx * PDF_MAX_ROWS + idx + 1}
													</td>
													<td style={{ border: "1px solid #cbd5e1", padding: "10px", fontWeight: "bold" }}>{s.nama}</td>
													<td style={{ border: "1px solid #cbd5e1", padding: "10px" }}>{s.nis}</td>
													<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
														{s.completed} / {s.total}
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

					{/* Content Page 3+: Tabel Numerasi (10 Baris per Halaman) */}
					{numerasiChunks.map((chunk, chunkIdx) => {
						const isVeryLastPage = chunkIdx === numerasiChunks.length - 1;
						return (
							<div key={`num-page-${chunkIdx}`}>
								<PageContainer>
									<KopSurat />
									<h3 style={{ fontSize: "14pt", fontWeight: "bold", margin: "0 0 15px 0", textAlign: "center" }}>
										Rekap Nilai Numerasi {numerasiChunks.length > 1 ? `(Bag. ${chunkIdx + 1})` : ""}
									</h3>
									<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
										<thead>
											<tr style={{ backgroundColor: "#f1f5f9" }}>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "5%" }}>No</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left", width: "30%" }}>Nama Siswa</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left", width: "15%" }}>NIS</th>
												{numHeaders.map((h: any) => (
													<th key={h.id} style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
														{h.judul}
													</th>
												))}
												<th
													style={{
														border: "1px solid #cbd5e1",
														padding: "10px",
														textAlign: "center",
														backgroundColor: "#e2e8f0",
													}}
												>
													Rata-Rata
												</th>
											</tr>
										</thead>
										<tbody>
											{chunk.length === 0 ? (
												<tr>
													<td colSpan={numHeaders.length + 4} style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", fontStyle: "italic" }}>
														Tidak ada data.
													</td>
												</tr>
											) : (
												chunk.map((s: any, idx: number) => (
													<tr key={s.siswaId} style={{ pageBreakInside: "avoid" }}>
														<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
															{chunkIdx * PDF_MAX_ROWS + idx + 1}
														</td>
														<td style={{ border: "1px solid #cbd5e1", padding: "10px", fontWeight: "bold" }}>{s.nama}</td>
														<td style={{ border: "1px solid #cbd5e1", padding: "10px" }}>{s.nis}</td>
														{numHeaders.map((h: any) => {
															const val = s.scores[h.id];
															return (
																<td
																	key={h.id}
																	style={{
																		border: "1px solid #cbd5e1",
																		padding: "10px",
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
																padding: "10px",
																textAlign: "center",
																fontWeight: "bold",
																color: s.average !== "-" && Number(s.average) < 50 ? "red" : "black",
																backgroundColor: "#f8fafc",
															}}
														>
															{s.average}
														</td>
													</tr>
												))
											)}
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