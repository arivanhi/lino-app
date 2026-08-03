// app/pimpinan/numerasi/ClientUI.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, ChevronLeft, ChevronRight, Calculator, User, X, TrendingUp, TrendingDown } from "lucide-react";

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

export default function NumerasiPimpinanClient({ semesterName, cards, allClasses, currentPage, totalPages }: any) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedClass, setSelectedClass] = useState("SEMUA");
	const [jangkaWaktu, setJangkaWaktu] = useState("SEMESTER");
	const [isDownloading, setIsDownloading] = useState(false);

	const handleDownload = async () => {
		setIsDownloading(true);
		const html2pdf = (await import("html2pdf.js")).default;
		const element = document.getElementById("pdf-numerasi-bulk");

		const opt = {
			margin: 0,
			filename: `Laporan_Numerasi_${semesterName.replace(/\s/g, "_")}.pdf`,
			image: { type: "jpeg", quality: 1 },
			html2canvas: { scale: 2, useCORS: true },
			jsPDF: { unit: "mm", format: "a4", orientation: "landscape" }, // Landscape agar muat banyak kolom tugas
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
	const teksPeriode =
		jangkaWaktu === "SEMESTER"
			? `Semester ${semesterName}`
			: jangkaWaktu === "1 BULAN"
				? "1 Bulan Terakhir"
				: "2 Bulan Terakhir";

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 relative">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
				<div>
					<h1 className="text-3xl font-bold text-slate-900">Manajemen Numerasi</h1>
					<p className="text-slate-500 mt-1">Pantau dan kelola performa numerasi untuk setiap kelas.</p>
				</div>
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

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-8">
					<Link
						href={`/pimpinan/numerasi?page=${currentPage - 1}`}
						className={`flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold ${currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-slate-50"}`}
					>
						<ChevronLeft className="h-4 w-4" /> Previous
					</Link>
					<span className="text-sm font-bold text-slate-900">
						Page {currentPage} of {totalPages}
					</span>
					<Link
						href={`/pimpinan/numerasi?page=${currentPage + 1}`}
						className={`flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold ${currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-slate-50"}`}
					>
						Next <ChevronRight className="h-4 w-4" />
					</Link>
				</div>
			)}

			{/* MODAL DOWNLOAD */}
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
								{isDownloading ? "Memproses PDF..." : "Generate Laporan"}
							</button>
						</div>
					</div>
				</div>
			)}

			{/* HIDDEN PDF TEMPLATE (LANDSCAPE KARENA TABEL NILAI LEBAR) */}
			<div style={{ position: "fixed", top: 0, left: 0, zIndex: -9999, opacity: 0, pointerEvents: "none" }}>
				<div
					id="pdf-numerasi-bulk"
					style={{ width: "297mm", backgroundColor: "white", color: "black", boxSizing: "border-box" }}
				>
					{/* Halaman 1: Cover */}
					<div
						style={{
							height: "190mm",
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
							LAPORAN NUMERASI
						</h1>
						<div style={{ width: "50px", height: "4px", backgroundColor: "#0f172a", margin: "24px auto" }}></div>
						<p style={{ fontSize: "18px", fontWeight: "600" }}>{teksPeriode}</p>
						<p style={{ fontSize: "16px", marginTop: "8px" }}>
							{selectedClass === "SEMUA"
								? "Semua Kelas Aktif"
								: `Kelas: ${allClasses.find((c: any) => c.id === selectedClass)?.nama}`}
						</p>
						<p style={{ fontSize: "14px", marginTop: "auto", fontWeight: "bold" }}>SMA NEGERI 2 BREBES</p>
					</div>

					{/* Halaman 2: Rata-Rata Global */}
					<div className="html2pdf__page-break"></div>
					<div style={{ padding: "0 20mm 15mm 20mm" }}>
						<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
							<thead style={{ display: "table-header-group" }}>
								<tr>
									<td colSpan={4} style={{ paddingTop: "20px" }}>
										<KopSurat />
									</td>
								</tr>
								<tr>
									<td colSpan={4} style={{ textAlign: "center", padding: "10px 0 20px 0" }}>
										<h3 style={{ fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", margin: 0 }}>
											Ringkasan Nilai Numerasi Kelas
										</h3>
									</td>
								</tr>
								<tr style={{ backgroundColor: "#f1f5f9" }}>
									<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left" }}>Kelas</th>
									<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left" }}>Wali Kelas</th>
									<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>Sesi Tugas</th>
									<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>Rata-rata Kelas</th>
								</tr>
							</thead>
							<tbody>
								{filteredData.map((c: any) => (
									<tr key={c.id}>
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
					</div>

					{/* Halaman 3+: Data Siswa Per Kelas */}
					{filteredData.map((c: any) => (
						<div key={`det-${c.id}`} style={{ padding: "0 20mm 15mm 20mm", pageBreakBefore: "always" }}>
							<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
								<thead style={{ display: "table-header-group" }}>
									<tr>
										<td colSpan={c.tasks.length + 3} style={{ paddingTop: "20px" }}>
											<KopSurat />
										</td>
									</tr>
									<tr>
										<td colSpan={c.tasks.length + 3} style={{ textAlign: "center", padding: "10px 0 20px 0" }}>
											<h3 style={{ fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", margin: 0 }}>
												Rincian Nilai - Kelas {c.nama}
											</h3>
										</td>
									</tr>
									<tr style={{ backgroundColor: "#f1f5f9" }}>
										<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "left" }}>Nama Siswa</th>
										<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "left" }}>NIS</th>
										{c.tasks.map((t: any) => (
											<th key={t.id} style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center" }}>
												{t.judul}
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
											Rata-rata
										</th>
									</tr>
								</thead>
								<tbody>
									{c.students?.map((s: any, idx: number) => (
										<tr key={idx}>
											<td style={{ border: "1px solid #cbd5e1", padding: "8px", fontWeight: "bold" }}>{s.nama}</td>
											<td style={{ border: "1px solid #cbd5e1", padding: "8px" }}>{s.nis}</td>
											{c.tasks.map((t: any) => (
												<td
													key={t.id}
													style={{
														border: "1px solid #cbd5e1",
														padding: "8px",
														textAlign: "center",
														color: s.scores[t.id] !== null && s.scores[t.id] < 50 ? "red" : "black",
													}}
												>
													{s.scores[t.id] !== null ? s.scores[t.id] : "-"}
												</td>
											))}
											<td
												style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center", fontWeight: "bold" }}
											>
												{s.average}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
