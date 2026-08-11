// app/pimpinan/literasi/ClientUI.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Download, ChevronRight, ChevronLeft, BookOpen, User, X } from "lucide-react";

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
	const minHeight = isPortrait ? "296mm" : "209mm";

	return (
		<div
			style={{
				width,
				minHeight,
				backgroundColor: "white",
				color: "black",
				boxSizing: "border-box",
				padding: "10mm 15mm",
				position: "relative",
				display: "flex",
				flexDirection: "column",
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

export default function LiterasiPimpinanClient({ semesterName, cards, allClasses, currentPage, totalPages }: any) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedClass, setSelectedClass] = useState("SEMUA");

	// State tanggal mulai dan selesai (Date Picker)
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [isDownloading, setIsDownloading] = useState(false);

	const handleDownload = async () => {
		if (!startDate || !endDate) {
			alert("Silakan pilih Tanggal Mulai dan Tanggal Selesai terlebih dahulu.");
			return;
		}
		setIsDownloading(true);
		const html2pdf = (await import("html2pdf.js")).default;
		const element = document.getElementById("pdf-literasi-bulk");

		const opt = {
			margin: 0,
			filename: `Laporan_Literasi_${semesterName.replace(/\s/g, "_")}.pdf`,
			image: { type: "jpeg", quality: 1 },
			html2canvas: { scale: 2, useCORS: true },
			jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
			pagebreak: { mode: ["css", "legacy"] },
		};

		html2pdf()
			.set(opt)
			.from(element)
			.save()
			.then(() => {
				setIsDownloading(false);
				setIsModalOpen(false);
			});
	};

	const filteredData = selectedClass === "SEMUA" ? allClasses : allClasses.filter((c: any) => c.id === selectedClass);

	const teksPeriode = useMemo(() => {
		if (!startDate || !endDate) return `Semester ${semesterName}`;
		const formatD = (dStr: string) => new Date(dStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
		return `Periode: ${formatD(startDate)} s.d. ${formatD(endDate)}`;
	}, [startDate, endDate, semesterName]);

	// Batasi pagination card maksimal 20 per halaman sesuai permintaan
	const itemsPerPage = 20;
	const paginatedCards = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return cards.slice(start, start + itemsPerPage);
	}, [cards, currentPage]);

	const calculatedTotalPages = Math.max(1, Math.ceil(cards.length / itemsPerPage));

	// Pagination Data PDF
	const summaryChunks = chunkArray(filteredData, 20);
	let pdfTotalPages = 1 + summaryChunks.length; // Cover + Summary
	filteredData.forEach((c: any) => {
		if (c.students) {
			// PERBAIKAN: Membatasi chunk array siswa menjadi max 20 baris per halaman PDF
			pdfTotalPages += chunkArray(c.students, 20).length;
		}
	});

	let pageCounter = 1;

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 relative">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
				<div>
					<h1 className="text-3xl font-bold text-slate-900">Manajemen Literasi</h1>
					<p className="text-slate-500 mt-1">Pantau dan kelola aktivitas literasi untuk setiap kelas.</p>
				</div>
				<button
					onClick={() => setIsModalOpen(true)}
					className="px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 flex items-center gap-2"
				>
					<Download className="h-4 w-4" /> Export Laporan Literasi
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
				{paginatedCards.map((k: any, idx: number) => {
					// Menambahkan nomor urut pada card
					const nomorUrut = (currentPage - 1) * itemsPerPage + idx + 1;
					return (
						<div
							key={k.id}
							className="bg-white rounded-2xl border-l-4 border-l-teal-600 border-y border-r border-slate-200 shadow-sm p-6 hover:shadow-md transition-all flex flex-col"
						>
							<div className="flex justify-between items-start mb-4">
								<div className="flex items-center gap-2">
									<span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">#{nomorUrut}</span>
									<h2 className="text-xl font-bold text-slate-800">Kelas {k.nama}</h2>
								</div>
								<span className="bg-teal-50 text-teal-600 text-xs font-bold px-2.5 py-1 rounded-md">Aktif</span>
							</div>
							<div className="space-y-3 mb-6 flex-1">
								<div className="flex items-center gap-2 text-sm text-slate-600">
									<BookOpen className="h-4 w-4 text-teal-600" />
									<span>
										Total Tugas Literasi: <strong>{k.totalTugas} Tugas</strong>
									</span>
								</div>
								<div className="flex items-center gap-2 text-sm text-slate-600">
									<User className="h-4 w-4 text-slate-400" />
									<span>
										Wali Kelas: <strong>{k.wali}</strong>
									</span>
								</div>
							</div>
							<div className="border-t border-slate-100 pt-4 flex justify-end">
								<Link
									href={`/pimpinan/literasi/${k.id}`}
									className="text-sm font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1"
								>
									Lihat Detail <ChevronRight className="h-4 w-4" />
								</Link>
							</div>
						</div>
					);
				})}
			</div>

			{/* PAGINASI (Dibatasi 20 per halaman) */}
			{calculatedTotalPages > 1 && (
				<div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-8">
					<Link
						href={`/pimpinan/literasi?page=${currentPage - 1}`}
						className={`flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold ${currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-slate-50"}`}
					>
						<ChevronLeft className="h-4 w-4" /> Previous
					</Link>
					<span className="text-sm font-bold text-slate-900">
						Page {currentPage} of {calculatedTotalPages}
					</span>
					<Link
						href={`/pimpinan/literasi?page=${currentPage + 1}`}
						className={`flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold ${currentPage === calculatedTotalPages ? "pointer-events-none opacity-50" : "hover:bg-slate-50"}`}
					>
						Next <ChevronRight className="h-4 w-4" />
					</Link>
				</div>
			)}

			{/* MODAL DOWNLOAD DENGAN DATE PICKER */}
			{isModalOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
							<h2 className="text-lg font-bold text-slate-800 border-l-4 border-teal-600 pl-2">Export Data Literasi</h2>
							<button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
								<X className="h-5 w-5" />
							</button>
						</div>
						<div className="p-6 space-y-4">
							<div>
								<label className="block text-xs font-bold text-slate-700 mb-1">Pilih Kelas</label>
								<select
									value={selectedClass}
									onChange={(e) => setSelectedClass(e.target.value)}
									className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none text-slate-900 bg-white"
								>
									<option value="SEMUA">Semua Kelas</option>
									{allClasses.map((c: any) => (
										<option key={c.id} value={c.id}>
											{c.nama}
										</option>
									))}
								</select>
							</div>

							{/* DATE PICKER UNTUK RENTANG WAKTU */}
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
								{isDownloading ? "Memproses PDF..." : "Generate Laporan"}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* HIDDEN PDF TEMPLATE */}
			<div style={{ position: "fixed", top: 0, left: 0, zIndex: -9999, opacity: 0, pointerEvents: "none" }}>
				<div id="pdf-literasi-bulk" style={{ backgroundColor: "white" }}>

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
								boxSizing: "border-box",
							}}
						>
							<img
								src="/logo_sekolah.jpg"
								onError={(e) => (e.currentTarget.src = "/logo.jpeg")}
								style={{ width: "140px", height: "140px", marginBottom: "30px", objectFit: "contain" }}
							/>
							<h1 style={{ fontSize: "28pt", fontWeight: "bold", textTransform: "uppercase", marginBottom: "8px" }}>
								LAPORAN KEGIATAN LITERASI
							</h1>
							<div style={{ width: "60px", height: "4px", backgroundColor: "#0f172a", margin: "24px auto" }}></div>
							<p style={{ fontSize: "14pt", fontWeight: "bold" }}>{teksPeriode}</p>
							<p style={{ fontSize: "12pt", marginTop: "8px" }}>
								{selectedClass === "SEMUA"
									? "Semua Kelas Aktif"
									: `Kelas: ${allClasses.find((c: any) => c.id === selectedClass)?.nama}`}
							</p>
							<div style={{ marginTop: "100px" }}>
								<p style={{ fontSize: "14pt", fontWeight: "bold" }}>SMA NEGERI 2 BREBES</p>
							</div>
						</div>
						<PageFooter current={pageCounter++} total={pdfTotalPages} />
					</PageContainer>

					{/* HALAMAN 2+: RINGKASAN DATA KELAS (DENGAN KOLOM NOMOR) */}
					{summaryChunks.map((chunk, chunkIdx) => (
						<div key={`summary-${chunkIdx}`}>
							<div className="html2pdf__page-break"></div>
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
									Ringkasan Data Kelas {summaryChunks.length > 1 ? `(Bag. ${chunkIdx + 1})` : ""}
								</h3>
								<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
									<thead>
										<tr style={{ backgroundColor: "#f1f5f9" }}>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "8%" }}>No</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left" }}>Kelas</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left" }}>Wali Kelas</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>Total Topik</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
												Rata-rata Pengumpulan
											</th>
										</tr>
									</thead>
									<tbody>
										{chunk.map((c: any, cIdx: number) => (
											<tr key={c.id}>
												<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
													{chunkIdx * 20 + cIdx + 1}
												</td>
												<td style={{ border: "1px solid #cbd5e1", padding: "10px", fontWeight: "bold" }}>{c.nama}</td>
												<td style={{ border: "1px solid #cbd5e1", padding: "10px" }}>{c.wali}</td>
												<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>{c.totalTugas}</td>
												<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
													{c.avgSubmission}%
												</td>
											</tr>
										))}
									</tbody>
								</table>
								<PageFooter current={pageCounter++} total={pdfTotalPages} />
							</PageContainer>
						</div>
					))}

					{/* HALAMAN 3+: RINCIAN PENGUMPULAN PER KELAS (DENGAN KOLOM NOMOR) */}
					{filteredData.map((c: any) => {
						if (!c.students || c.students.length === 0) return null;
						// PERBAIKAN: Max 20 siswa per tabel agar tidak terpotong margin kertas
						const studentChunks = chunkArray(c.students, 18);
						return studentChunks.map((studentChunk, chunkIdx) => (
							<div key={`detail-${c.id}-${chunkIdx}`}>
								<div className="html2pdf__page-break"></div>
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
										Rincian Pengumpulan - Kelas {c.nama} {studentChunks.length > 1 ? `(Bag. ${chunkIdx + 1})` : ""}
									</h3>
									<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
										<thead>
											<tr style={{ backgroundColor: "#f1f5f9" }}>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "8%" }}>No</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left" }}>Nama Siswa</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left" }}>NIS</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>Status</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>Tugas Selesai</th>
											</tr>
										</thead>
										<tbody>
											{studentChunk.map((s: any, idx: number) => {
												const isMastered = s.uploaded === s.total && s.total > 0;
												const isOnTrack = s.uploaded >= s.total / 2;
												const statusText = isMastered ? "Mastered" : isOnTrack ? "On Track" : "Behind";
												const statusColor = isMastered ? "#0d9488" : isOnTrack ? "#3b82f6" : "#e11d48";
												return (
													<tr key={idx} style={{ pageBreakInside: "avoid" }}>
														<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
															{chunkIdx * 20 + idx + 1}
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
															{statusText}
														</td>
														<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
															{s.uploaded} / {s.total}
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
									<PageFooter current={pageCounter++} total={pdfTotalPages} />
								</PageContainer>
							</div>
						));
					})}
				</div>
			</div>
		</div>
	);
}