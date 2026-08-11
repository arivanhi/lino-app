// app/pimpinan/literasi/LiterasiDetailUI.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Eye, X, BookOpen, AlertCircle, CheckCircle, Clock, FileText, Search } from "lucide-react";

// ============================================================================
// KOMPONEN KOP SURAT
// ============================================================================
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
	const width = isPortrait ? "210mm" : "297mm";
	// Dikurangi 1mm untuk keamanan agar tidak memancing page break ganda dari html2pdf
	const height = isPortrait ? "296mm" : "209mm";

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

// ============================================================================
// KOMPONEN UTAMA
// ============================================================================
export default function LiterasiDetailUI({ kelasNama, waliKelas, semesterName, tasks, students, backUrl }: any) {
	const router = useRouter();
	const [isExportModalOpen, setIsExportModalOpen] = useState(false);

	// PERBAIKAN: Menggunakan State Tanggal
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [isDownloading, setIsDownloading] = useState(false);

	const [selectedStudent, setSelectedStudent] = useState<any>(null);
	const [search, setSearch] = useState("");

	// Sorting Alphabetical for Display
	const sortedStudents = [...students].sort((a: any, b: any) => a.nama.localeCompare(b.nama));

	const filteredStudents = sortedStudents.filter(
		(s: any) => s.nama.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search),
	);

	const missingCount = students.filter((s: any) => s.uploaded < tasks.length).length;
	const avgSubmission =
		students.length > 0
			? Math.round(
				(students.reduce((acc: number, s: any) => acc + s.uploaded, 0) / (students.length * (tasks.length || 1))) *
				100,
			)
			: 0;

	const handleDownload = async () => {
		if (!startDate || !endDate) {
			alert("Silakan pilih Tanggal Mulai dan Tanggal Selesai terlebih dahulu.");
			return;
		}

		setIsDownloading(true);
		// Delay slight to allow React to render the hidden PDF correctly
		setTimeout(async () => {
			try {
				const html2pdf = (await import("html2pdf.js")).default;
				const element = document.getElementById("pdf-literasi-detail");

				const opt = {
					margin: 0, // Dibiarkan 0 karena kita pakai PageContainer dengan box-sizing yang kuat
					filename: `Detail_Literasi_${kelasNama}_${semesterName.replace(/\s/g, "_")}.pdf`,
					image: { type: "jpeg", quality: 1 },
					html2canvas: { scale: 2, useCORS: true },
					jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
					pagebreak: { mode: ["css"] }, // Hanya gunakan pageBreak CSS bawaan PageContainer
				};

				await html2pdf().set(opt).from(element).save();
			} catch (error) {
				console.error("PDF Export error:", error);
				alert("Terjadi kesalahan saat memproses laporan PDF.");
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

	// PERBAIKAN: Pemotongan halaman (Chunking) untuk PDF => DIBATASI 18 BARIS
	const PDF_MAX_ROWS = 18;
	const tasksChunks = chunkArray(tasks, PDF_MAX_ROWS);
	if (tasksChunks.length === 0) tasksChunks.push([]); // Minimal 1 tabel meski kosong

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
						<h1 className="text-3xl font-bold text-slate-900">Literacy Tracks: Kelas {kelasNama}</h1>
						<p className="text-sm font-semibold text-slate-500 mt-1">Progress & Submissions Overview</p>
					</div>
				</div>
				<button
					onClick={() => setIsExportModalOpen(true)}
					className="px-4 py-2.5 bg-white border border-slate-300 text-slate-800 text-sm font-bold rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2 h-fit"
				>
					<Download className="h-4 w-4" /> Export Data Literacy
				</button>
			</div>

			{/* CARD STATS */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div className="bg-white p-5 rounded-2xl border-l-4 border-l-teal-600 border-y border-r border-slate-200 shadow-sm">
					<p className="text-xs font-bold text-slate-500 mb-2">Total Literacy Tasks</p>
					<p className="text-3xl font-black text-slate-900">{tasks.length}</p>
				</div>
				<div className="bg-white p-5 rounded-2xl border-l-4 border-l-teal-600 border-y border-r border-slate-200 shadow-sm">
					<p className="text-xs font-bold text-slate-500 mb-2">Avg. Submission Rate</p>
					<p className="text-3xl font-black text-slate-900">{avgSubmission}%</p>
				</div>
				<div className="bg-white p-5 rounded-2xl border-l-4 border-l-amber-500 border-y border-r border-slate-200 shadow-sm">
					<p className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-1.5">
						Missing Submissions <AlertCircle className="h-3 w-3 text-amber-500" />
					</p>
					<p className="text-3xl font-black text-slate-900">
						{missingCount} <span className="text-sm font-bold text-slate-500">students</span>
					</p>
				</div>
				<div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
					<p className="text-xs font-bold text-slate-500 mb-2">Total Students</p>
					<p className="text-3xl font-black text-slate-900">{students.length}</p>
				</div>
			</div>

			{/* TOPICS TABLE */}
			<div>
				<h3 className="text-lg font-bold text-slate-900 mb-4">Literacy Topics</h3>
				<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
					{/* PERBAIKAN: Pembatasan tinggi tabel dan memberikan Scroll vertikal (max 10 data yang tampak proporsional) */}
					<div className="overflow-y-auto max-h-[300px] custom-scrollbar">
						<table className="w-full text-sm text-left">
							<thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs sticky top-0 z-10">
								<tr>
									<th className="py-3 px-5">Topic Name</th>
									<th className="py-3 px-5">Date Assigned</th>
									<th className="py-3 px-5 text-right">Status</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100">
								{tasks.length === 0 ? (
									<tr>
										<td colSpan={3} className="p-4 text-center text-slate-500">
											Belum ada tugas.
										</td>
									</tr>
								) : (
									tasks.map((t: any) => (
										<tr key={t.id} className="hover:bg-slate-50">
											<td className="py-3 px-5 font-bold text-slate-800">{t.judul}</td>
											<td className="py-3 px-5 text-slate-600">
												{new Date(t.createdAt).toLocaleDateString("en-US", {
													month: "short",
													day: "2-digit",
													year: "numeric",
												})}
											</td>
											<td className="py-3 px-5 text-right">
												<span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">
													{t.status === "SELESAI" ? "Completed" : "Active"}
												</span>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* STUDENT PROGRESS */}
			<div>
				<div className="flex justify-between items-end mb-4">
					<h3 className="text-lg font-bold text-slate-900">Student Progress</h3>
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
						<input
							type="text"
							placeholder="Search student..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							// PERBAIKAN: Warna text input dipertegas
							className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-500 w-64"
						/>
					</div>
				</div>
				<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
					{/* PERBAIKAN: Scroll vertikal dengan batas tinggi yang ideal (kira-kira menampung 10 row) */}
					<div className="overflow-y-auto max-h-[500px] custom-scrollbar">
						<table className="w-full text-sm text-left">
							<thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs sticky top-0 z-10">
								<tr>
									<th className="py-3 px-5">Student Name</th>
									<th className="py-3 px-5">NIS</th>
									<th className="py-3 px-5 text-center">Tasks Uploaded</th>
									<th className="py-3 px-5 text-center">Status</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100">
								{filteredStudents.length === 0 ? (
									<tr>
										<td colSpan={4} className="p-4 text-center text-slate-500">
											Tidak ada siswa ditemukan.
										</td>
									</tr>
								) : (
									filteredStudents.map((s: any) => (
										<tr key={s.siswaId} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedStudent(s)}>
											<td className="py-3 px-5 font-bold text-slate-800 flex items-center gap-3">
												<div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
													{s.nama.charAt(0)}
												</div>
												{s.nama}
											</td>
											<td className="py-3 px-5 text-slate-600 font-medium">{s.nis}</td>
											<td
												className={`py-3 px-5 text-center font-bold ${s.uploaded < tasks.length ? "text-red-500" : "text-slate-800"}`}
											>
												{s.uploaded}/{tasks.length}
											</td>
											<td className="py-3 px-5 flex justify-center">
												{s.status === "Mastered" && (
													<span className="flex items-center gap-1 bg-teal-50 text-teal-600 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
														<CheckCircle className="h-3.5 w-3.5" /> Mastered
													</span>
												)}
												{s.status === "On Track" && (
													<span className="flex items-center gap-1 bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
														<Clock className="h-3.5 w-3.5" /> On Track
													</span>
												)}
												{s.status === "Behind" && (
													<span className="flex items-center gap-1 bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
														<AlertCircle className="h-3.5 w-3.5" /> Behind
													</span>
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

			{/* MODAL TUGAS SISWA */}
			{selectedStudent && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
							<div>
								<h2 className="text-lg font-bold text-slate-900">Riwayat Upload</h2>
								<p className="text-xs font-semibold text-slate-500">{selectedStudent.nama}</p>
							</div>
							<button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-slate-600">
								<X className="h-5 w-5" />
							</button>
						</div>
						<div className="p-6 max-h-[60vh] overflow-y-auto space-y-3 custom-scrollbar">
							{selectedStudent.history.length === 0 ? (
								<p className="text-center text-slate-500 italic text-sm">Belum ada tugas dikerjakan.</p>
							) : (
								selectedStudent.history.map((h: any, i: number) => (
									<div
										key={i}
										className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100"
									>
										<div className="flex items-center gap-3">
											<FileText className="h-5 w-5 text-slate-400" />
											<div>
												<p className="text-sm font-bold text-slate-800">{h.judul}</p>
												<p
													className={`text-[10px] uppercase tracking-wider font-bold ${h.status === "SELESAI" ? "text-teal-600" : "text-red-500"}`}
												>
													{h.status}
												</p>
											</div>
										</div>
										{h.pdf && (
											<button
												onClick={() => openPdf(h.pdf)}
												className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-teal-50 text-teal-600 shadow-sm"
												title="View Document"
											>
												<Eye className="h-4 w-4" />
											</button>
										)}
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
								Export Detail Literasi
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

			{/* HIDDEN PDF TEMPLATE (MANUAL PAGINATION MAX 18 DATA/HALAMAN) */}
			<div style={{ position: "absolute", top: "-9999px", left: "-9999px", visibility: "hidden" }}>
				<div id="pdf-literasi-detail" style={{ backgroundColor: "white", width: "210mm" }}>

					{/* COVER PAGE */}
					<PageContainer orientation="portrait" isLast={false}>
						<div
							style={{
								flex: 1,
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
								LAPORAN DETAIL LITERASI
							</h1>
							<h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#0f172a" }}>Kelas {kelasNama}</h2>
							<div style={{ width: "50px", height: "4px", backgroundColor: "#0f172a", margin: "24px auto" }}></div>
							<p style={{ fontSize: "18px", fontWeight: "600" }}>{teksPeriode}</p>
							<p style={{ fontSize: "16px", marginTop: "8px" }}>Wali Kelas: {waliKelas}</p>

							<div style={{ marginTop: "auto" }}>
								<p style={{ fontSize: "14px", fontWeight: "bold" }}>SMA NEGERI 2 BREBES</p>
							</div>
						</div>
						<PageFooter current={pageCounter++} total={pdfTotalPages} />
					</PageContainer>

					{/* TASKS PAGES */}
					{tasksChunks.map((chunk, chunkIdx) => (
						<div key={`tasks-page-${chunkIdx}`}>
							<div className="html2pdf__page-break"></div>
							<PageContainer orientation="portrait" isLast={false}>
								<KopSurat />
								<h3 style={{ fontSize: "14pt", fontWeight: "bold", textAlign: "center", margin: "10px 0 20px 0" }}>
									Topik Penugasan Literasi {tasksChunks.length > 1 ? `(Bag. ${chunkIdx + 1})` : ""}
								</h3>
								<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
									<thead>
										<tr style={{ backgroundColor: "#f1f5f9" }}>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "10%" }}>No</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left", width: "60%" }}>Judul Topik</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "30%" }}>Status Penugasan</th>
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
														{t.status === "SELESAI" ? "Selesai" : "Aktif"}
													</td>
												</tr>
											))
										)}
									</tbody>
								</table>
								<PageFooter current={pageCounter++} total={pdfTotalPages} />
							</PageContainer>
						</div>
					))}

					{/* STUDENTS PROGRESS PAGES */}
					{studentsChunks.map((chunk, chunkIdx) => {
						const isLastPage = chunkIdx === studentsChunks.length - 1;
						return (
							<div key={`students-page-${chunkIdx}`}>
								<div className="html2pdf__page-break"></div>
								<PageContainer orientation="portrait" isLast={isLastPage}>
									<KopSurat />
									<h3 style={{ fontSize: "14pt", fontWeight: "bold", textAlign: "center", margin: "10px 0 20px 0" }}>
										Detail Progress Siswa {studentsChunks.length > 1 ? `(Bag. ${chunkIdx + 1})` : ""}
									</h3>
									<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
										<thead>
											<tr style={{ backgroundColor: "#f1f5f9" }}>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "8%" }}>No</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left", width: "45%" }}>Nama Siswa</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left", width: "17%" }}>NIS</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "15%" }}>Status</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "15%" }}>Tugas Selesai</th>
											</tr>
										</thead>
										<tbody>
											{chunk.length === 0 ? (
												<tr>
													<td colSpan={5} style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", fontStyle: "italic" }}>
														Belum ada data siswa.
													</td>
												</tr>
											) : (
												chunk.map((s: any, idx: number) => {
													const statusColor =
														s.status === "Mastered" ? "#0d9488" : s.status === "On Track" ? "#3b82f6" : "#e11d48";
													return (
														<tr key={idx} style={{ pageBreakInside: "avoid" }}>
															<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
																{chunkIdx * PDF_MAX_ROWS + idx + 1}
															</td>
															<td style={{ border: "1px solid #cbd5e1", padding: "10px", fontWeight: "bold" }}>{s.nama}</td>
															<td style={{ border: "1px solid #cbd5e1", padding: "10px" }}>{s.nis}</td>
															<td
																style={{
																	border: "1px solid #cbd5e1",
																	padding: "10px",
																	textAlign: "center",
																	fontWeight: "bold",
																	color: statusColor,
																}}
															>
																{s.status}
															</td>
															<td
																style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", fontWeight: "bold" }}
															>
																{s.uploaded} / {tasks.length}
															</td>
														</tr>
													);
												})
											)}
										</tbody>
									</table>
									<PageFooter current={pageCounter++} total={pdfTotalPages} />
								</PageContainer>
							</div>
						);
					})}
				</div>
			</div>

			{/* Custom Scrollbar CSS (Only visible on web UI) */}
			<style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
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