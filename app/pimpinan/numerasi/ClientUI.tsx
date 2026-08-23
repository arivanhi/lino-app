// app/pimpinan/numerasi/ClientUI.tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Download, ChevronLeft, ChevronRight, Calculator, User, X, TrendingUp, TrendingDown, Search } from "lucide-react";
import ClassFilter from "../../components/ClassFilter";


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
	const width = isPortrait ? "210mm" : "297mm";
	// Sedikit dikurangi agar aman dari micro-overflow yang bikin halaman kosong
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

export default function NumerasiPimpinanClient({ semesterName, cards, allClasses, currentPage, totalPages, tab, q }: any) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

	// STATE DATE PICKER
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [isDownloading, setIsDownloading] = useState(false);

	const handleDownload = async () => {
		if (!startDate || !endDate) {
			alert("Silakan pilih Tanggal Mulai dan Tanggal Selesai terlebih dahulu.");
			return;
		}

		setIsDownloading(true);
		setTimeout(async () => {
			try {
				const html2pdf = (await import("html2pdf.js")).default;
				const element = document.getElementById("pdf-numerasi-bulk");

				const opt = {
					margin: 0, // KUNCI: Margin 0 agar patuh pada PageContainer
					filename: `Laporan_Numerasi_${semesterName.replace(/\s/g, "_")}.pdf`,
					image: { type: "jpeg", quality: 1 },
					html2canvas: { scale: 2, useCORS: true },
					jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
					pagebreak: { mode: ["css"] },
				};

				await html2pdf().set(opt).from(element).save();
			} catch (error) {
				console.error("Gagal men-generate PDF:", error);
				alert("Terjadi kesalahan saat memproses laporan PDF.");
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

	const filteredData = selectedClasses.length === 0 ? availableClassesForExport : availableClassesForExport.filter((c: any) => selectedClasses.includes(c.id));

	const formatD = (dStr: string) => new Date(dStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
	const teksPeriode = (!startDate || !endDate) ? `Semester ${semesterName}` : `Periode: ${formatD(startDate)} s.d. ${formatD(endDate)}`;

	// ============================================================================
	// PAGINATION DATA PDF (MAKSIMAL 10 BARIS AGAR TIDAK TERPOTONG)
	// ============================================================================
	const PDF_MAX_ROWS = 10;
	const globalChunks = chunkArray(filteredData, PDF_MAX_ROWS);

	let pdfTotalPages = 1 + globalChunks.length;
	filteredData.forEach((c: any) => {
		if (c.students) {
			pdfTotalPages += Math.ceil(c.students.length / PDF_MAX_ROWS);
		}
	});

	let pageCounter = 1;

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 relative">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
				<div>
					<h1 className="text-3xl font-bold text-slate-900">Manajemen Numerasi</h1>
					<p className="text-slate-500 mt-1 mb-6">Pantau dan kelola performa numerasi untuk setiap kelas.</p>
				</div>
				<ClassFilter />
				<button
					onClick={() => setIsModalOpen(true)}
					className="px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 flex items-center gap-2"
				>
					<Download className="h-4 w-4" /> Export Laporan Numerasi
				</button>
			</div>

			{/* Grid 6 Card */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
				{cards.map((k: any) => (
					<div
						key={k.id}
						className="bg-white rounded-2xl border-l-4 border-l-teal-400 border-y border-r border-slate-200 shadow-sm p-6 hover:shadow-md transition-all flex flex-col"
					>
						<div className="flex justify-between items-start mb-4">
							<h2 className="text-xl font-bold text-slate-800">Kelas {k.nama}</h2>
							<span className="bg-teal-50 text-teal-600 text-xs font-bold px-2.5 py-1 rounded-md">Aktif</span>
						</div>
						<div className="space-y-3 mb-6 flex-1">
							<div className="flex items-center gap-2 text-sm text-slate-600">
								<Calculator className="h-4 w-4 text-amber-500" />
								<span>
									Total Tugas: <strong>{k.totalTugas} Tugas</strong>
								</span>
							</div>
							<div className="flex items-center gap-2 text-sm text-slate-600">
								{Number(k.avgKelas) >= 70 ? (
									<TrendingUp className="h-4 w-4 text-teal-600" />
								) : (
									<TrendingDown className="h-4 w-4 text-red-500" />
								)}
								<span>
									Rata-rata Nilai:{" "}
									<strong className={Number(k.avgKelas) >= 70 ? "text-teal-700" : "text-red-600"}>{k.avgKelas}</strong>
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
								href={`/pimpinan/numerasi/${k.id}`}
								className="text-sm font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1"
							>
								Lihat Detail <ChevronRight className="h-4 w-4" />
							</Link>
						</div>
					</div>
				))}
			</div>

			{/* Pagination Web UI Cards */}
			{totalPages > 1 && (
				<div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-8">
					<Link
						href={`/pimpinan/numerasi?page=${currentPage - 1}${tab !== "Semua Kelas" ? `&tab=${tab}` : ""}${q ? `&q=${q}` : ""}`}
						className={`flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-800 transition-colors ${currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-slate-50"}`}
					>
						<ChevronLeft className="h-4 w-4" /> Sebelumnya
					</Link>
					<span className="text-sm font-bold text-slate-900">
						Halaman {currentPage} dari {totalPages}
					</span>
					<Link
						href={`/pimpinan/numerasi?page=${currentPage + 1}${tab !== "Semua Kelas" ? `&tab=${tab}` : ""}${q ? `&q=${q}` : ""}`}
						className={`flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-800 transition-colors ${currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-slate-50"}`}
					>
						Selanjutnya <ChevronRight className="h-4 w-4" />
					</Link>
				</div>
			)}


			{/* MODAL DOWNLOAD DENGAN DATE PICKER */}
			{isModalOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
							<h2 className="text-lg font-bold text-slate-800 border-l-4 border-teal-600 pl-2">
								Export Laporan Numerasi
							</h2>
							<button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
								<X className="h-5 w-5" />
							</button>
						</div>
						<div className="p-6 space-y-4">
							<div>
								<label className="block text-xs font-bold text-slate-700 mb-1">Pilih Kelas</label>
								<div className="border border-slate-300 rounded-lg p-3 bg-white max-h-40 overflow-y-auto space-y-2">
									<label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
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
											className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
										/>
										Pilih Semua (Tab {tab})
									</label>
									<hr className="border-slate-100" />
									{availableClassesForExport.map((c: any) => (
										<label key={c.id} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:bg-slate-50 p-1 rounded">
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
												className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
											/>
											{c.nama}
										</label>
									))}
								</div>
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
								{isDownloading ? "Memproses PDF..." : "Generate Laporan"}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* HIDDEN PDF TEMPLATE (LANDSCAPE 18 BARIS) */}
			<div style={{ position: "fixed", top: 0, left: 0, zIndex: -9999, opacity: 0, pointerEvents: "none" }}>
				<div id="pdf-numerasi-bulk" style={{ backgroundColor: "white" }}>

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
								LAPORAN NUMERASI
							</h1>
							<div style={{ width: "50px", height: "4px", backgroundColor: "#0f172a", margin: "24px auto" }}></div>
							<p style={{ fontSize: "18px", fontWeight: "600" }}>{teksPeriode}</p>
							<p style={{ fontSize: "12pt", marginTop: "8px" }}>
								{selectedClasses.length === 0 || selectedClasses.length === availableClassesForExport.length
									? (tab === "Semua Kelas" ? "Semua Kelas Aktif" : `Semua Kelas ${tab}`)
									: `Kelas: ${availableClassesForExport.filter((c: any) => selectedClasses.includes(c.id)).map((c: any) => c.nama).join(", ")}`}
							</p>
							<div style={{ marginTop: "auto" }}>
								<p style={{ fontSize: "14px", fontWeight: "bold" }}>SMA NEGERI 2 BREBES</p>
							</div>
						</div>
						<PageFooter current={pageCounter++} total={pdfTotalPages} />
					</PageContainer>
					<div className="html2pdf__page-break"></div>

					{/* Halaman 2: Rata-Rata Global */}
					{globalChunks.map((chunk, chunkIdx) => (
						<div key={`global-page-${chunkIdx}`}>
							<PageContainer orientation="landscape" isLast={false}>
								<KopSurat />
								<h3 style={{ fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", textAlign: "center", marginBottom: "20px" }}>
									Ringkasan Nilai Numerasi Kelas {globalChunks.length > 1 ? `(Bag. ${chunkIdx + 1})` : ""}
								</h3>
								<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
									<thead>
										<tr style={{ backgroundColor: "#f1f5f9" }}>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "5%" }}>No</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left", width: "30%" }}>Kelas</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left", width: "35%" }}>Wali Kelas</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "15%" }}>Sesi Tugas</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "15%" }}>Rata-rata Kelas</th>
										</tr>
									</thead>
									<tbody>
										{chunk.map((c: any, idx: number) => (
											<tr key={c.id} style={{ pageBreakInside: "avoid" }}>
												<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>{chunkIdx * PDF_MAX_ROWS + idx + 1}</td>
												<td style={{ border: "1px solid #cbd5e1", padding: "10px", fontWeight: "bold" }}>{c.nama}</td>
												<td style={{ border: "1px solid #cbd5e1", padding: "10px" }}>{c.wali}</td>
												<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
													{c.totalTugas}
												</td>
												<td
													style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", fontWeight: "bold" }}
												>
													{c.avgKelas}
												</td>
											</tr>
										))}
									</tbody>
								</table>
								<PageFooter current={pageCounter++} total={pdfTotalPages} />
							</PageContainer>
							<div className="html2pdf__page-break"></div>
						</div>
					))}

					{/* Halaman 3+: Data Siswa Per Kelas (PAGINATION 18 BARIS) */}
					{filteredData.map((c: any, kIndex: number) => {
						// Urutkan siswa sesuai Abjad untuk PDF
						const sortedSiswa = [...c.students].sort((a: any, b: any) => a.nama.localeCompare(b.nama));
						const classStudentChunks = chunkArray(sortedSiswa, PDF_MAX_ROWS);

						return classStudentChunks.map((chunk, chunkIdx) => {
							const isVeryLastPage = (kIndex === filteredData.length - 1) && (chunkIdx === classStudentChunks.length - 1);

							return (
								<div key={`det-${c.id}-page-${chunkIdx}`}>
									<PageContainer orientation="landscape" isLast={isVeryLastPage}>
										<KopSurat />
										<h3 style={{ fontSize: "14pt", fontWeight: "bold", textTransform: "uppercase", textAlign: "center", marginBottom: "20px" }}>
											Rincian Nilai - Kelas {c.nama} {classStudentChunks.length > 1 ? `(Bag. ${chunkIdx + 1})` : ""}
										</h3>
										<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
											<thead>
												<tr style={{ backgroundColor: "#f1f5f9" }}>
													<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "5%" }}>No</th>
													<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left", width: "35%" }}>Nama Siswa</th>
													<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left", width: "15%" }}>NIS</th>
													{c.tasks.map((t: any) => (
														<th key={t.id} style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
															{t.judul}
														</th>
													))}
													<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", backgroundColor: "#e2e8f0" }}>
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
														{c.tasks.map((t: any) => {
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
						});
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