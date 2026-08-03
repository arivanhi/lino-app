// app/pimpinan/riwayat/ClientUI.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, ChevronLeft, ChevronRight, X } from "lucide-react";

type StudentData = { nama: string; nis: string; litCompleted: number; litTotal: number; numAvg: number };
type ClassData = { id: string; nama: string; literasi: number; numerasi: number; students?: StudentData[] };

// Komponen Kop Surat Independen (Bukan bagian dari Tabel)
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

export default function RiwayatClientUI({
	semesterName,
	cards,
	allClasses,
	currentPage,
	totalPages,
}: {
	semesterName: string;
	cards: ClassData[];
	allClasses: ClassData[];
	currentPage: number;
	totalPages: number;
}) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedClass, setSelectedClass] = useState("SEMUA");
	const [jangkaWaktu, setJangkaWaktu] = useState("SEMESTER");
	const [isDownloading, setIsDownloading] = useState(false);

	const getStatus = (lit: number, num: number) => {
		const avg = (lit + num) / 2;
		if (avg >= 85) return { text: "Sangat Mahir", color: "text-teal-600 bg-teal-50" };
		if (avg >= 70) return { text: "Memadai", color: "text-blue-600 bg-blue-50" };
		return { text: "Perlu Intervensi", color: "text-red-600 bg-red-50" };
	};

	const handleDownload = async () => {
		setIsDownloading(true);
		const html2pdf = (await import("html2pdf.js")).default;
		const element = document.getElementById("pdf-bulk-report");
		if (!element) return;

		const opt = {
			margin: 0, // Set margin ke 0 karena padding sudah diatur di dalam elemen HTML
			filename: `Laporan_Lino_${semesterName.replace(/\s/g, "_")}.pdf`,
			image: { type: "jpeg", quality: 1 },
			html2canvas: { scale: 2, useCORS: true },
			jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
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

	const filteredDataPdf = selectedClass === "SEMUA" ? allClasses : allClasses.filter((c) => c.id === selectedClass);

	const teksPeriode =
		jangkaWaktu === "SEMESTER"
			? `Semester ${semesterName}`
			: jangkaWaktu === "1 BULAN"
				? "1 Bulan Terakhir"
				: "2 Bulan Terakhir";

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
				<div>
					<h1 className="text-3xl font-bold text-slate-900">Riwayat Lino</h1>
					<p className="text-slate-500 mt-1">Review historical literacy and numeracy performance across classes.</p>
				</div>
				<div className="flex gap-4 items-end">
					<div>
						<label className="block text-xs font-bold text-slate-500 mb-1">Semester</label>
						<select
							disabled
							className="px-4 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 font-semibold text-slate-700"
						>
							<option>{semesterName}</option>
						</select>
					</div>
					<button
						onClick={() => setIsModalOpen(true)}
						className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 flex items-center gap-2"
					>
						<Download className="h-4 w-4" /> Download Laporan
					</button>
				</div>
			</div>

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

			{totalPages > 1 && (
				<div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-8">
					<Link
						href={`/pimpinan/riwayat?page=${currentPage - 1}`}
						className={`flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold ${currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-slate-50"}`}
					>
						<ChevronLeft className="h-4 w-4" /> Previous
					</Link>
					<span className="text-sm font-bold text-slate-900">
						{currentPage} / {totalPages}
					</span>
					<Link
						href={`/pimpinan/riwayat?page=${currentPage + 1}`}
						className={`flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold ${currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-slate-50"}`}
					>
						Next <ChevronRight className="h-4 w-4" />
					</Link>
				</div>
			)}

			{/* --- MODAL DOWNLOAD --- */}
			{isModalOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
							<h2 className="text-lg font-bold text-slate-800 border-l-4 border-slate-900 pl-2">Download Laporan</h2>
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
									{allClasses.map((c) => (
										<option key={c.id} value={c.id}>
											{c.nama}
										</option>
									))}
								</select>
							</div>
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
								{isDownloading ? "Memproses PDF..." : "Export Laporan PDF"}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* --- HIDDEN PDF TEMPLATE --- */}
			<div style={{ display: "none" }}>
				<div id="pdf-bulk-report" style={{ width: "210mm", backgroundColor: "white", color: "black" }}>
					{/* HALAMAN 1: COVER FULL HALAMAN */}
					<div
						style={{
							height: "240mm",
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
							LAPORAN EVALUASI
						</h1>
						<h2 style={{ fontSize: "22pt", fontWeight: "bold", color: "#0f172a" }}>LITERASI & NUMERASI</h2>
						<div style={{ width: "60px", height: "4px", backgroundColor: "#0f172a", margin: "24px auto" }}></div>

						<p style={{ fontSize: "14pt", fontWeight: "bold" }}>{teksPeriode}</p>
						<p style={{ fontSize: "12pt", marginTop: "8px" }}>
							{selectedClass === "SEMUA"
								? "Semua Kelas"
								: `Kelas: ${allClasses.find((c) => c.id === selectedClass)?.nama}`}
						</p>

						<p style={{ fontSize: "14pt", marginTop: "100px", fontWeight: "bold" }}>SMA NEGERI 2 BREBES</p>
					</div>

					<div className="html2pdf__page-break"></div>

					{/* HALAMAN 2: RINGKASAN GLOBAL */}
					<div style={{ padding: "15mm 20mm" }}>
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
							Ringkasan Nilai ({teksPeriode})
						</h3>
						<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
							<thead>
								<tr style={{ backgroundColor: "#f1f5f9" }}>
									<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left" }}>Kelas</th>
									<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
										% Literasi Terkumpul
									</th>
									<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
										Rata-rata Numerasi
									</th>
									<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "30%" }}>
										Grafik Numerasi
									</th>
								</tr>
							</thead>
							<tbody>
								{filteredDataPdf.map((c) => (
									<tr key={c.id}>
										<td style={{ border: "1px solid #cbd5e1", padding: "10px", fontWeight: "bold" }}>{c.nama}</td>
										<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>{c.literasi}%</td>
										<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>{c.numerasi}</td>
										<td style={{ border: "1px solid #cbd5e1", padding: "10px", verticalAlign: "middle" }}>
											<svg
												width="100%"
												height="12"
												style={{ backgroundColor: "#e2e8f0", borderRadius: "4px", display: "block" }}
											>
												<rect width={`${c.numerasi}%`} height="12" fill={c.numerasi >= 70 ? "#0d9488" : "#e11d48"} />
											</svg>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* HALAMAN 3+: RINCIAN SISWA PER KELAS */}
					{filteredDataPdf.map((c) => (
						<div key={`detail-${c.id}`}>
							<div className="html2pdf__page-break"></div>
							<div style={{ padding: "15mm 20mm" }}>
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
									Rincian Kelas {c.nama}
								</h3>
								<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
									<thead>
										<tr style={{ backgroundColor: "#f1f5f9" }}>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left" }}>Nama Siswa</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left" }}>NIS</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
												Literasi Selesai
											</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
												Rata-rata Numerasi
											</th>
										</tr>
									</thead>
									<tbody>
										{c.students?.map((s, idx) => (
											<tr key={idx}>
												<td style={{ border: "1px solid #cbd5e1", padding: "10px" }}>{s.nama}</td>
												<td style={{ border: "1px solid #cbd5e1", padding: "10px" }}>{s.nis}</td>
												<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
													{s.litCompleted} / {s.litTotal}
												</td>
												<td
													style={{
														border: "1px solid #cbd5e1",
														padding: "10px",
														textAlign: "center",
														fontWeight: "bold",
													}}
												>
													{s.numAvg}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
