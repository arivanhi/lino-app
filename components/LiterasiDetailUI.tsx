// components/LiterasiDetailUI.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Eye, X, BookOpen, AlertCircle, CheckCircle, Clock, FileText } from "lucide-react";

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

export default function LiterasiDetailUI({ kelasNama, waliKelas, semesterName, tasks, students, backUrl }: any) {
	const router = useRouter();
	const [isExportModalOpen, setIsExportModalOpen] = useState(false);
	const [jangkaWaktu, setJangkaWaktu] = useState("SEMESTER");
	const [isDownloading, setIsDownloading] = useState(false);

	const [selectedStudent, setSelectedStudent] = useState<any>(null);
	const [search, setSearch] = useState("");

	const filteredStudents = students.filter(
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
		setIsDownloading(true);
		const html2pdf = (await import("html2pdf.js")).default;
		const element = document.getElementById("pdf-literasi-detail");

		const opt = {
			margin: 0,
			filename: `Detail_Literasi_${kelasNama}_${semesterName.replace(/\s/g, "_")}.pdf`,
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
				setIsExportModalOpen(false);
			});
	};

	const openPdf = (base64: string) => {
		const pdfWindow = window.open("");
		if (pdfWindow) pdfWindow.document.write(`<iframe width='100%' height='100%' src='${base64}'></iframe>`);
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
				<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
					<table className="w-full text-sm text-left">
						<thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs">
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

			{/* STUDENT PROGRESS */}
			<div>
				<div className="flex justify-between items-end mb-4">
					<h3 className="text-lg font-bold text-slate-900">Student Progress</h3>
					<input
						type="text"
						placeholder="Search student..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="px-4 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-slate-500 w-64"
					/>
				</div>
				<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
					<table className="w-full text-sm text-left">
						<thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 text-xs">
							<tr>
								<th className="py-3 px-5">Student Name</th>
								<th className="py-3 px-5">NIS</th>
								<th className="py-3 px-5 text-center">Tasks Uploaded</th>
								<th className="py-3 px-5 text-center">Status</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{filteredStudents.map((s: any) => (
								<tr key={s.siswaId} className="hover:bg-slate-50 cursor-pointer" onClick={() => setSelectedStudent(s)}>
									<td className="py-3 px-5 font-bold text-slate-800 flex items-center gap-3">
										<div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
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
											<span className="flex items-center gap-1 bg-teal-50 text-teal-600 text-xs font-bold px-2.5 py-1 rounded-full">
												<CheckCircle className="h-3.5 w-3.5" /> Mastered
											</span>
										)}
										{s.status === "On Track" && (
											<span className="flex items-center gap-1 bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full">
												<Clock className="h-3.5 w-3.5" /> On Track
											</span>
										)}
										{s.status === "Behind" && (
											<span className="flex items-center gap-1 bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full">
												<AlertCircle className="h-3.5 w-3.5" /> Behind
											</span>
										)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* MODAL TUGAS SISWA */}
			{selectedStudent && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
							<div>
								<h2 className="text-lg font-bold text-slate-900">Riwayat Upload</h2>
								<p className="text-xs font-semibold text-slate-500">{selectedStudent.nama}</p>
							</div>
							<button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-slate-600">
								<X className="h-5 w-5" />
							</button>
						</div>
						<div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
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
												className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-teal-50 text-teal-600"
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

			{/* MODAL PILIH BULAN EXPORT PDF */}
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

			{/* HIDDEN PDF TEMPLATE PORTRAIT */}
			<div style={{ position: "fixed", top: 0, left: 0, zIndex: -9999, opacity: 0, pointerEvents: "none" }}>
				<div
					id="pdf-literasi-detail"
					style={{ width: "210mm", backgroundColor: "white", color: "black", boxSizing: "border-box" }}
				>
					<div
						style={{
							height: "277mm",
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
						<p style={{ fontSize: "14px", marginTop: "auto", fontWeight: "bold" }}>SMA NEGERI 2 BREBES</p>
					</div>

					<div className="html2pdf__page-break"></div>
					<div style={{ padding: "0 20mm 15mm 20mm" }}>
						<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
							<thead style={{ display: "table-header-group" }}>
								<tr>
									<td colSpan={2}>
										<KopSurat />
									</td>
								</tr>
								<tr>
									<td colSpan={2} style={{ textAlign: "center", padding: "10px 0 20px 0" }}>
										<h3 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>Topik Penugasan Literasi</h3>
									</td>
								</tr>
								<tr style={{ backgroundColor: "#f1f5f9" }}>
									<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "left" }}>Judul Topik</th>
									<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center" }}>Status Penugasan</th>
								</tr>
							</thead>
							<tbody>
								{tasks.map((t: any) => (
									<tr key={t.id}>
										<td style={{ border: "1px solid #cbd5e1", padding: "8px", fontWeight: "bold" }}>{t.judul}</td>
										<td style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center" }}>
											{t.status === "SELESAI" ? "Selesai" : "Aktif"}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className="html2pdf__page-break"></div>
					<div style={{ padding: "0 20mm 15mm 20mm" }}>
						<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
							<thead style={{ display: "table-header-group" }}>
								<tr>
									<td colSpan={4}>
										<KopSurat />
									</td>
								</tr>
								<tr>
									<td colSpan={4} style={{ textAlign: "center", padding: "10px 0 20px 0" }}>
										<h3 style={{ fontSize: "18px", fontWeight: "bold", margin: 0 }}>Detail Progress Siswa</h3>
									</td>
								</tr>
								<tr style={{ backgroundColor: "#f1f5f9" }}>
									<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "left" }}>Nama Siswa</th>
									<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "left" }}>NIS</th>
									<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center" }}>Status</th>
									<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center" }}>Tugas Selesai</th>
								</tr>
							</thead>
							<tbody>
								{students.map((s: any, idx: number) => {
									const statusColor =
										s.status === "Mastered" ? "#0d9488" : s.status === "On Track" ? "#3b82f6" : "#e11d48";
									return (
										<tr key={idx}>
											<td style={{ border: "1px solid #cbd5e1", padding: "8px", fontWeight: "bold" }}>{s.nama}</td>
											<td style={{ border: "1px solid #cbd5e1", padding: "8px" }}>{s.nis}</td>
											<td
												style={{
													border: "1px solid #cbd5e1",
													padding: "8px",
													textAlign: "center",
													fontWeight: "bold",
													color: statusColor,
												}}
											>
												{s.status}
											</td>
											<td
												style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center", fontWeight: "bold" }}
											>
												{s.uploaded} / {tasks.length}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
