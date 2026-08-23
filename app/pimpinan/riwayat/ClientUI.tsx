// app/pimpinan/riwayat/ClientUI.tsx
"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Download, ChevronLeft, ChevronRight, X } from "lucide-react";
import ClassFilter from "../../components/ClassFilter";

type StudentData = { nama: string; nis: string; litCompleted: number; litTotal: number; numAvg: number };
type ClassData = { id: string; nama: string; literasi: number; numerasi: number; students?: StudentData[] };

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
}: {
	children: React.ReactNode;
	orientation?: "portrait" | "landscape";
}) => {
	const isPortrait = orientation === "portrait";
	const width = isPortrait ? "210mm" : "297mm";
	// Menggunakan tinggi absolut dan dikurangi sedikit agar aman dari overflow/halaman kosong
	const height = isPortrait ? "296mm" : "208mm";

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
export default function RiwayatClientUI({
	semesterName,
	semuaTA,
	selectedTAId,
	cards,
	allClasses,
	currentPage,
	totalPages,
	tab,
	q,
}: {
	semesterName: string;
	semuaTA: { id: string; nama: string }[];
	selectedTAId: string;
	cards: ClassData[];
	allClasses: ClassData[];
	currentPage: number;
	totalPages: number;
	tab: string;
	q: string;
}) {
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

	// STATE TANGGAL (DATE PICKER)
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [isDownloading, setIsDownloading] = useState(false);

	const getStatus = (lit: number, num: number) => {
		const avg = (lit + num) / 2;
		if (avg >= 85) return { text: "Sangat Mahir", color: "text-teal-600 bg-teal-50" };
		if (avg >= 70) return { text: "Memadai", color: "text-blue-600 bg-blue-50" };
		return { text: "Perlu Intervensi", color: "text-red-600 bg-red-50" };
	};

	const handleDownload = async () => {
		if (!startDate || !endDate) {
			alert("Silakan pilih Tanggal Mulai dan Tanggal Selesai terlebih dahulu.");
			return;
		}

		setIsDownloading(true);
		setTimeout(async () => {
			try {
				const html2pdf = (await import("html2pdf.js")).default;
				const element = document.getElementById("pdf-bulk-report");
				if (!element) return;

				const opt = {
					margin: 0, // Wajib 0 untuk mengikuti PageContainer statis
					filename: `Laporan_Riwayat_${semesterName.replace(/\s/g, "_")}.pdf`,
					image: { type: "jpeg", quality: 1 },
					html2canvas: { scale: 2, useCORS: true },
					jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
					pagebreak: { mode: ["css"] }, // Hanya gunakan class CSS pageBreak
				};

				await html2pdf().set(opt).from(element).save();
			} catch (error) {
				console.error("Gagal export PDF:", error);
				alert("Terjadi kesalahan saat mengekspor laporan.");
			} finally {
				setIsDownloading(false);
				setIsModalOpen(false);
			}
		}, 500);
	};

	const availableClassesForExport = useMemo(() => {
		return allClasses.filter((k: any) => {
			const matchTab = tab === "Semua Kelas" || k.nama.startsWith(`${tab}-`);
			return matchTab;
		});
	}, [allClasses, tab]);

	const filteredDataPdf = selectedClasses.length === 0 ? availableClassesForExport : availableClassesForExport.filter((c) => selectedClasses.includes(c.id));

	const formatD = (dStr: string) => new Date(dStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
	const teksPeriode = (!startDate || !endDate) ? `Semester ${semesterName}` : `Periode: ${formatD(startDate)} s.d. ${formatD(endDate)}`;

	// ============================================================================
	// LOGIKA PAGINATION PDF - LIMIT 15 BARIS DATA
	// ============================================================================
	const PDF_MAX_ROWS = 20;

	// Chunk data untuk tabel ringkasan
	const summaryChunks = chunkArray(filteredDataPdf, PDF_MAX_ROWS);
	if (summaryChunks.length === 0) summaryChunks.push([]);

	// Identifikasi kelas terakhir yang memiliki murid (untuk penentuan isVeryLastPage)
	const lastClassWithStudentsIndex = filteredDataPdf.map(c => c.students && c.students.length > 0).lastIndexOf(true);

	// Hitung total halaman
	let pdfTotalPages = 1 + summaryChunks.length; // Cover + Summary
	filteredDataPdf.forEach((c) => {
		if (c.students && c.students.length > 0) {
			pdfTotalPages += Math.ceil(c.students.length / PDF_MAX_ROWS);
		}
	});

	let pageCounter = 1;

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
				<div>
					<h1 className="text-3xl font-bold text-slate-900">Riwayat Lino</h1>
					<p className="text-slate-500 mt-1 mb-6">Review historical literacy and numeracy performance across classes.</p>
				</div>
				<ClassFilter />
				<div className="flex gap-4 items-end">
					<div>
						<label className="block text-xs font-bold text-slate-500 mb-1">Semester</label>
						<select
							value={selectedTAId}
							onChange={(e) => router.push(`?taId=${e.target.value}`)}
							className="px-4 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 font-semibold text-slate-700 outline-none"
						>
							{semuaTA.map((ta) => (
								<option key={ta.id} value={ta.id}>
									{ta.nama}
								</option>
							))}
						</select>
					</div>
					<button
						onClick={() => setIsModalOpen(true)}
						className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 flex items-center gap-2"
					>
						<Download className="h-4 w-4" /> Export Data
					</button>
				</div>
			</div>

			{/* KARTU KELAS WEB UI */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
				{cards.map((k) => {
					const status = getStatus(k.literasi, k.numerasi);
					return (
						<Link
							href={`/pimpinan/riwayat/${k.id}`}
							key={k.id}
							className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-all cursor-pointer block border-l-4 border-l-slate-800"
						>
							<div className="flex justify-between items-start mb-4">
								<div>
									<h2 className="text-xl font-bold text-slate-800">Kelas {k.nama} - Riwayat</h2>
									<p className="text-xs text-slate-500 mt-0.5">Semester {semesterName}</p>
								</div>
							</div>
							<div className="flex gap-3 mb-6">
								<div className="flex-1 bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
									<p className="text-xs font-bold text-slate-500 mb-1">Literasi</p>
									<p className="text-2xl font-black text-slate-800">{k.literasi}%</p>
								</div>
								<div className="flex-1 bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
									<p className="text-xs font-bold text-slate-500 mb-1">Numerasi</p>
									<p className="text-2xl font-black text-slate-800">{k.numerasi}</p>
								</div>
							</div>
							<div className="flex justify-between items-center border-t border-slate-100 pt-4">
								<span className="text-xs font-bold text-slate-500">Status Akhir:</span>
								<span className={`px-3 py-1 rounded-full text-xs font-bold ${status.color}`}>{status.text}</span>
							</div>
						</Link>
					);
				})}
			</div>

			{/* PAGINASI WEB UI */}
			{totalPages > 1 && (
				<div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-8">
					<Link
						href={`/pimpinan/riwayat?page=${currentPage - 1}${selectedTAId ? `&taId=${selectedTAId}` : ""}${tab !== "Semua Kelas" ? `&tab=${tab}` : ""}${q ? `&q=${q}` : ""}`}
						className={`flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-800 transition-colors ${currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-slate-50"}`}
					>
						<ChevronLeft className="h-4 w-4" /> Sebelumnya
					</Link>
					<span className="text-sm font-medium text-slate-600">
						Halaman {currentPage} dari {totalPages}
					</span>
					<Link
						href={`/pimpinan/riwayat?page=${currentPage + 1}${selectedTAId ? `&taId=${selectedTAId}` : ""}${tab !== "Semua Kelas" ? `&tab=${tab}` : ""}${q ? `&q=${q}` : ""}`}
						className={`flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-800 transition-colors ${currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-slate-50"}`}
					>
						Selanjutnya <ChevronRight className="h-4 w-4" />
					</Link>
				</div>
			)}

			{/* --- MODAL EXPORT PDF DENGAN DATE PICKER --- */}
			{isModalOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
							<h2 className="text-lg font-bold text-slate-800 border-l-4 border-slate-900 pl-2">Export Data Riwayat</h2>
							<button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
								<X className="h-5 w-5" />
							</button>
						</div>
						<div className="p-6 space-y-4">
							<div>
								<label className="block text-xs font-bold text-slate-700 mb-2">Pilih Kelas</label>
								<div className="max-h-40 overflow-y-auto border border-slate-300 rounded-lg p-2 bg-white space-y-2 custom-scrollbar">
									<label className="flex items-center gap-2 text-sm font-medium text-slate-800 cursor-pointer p-1 hover:bg-slate-50 rounded">
										<input
											type="checkbox"
											checked={selectedClasses.length === availableClassesForExport.length && availableClassesForExport.length > 0}
											onChange={(e) => {
												if (e.target.checked) {
													setSelectedClasses(availableClassesForExport.map((c: any) => c.id));
												} else {
													setSelectedClasses([]);
												}
											}}
											className="rounded text-slate-900 focus:ring-slate-900"
										/>
										Pilih Semua (Tab {tab})
									</label>
									<hr className="border-slate-100 my-1" />
									{availableClassesForExport.map((c) => (
										<label key={c.id} className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer p-1 hover:bg-slate-50 rounded">
											<input
												type="checkbox"
												checked={selectedClasses.includes(c.id)}
												onChange={(e) => {
													if (e.target.checked) {
														setSelectedClasses((prev) => [...prev, c.id]);
													} else {
														setSelectedClasses((prev) => prev.filter((id) => id !== c.id));
													}
												}}
												className="rounded text-slate-900 focus:ring-slate-900"
											/>
											{c.nama}
										</label>
									))}
								</div>
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

			{/* --- HIDDEN PDF TEMPLATE --- */}
			<div style={{ position: "absolute", top: "-9999px", left: "-9999px", visibility: "hidden" }}>
				<div id="pdf-bulk-report" style={{ backgroundColor: "white", width: "210mm" }}>

					{/* HALAMAN 1: COVER FULL HALAMAN */}
					<PageContainer orientation="portrait">
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
								style={{ width: "140px", height: "140px", marginBottom: "30px", objectFit: "contain" }}
							/>
							<h1 style={{ fontSize: "28pt", fontWeight: "bold", textTransform: "uppercase", marginBottom: "8px" }}>
								LAPORAN EVALUASI
							</h1>
							<h2 style={{ fontSize: "22pt", fontWeight: "bold", color: "#0f172a" }}>LITERASI & NUMERASI</h2>
							<div style={{ width: "60px", height: "4px", backgroundColor: "#0f172a", margin: "24px auto" }}></div>

							<p style={{ fontSize: "14pt", fontWeight: "bold" }}>{teksPeriode}</p>
							<p style={{ fontSize: "12pt", marginTop: "8px" }}>
								{selectedClasses.length === 0
									? "Semua Kelas Terdata"
									: `Kelas: ${allClasses.filter((c) => selectedClasses.includes(c.id)).map(c => c.nama).join(", ")}`}
							</p>

							<div style={{ marginTop: "100px" }}>
								<p style={{ fontSize: "14pt", fontWeight: "bold" }}>SMA NEGERI 2 BREBES</p>
							</div>
						</div>
						<PageFooter current={pageCounter++} total={pdfTotalPages} />
					</PageContainer>
					<div className="html2pdf__page-break"></div>

					{/* HALAMAN 2+: RINGKASAN GLOBAL (Max 15) */}
					{summaryChunks.map((chunk, chunkIdx) => {
						// Cek apakah halaman ini adalah halaman paling akhir seluruh dokumen (jika tidak ada data murid sama sekali)
						const isVeryLastPageSummary = (chunkIdx === summaryChunks.length - 1) && lastClassWithStudentsIndex === -1;

						return (
							<div key={`summary-${chunkIdx}`}>
								<PageContainer orientation="portrait">
									<KopSurat />
									<h3
										style={{
											fontSize: "14pt",
											fontWeight: "bold",
											textAlign: "center",
											marginBottom: "20px",
											textTransform: "uppercase",
										}}
									>
										Ringkasan Nilai {summaryChunks.length > 1 ? `(Bag. ${chunkIdx + 1})` : ""}
									</h3>
									<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
										<thead>
											<tr style={{ backgroundColor: "#f1f5f9" }}>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "8%" }}>No</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left" }}>Kelas</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>% Literasi</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>Rata-rata Numerasi</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "30%" }}>Grafik Numerasi</th>
											</tr>
										</thead>
										<tbody>
											{chunk.length === 0 ? (
												<tr>
													<td colSpan={5} style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", fontStyle: "italic" }}>
														Tidak ada data.
													</td>
												</tr>
											) : (
												chunk.map((c, cIdx) => (
													<tr key={c.id} style={{ pageBreakInside: "avoid" }}>
														<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
															{chunkIdx * PDF_MAX_ROWS + cIdx + 1}
														</td>
														<td style={{ border: "1px solid #cbd5e1", padding: "10px", fontWeight: "bold" }}>{c.nama}</td>
														<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>{c.literasi}%</td>
														<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", fontWeight: "bold" }}>{c.numerasi}</td>
														<td style={{ border: "1px solid #cbd5e1", padding: "10px", verticalAlign: "middle" }}>
															<svg width="100%" height="12" style={{ backgroundColor: "#e2e8f0", borderRadius: "4px", display: "block" }}>
																<rect width={`${c.numerasi}%`} height="12" fill={c.numerasi >= 70 ? "#0d9488" : "#e11d48"} />
															</svg>
														</td>
													</tr>
												))
											)}
										</tbody>
									</table>
									<PageFooter current={pageCounter++} total={pdfTotalPages} />
								</PageContainer>
								{!isVeryLastPageSummary && <div className="html2pdf__page-break"></div>}
							</div>
						);
					})}

					{/* HALAMAN 3+: RINCIAN SISWA PER KELAS (Max 15, Urut Abjad) */}
					{filteredDataPdf.map((c, cIndex) => {
						if (!c.students || c.students.length === 0) return null;

						// Urutkan siswa A-Z
						const sortedStudents = [...c.students].sort((a: any, b: any) => a.nama.localeCompare(b.nama));
						const studentChunks = chunkArray(sortedStudents, PDF_MAX_ROWS);

						return studentChunks.map((studentChunk, chunkIdx) => {
							const isVeryLastPageStudent = (cIndex === lastClassWithStudentsIndex) && (chunkIdx === studentChunks.length - 1);

							return (
								<div key={`detail-${c.id}-${chunkIdx}`}>
									<PageContainer orientation="portrait">
										<KopSurat />
										<h3
											style={{
												fontSize: "14pt",
												fontWeight: "bold",
												textAlign: "center",
												marginBottom: "20px",
												textTransform: "uppercase",
											}}
										>
											Rincian Kelas {c.nama} {studentChunks.length > 1 ? `(Bag. ${chunkIdx + 1})` : ""}
										</h3>
										<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
											<thead>
												<tr style={{ backgroundColor: "#f1f5f9" }}>
													<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "8%" }}>No</th>
													<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left", width: "45%" }}>Nama Siswa</th>
													<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left", width: "15%" }}>NIS</th>
													<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>Literasi Selesai</th>
													<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", backgroundColor: "#e2e8f0" }}>
														Rata-rata Numerasi
													</th>
												</tr>
											</thead>
											<tbody>
												{studentChunk.map((s, idx) => (
													<tr key={idx} style={{ pageBreakInside: "avoid" }}>
														<td style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center" }}>
															{chunkIdx * PDF_MAX_ROWS + idx + 1}
														</td>
														<td style={{ border: "1px solid #cbd5e1", padding: "8px", fontWeight: "bold" }}>{s.nama}</td>
														<td style={{ border: "1px solid #cbd5e1", padding: "8px" }}>{s.nis}</td>
														<td style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center" }}>
															{s.litCompleted} / {s.litTotal}
														</td>
														<td
															style={{
																border: "1px solid #cbd5e1",
																padding: "8px",
																textAlign: "center",
																fontWeight: "bold",
																color: s.numAvg < 50 ? "#e11d48" : "inherit"
															}}
														>
															{s.numAvg}
														</td>
													</tr>
												))}
											</tbody>
										</table>
										<PageFooter current={pageCounter++} total={pdfTotalPages} />
									</PageContainer>
									{!isVeryLastPageStudent && <div className="html2pdf__page-break"></div>}
								</div>
							);
						});
					})}
				</div>
			</div>
		</div>
	);
}