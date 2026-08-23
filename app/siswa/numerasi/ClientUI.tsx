// app/siswa/numerasi/ClientUI.tsx
"use client";

import { useState } from "react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as RechartsTooltip,
	ResponsiveContainer,
} from "recharts";
import {
	Download,
	Search,
	CheckCircle2,
	Clock,
	Calculator,
	ShieldCheck,
	X,
	Eye,
	UploadCloud,
	File,
	AlertCircle,
	HelpCircle,
	RefreshCw,
} from "lucide-react";
import { submitTugasNumerasi } from "./actions";
import { useRouter } from "next/navigation";
import { useRef } from "react";

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
					Website:  sman2brebes.sch.id - Email:  smandabes@gmail.com
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

// Tambahkan prop kelasNama di sini
export default function NumerasiSiswaUI({ siswaId, kelasId, studentName, kelasNama, semesterName, stats, chartData, historyData }: any) {
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [isDownloading, setIsDownloading] = useState(false);

	const filteredHistory = historyData.filter((item: any) =>
		item.judul.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	// === STATE MODAL UPLOAD ===
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
	const [selectedTask, setSelectedTask] = useState<any>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [errorMsg, setErrorMsg] = useState("");
	const [isDragging, setIsDragging] = useState(false);
	const [isConfirming, setIsConfirming] = useState(false);
	const [isUploading, setIsUploading] = useState(false);

	// === STATE TOAST NOTIFICATION ===
	const [toastMessage, setToastMessage] = useState("");

	const fileInputRef = useRef<HTMLInputElement>(null);
	const MAX_FILE_SIZE_MB = 5;

	const openUploadModal = (task: any) => {
		setSelectedTask(task);
		setSelectedFile(null);
		setErrorMsg("");
		setIsConfirming(false);
		setIsUploading(false);
		setIsUploadModalOpen(true);
	};

	const closeUploadModal = () => {
		setIsUploadModalOpen(false);
		setSelectedFile(null);
		setErrorMsg("");
		setIsConfirming(false);
		setTimeout(() => setSelectedTask(null), 200);
	};

	const handleFileSelect = (file: File | undefined) => {
		setErrorMsg("");
		if (!file) return;

		if (file.type !== "application/pdf") {
			setErrorMsg("Format file harus PDF.");
			return;
		}
		if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
			setErrorMsg(`Ukuran file melebihi batas maksimal (${MAX_FILE_SIZE_MB}MB).`);
			return;
		}
		setSelectedFile(file);
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(true);
	};
	const handleDragLeave = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
	};
	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		setIsDragging(false);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFileSelect(e.dataTransfer.files[0]);
	};
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) handleFileSelect(e.target.files[0]);
	};

	const handleRequestUpload = () => {
		if (!selectedFile) {
			setErrorMsg("Pilih file terlebih dahulu.");
			return;
		}
		setIsConfirming(true);
	};

	const handleUploadSubmit = () => {
		setIsUploading(true);

		try {
			const reader = new FileReader();

			reader.onloadend = async () => {
				const base64String = reader.result as string;

				try {
					await submitTugasNumerasi(selectedTask.id, siswaId, selectedFile!.name, base64String, kelasId);

					setIsUploading(false);
					closeUploadModal();

					setToastMessage(`Berhasil! Jawaban untuk "${selectedTask.judul}" telah diunggah.`);
					setTimeout(() => setToastMessage(""), 4000);

					router.refresh();
				} catch (serverError) {
					setIsUploading(false);
					setErrorMsg("Gagal menyimpan tugas ke database. Coba lagi.");
				}
			};

			reader.onerror = () => {
				setIsUploading(false);
				setErrorMsg("Gagal membaca file dari komputer Anda.");
			};

			reader.readAsDataURL(selectedFile!);
		} catch (error) {
			setIsUploading(false);
			setErrorMsg("Terjadi kesalahan sistem saat memproses file.");
		}
	};

	const handleDownloadPdf = async () => {
		setIsDownloading(true);
		const html2pdf = (await import("html2pdf.js")).default;
		const element = document.getElementById("pdf-numerasi-siswa");

		const opt = {
			margin: 0,
			filename: `Laporan_Numerasi_${studentName.replace(/\s/g, "_")}_${semesterName.replace(/\s/g, "_")}.pdf`,
			image: { type: "jpeg", quality: 1 },
			html2canvas: { scale: 2, useCORS: true },
			jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
			pagebreak: { mode: ["css", "legacy"] },
		};

		html2pdf()
			.set(opt)
			.from(element)
			.save()
			.then(() => setIsDownloading(false));
	};

	// Pagination
	const historyChunks = chunkArray(historyData, 15);
	const totalPages = 1 + historyChunks.length; // Cover + History Tables
	let pageCounter = 1;

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 relative">
			{/* === TOAST NOTIFICATION COMPONENT === */}
			{toastMessage && (
				<div className="fixed top-6 right-6 z-[200] animate-in slide-in-from-top-5 fade-in duration-300">
					<div className="bg-teal-600 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 font-semibold text-sm">
						<CheckCircle2 className="h-5 w-5 text-teal-200" />
						{toastMessage}
					</div>
				</div>
			)}

			{/* HEADER */}
			<div>
				<h1 className="text-3xl font-black text-slate-900 tracking-tight">Daftar Nilai Numerasi</h1>
				<p className="text-slate-500 font-medium mt-1">
					Pantau hasil asesmen numerasi dan perkembangan kemampuan berhitung Anda.
				</p>
			</div>

			{/* STATS CARDS */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
					<Calculator className="absolute -right-4 -bottom-4 h-24 w-24 text-slate-50 opacity-60" />
					<div className="relative z-10">
						<p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Rata-Rata Nilai</p>
						<div className="flex items-baseline gap-3 mb-4">
							<span className="text-5xl font-black text-slate-900">{stats.average}</span>
							{stats.average >= 70 && (
								<span className="bg-teal-100 text-teal-700 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
									Lulus
								</span>
							)}
						</div>
					</div>
					<p className="text-sm font-medium text-slate-500 relative z-10 border-t border-slate-100 pt-3">
						Dari {stats.selesai} Asesmen terakhir
					</p>
				</div>

				<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
					<div className="relative z-10">
						<p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Asesmen Selesai</p>
						<span className="text-5xl font-black text-slate-900">{stats.selesai}</span>

						<div className="w-full bg-slate-100 rounded-full h-2 mt-4 mb-2">
							<div
								className="bg-slate-900 h-2 rounded-full transition-all duration-1000"
								style={{ width: `${stats.totalAsesmen > 0 ? (stats.selesai / stats.totalAsesmen) * 100 : 0}%` }}
							></div>
						</div>
					</div>
					<p className="text-sm font-medium text-slate-500 relative z-10 text-right">
						{stats.totalAsesmen > 0 ? Math.round((stats.selesai / stats.totalAsesmen) * 100) : 0}% Target Semester
					</p>
				</div>

				<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
					<ShieldCheck className="absolute -right-4 -bottom-4 h-24 w-24 text-slate-50 opacity-60" />
					<div className="relative z-10">
						<p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Predikat</p>
						<span className={`text-4xl font-black ${stats.average >= 70 ? "text-slate-900" : "text-amber-600"}`}>
							{stats.predikat}
						</span>
					</div>
					<p
						className={`text-sm font-bold flex items-center gap-1.5 relative z-10 border-t border-slate-100 pt-3 ${stats.average >= 70 ? "text-teal-600" : "text-amber-600"}`}
					>
						<CheckCircle2 className="h-4 w-4" /> {stats.predikatDesc}
					</p>
				</div>
			</div>

			{/* CHART SECTION */}
			<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
				<div className="flex justify-between items-center mb-6">
					<h3 className="font-bold text-slate-900 text-lg">Tren Perkembangan Numerasi</h3>
					<button
						onClick={handleDownloadPdf}
						disabled={isDownloading}
						className="text-sm font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 rounded-lg transition-colors"
					>
						<Download className="h-4 w-4" /> {isDownloading ? "Mengekspor..." : "Export Laporan"}
					</button>
				</div>
				<div className="h-[300px] w-full">
					{chartData.length === 0 ? (
						<div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
							<Calculator className="h-12 w-12 mb-3 opacity-50" />
							<p className="font-semibold italic">Belum ada data nilai numerasi untuk menampilkan tren.</p>
						</div>
					) : (
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
								<defs>
									<linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#0d9488" stopOpacity={0.2} />
										<stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
									</linearGradient>
								</defs>
								<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
								<XAxis
									dataKey="name"
									axisLine={false}
									tickLine={false}
									tick={{ fill: "#64748b", fontSize: 12 }}
									dy={10}
								/>
								<YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
								<RechartsTooltip
									contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
								/>
								<Area
									type="monotone"
									dataKey="score"
									stroke="#0d9488"
									strokeWidth={3}
									fillOpacity={1}
									fill="url(#colorScore)"
									activeDot={{ r: 6, fill: "#0d9488", stroke: "#fff", strokeWidth: 2 }}
									dot={{ r: 4, fill: "#fff", stroke: "#0d9488", strokeWidth: 2 }}
								/>
							</AreaChart>
						</ResponsiveContainer>
					)}
				</div>
			</div>

			{/* TABLE SECTION DENGAN SEARCH */}
			<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
				<div className="p-5 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
					<h3 className="font-bold text-slate-900 text-lg">Riwayat Nilai Numerasi</h3>

					<div className="relative w-full sm:w-72">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
						<input
							type="text"
							placeholder="Cari asesmen..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all shadow-sm"
						/>
						{searchTerm && (
							<button
								onClick={() => setSearchTerm("")}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
							>
								<X className="h-4 w-4" />
							</button>
						)}
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full text-sm text-left">
						<thead className="bg-white text-slate-500 font-bold border-b border-slate-200 text-xs tracking-wider uppercase">
							<tr>
								<th className="py-4 px-6 w-16 text-center">No</th>
								<th className="py-4 px-6">Nama Asesmen</th>
								<th className="py-4 px-6 text-center">Tanggal Pelaksanaan</th>
								<th className="py-4 px-6 text-center">Nilai</th>
								<th className="py-4 px-6 text-left">Status</th>
								<th className="py-4 px-6 text-right">Aksi</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{filteredHistory.length === 0 ? (
								<tr>
									<td colSpan={5} className="py-8 text-center text-slate-500 italic">
										Data asesmen tidak ditemukan.
									</td>
								</tr>
							) : (
								filteredHistory.map((h: any, idx: number) => (
									<tr key={h.id} className="hover:bg-slate-50 transition-colors">
										<td className="py-4 px-6 text-center text-slate-500">{idx + 1}</td>
										<td className="py-4 px-6">
											<div className="flex items-center gap-2">
												<div>
													<p className="font-bold text-slate-800">{h.judul}</p>
													{h.deskripsi && <p className="text-xs text-slate-500 mt-0.5">{h.deskripsi}</p>}
												</div>
												{h.soalPdf && (
													<button
														onClick={() => window.open(h.soalPdf, "_blank")}
														className="text-teal-600 hover:text-teal-800 tooltip flex items-center justify-center p-1.5 bg-teal-50 rounded-full ml-2"
														title="Lihat Soal"
													>
														<Eye className="h-4 w-4" />
													</button>
												)}
											</div>
										</td>
										<td className="py-4 px-6 text-center text-slate-500 font-medium">{h.tanggal}</td>
										<td className="py-4 px-6 text-center">
											{h.nilai !== null ? (
												<span className={`text-lg font-black ${h.nilai >= 70 ? "text-teal-600" : "text-red-600"}`}>
													{h.nilai}
												</span>
											) : (
												<span className="text-lg font-black text-slate-300">-</span>
											)}
										</td>
										<td className="py-4 px-6 text-left">
											<span
												className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md ${h.status === "Selesai" ? "bg-teal-50 text-teal-700" : "bg-slate-100 text-slate-600"
													}`}
											>
												{h.status === "Selesai" ? (
													<CheckCircle2 className="h-3.5 w-3.5" />
												) : (
													<Clock className="h-3.5 w-3.5" />
												)}
												{h.status}
											</span>
										</td>
										<td className="py-4 px-6 text-right">
											<div className="flex items-center justify-end gap-2">
												{h.jawabanPdf && (
													<button
														onClick={() => window.open(h.jawabanPdf, "_blank")}
														className="px-3 py-2 bg-slate-100 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-200 tooltip flex items-center gap-2"
														title="Lihat Jawaban"
													>
														<Eye className="h-4 w-4" />
													</button>
												)}
												<button
													onClick={() => openUploadModal(h)}
													className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-2 ${
														h.jawabanPdf
															? "bg-white border border-teal-500 text-teal-600 hover:bg-teal-50"
															: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
													}`}
												>
													{h.jawabanPdf ? (
														<>
															<RefreshCw className="h-4 w-4" /> Ganti Jawaban
														</>
													) : (
														<>
															<UploadCloud className="h-4 w-4" /> Upload Jawaban
														</>
													)}
												</button>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* === MODAL UPLOAD / KONFIRMASI === */}
			{isUploadModalOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
							<div>
								<h2 className="text-lg font-bold text-slate-900">
									{selectedTask?.jawabanPdf ? "Re-Upload Jawaban" : "Upload Jawaban Numerasi"}
								</h2>
								<p className="text-xs font-semibold text-slate-500 truncate max-w-[300px] mt-0.5">
									{selectedTask?.judul}
								</p>
							</div>
							<button
								onClick={closeUploadModal}
								disabled={isUploading}
								className="text-slate-400 hover:text-slate-600 bg-white rounded-full p-1 border border-slate-200 disabled:opacity-50"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						<div className="p-6">
							{!isConfirming ? (
								<>
									{errorMsg && (
										<div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-start gap-2 text-red-600 text-sm font-medium">
											<AlertCircle className="h-5 w-5 shrink-0" />
											<p>{errorMsg}</p>
										</div>
									)}

									<div
										className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[200px] ${
											isDragging
												? "border-teal-500 bg-teal-50"
												: selectedFile
													? "border-slate-200 bg-slate-50"
													: "border-slate-300 hover:border-teal-400 hover:bg-slate-50"
										}`}
										onDragOver={handleDragOver}
										onDragLeave={handleDragLeave}
										onDrop={handleDrop}
										onClick={() => !selectedFile && fileInputRef.current?.click()}
									>
										<input
											type="file"
											ref={fileInputRef}
											onChange={handleFileChange}
											accept="application/pdf"
											className="hidden"
										/>

										{selectedFile ? (
											<div className="w-full flex flex-col items-center">
												<div className="w-16 h-16 bg-white border border-slate-200 rounded-xl flex items-center justify-center mb-3 shadow-sm">
													<File className="h-8 w-8 text-teal-600" />
												</div>
												<p className="text-sm font-bold text-slate-800 truncate max-w-full px-4">{selectedFile.name}</p>
												<p className="text-xs font-medium text-slate-500 mt-1">
													{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
												</p>
												<button
													onClick={(e) => {
														e.stopPropagation();
														setSelectedFile(null);
													}}
													className="mt-4 px-4 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
												>
													Hapus File
												</button>
											</div>
										) : (
											<>
												<div className="w-14 h-14 bg-white border border-slate-200 rounded-full flex items-center justify-center mb-4 shadow-sm">
													<UploadCloud className="h-6 w-6 text-teal-600" />
												</div>
												<p className="text-sm font-bold text-slate-700 mb-1">Drag & drop file PDF di sini</p>
												<p className="text-xs text-slate-500">Atau klik tombol di bawah untuk memilih file</p>
												<p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-4">
													Maksimal {MAX_FILE_SIZE_MB}MB
												</p>
												<button
													onClick={(e) => {
														e.stopPropagation();
														fileInputRef.current?.click();
													}}
													className="mt-4 px-5 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-50 shadow-sm"
												>
													Browse File
												</button>
											</>
										)}
									</div>

									<div className="flex gap-3 mt-6">
										<button
											onClick={closeUploadModal}
											className="flex-1 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors"
										>
											Batal
										</button>
										<button
											onClick={handleRequestUpload}
											disabled={!selectedFile}
											className="flex-1 px-4 py-2.5 bg-teal-600 text-white text-sm font-bold rounded-xl hover:bg-teal-700 disabled:opacity-50 disabled:bg-slate-300 disabled:text-slate-500 transition-colors"
										>
											Lanjutkan
										</button>
									</div>
								</>
							) : (
								<div className="flex flex-col items-center justify-center text-center py-4 animate-in fade-in zoom-in-95 duration-200">
									<div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
										<HelpCircle className="h-8 w-8" />
									</div>
									<h3 className="text-xl font-black text-slate-900 mb-2">Konfirmasi Pengiriman</h3>
									<p className="text-sm text-slate-600">
										Apakah Anda yakin ingin mengunggah file <br />
										<span className="font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded mt-1 inline-block">
											{selectedFile?.name}
										</span>{" "}
										<br />
										untuk jawaban ini?
									</p>

									{selectedTask?.jawabanPdf && (
										<div className="mt-4 p-3 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg border border-amber-200">
											File lama Anda akan ditimpa (digantikan) dengan file baru ini.
										</div>
									)}

									<div className="flex gap-3 mt-8 w-full">
										<button
											onClick={() => setIsConfirming(false)}
											disabled={isUploading}
											className="flex-1 px-4 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 disabled:opacity-50 transition-colors"
										>
											Pilih Ulang File
										</button>
										<button
											onClick={handleUploadSubmit}
											disabled={isUploading}
											className="flex-1 px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:bg-slate-500 flex justify-center items-center gap-2 transition-colors"
										>
											{isUploading ? (
												<>
													<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
													Mengunggah...
												</>
											) : (
												"Ya, Yakin & Kirim"
											)}
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			{/* === HIDDEN PDF TEMPLATE === */}
			<div style={{ position: "fixed", top: 0, left: 0, zIndex: -9999, opacity: 0, pointerEvents: "none" }}>
				<div id="pdf-numerasi-siswa" style={{ backgroundColor: "white" }}>

					{/* HALAMAN 1: KOP SURAT, RINGKASAN, GRAFIK */}
					<PageContainer orientation="portrait">
						<KopSurat />

						<h3
							style={{
								fontSize: "18pt",
								fontWeight: "bold",
								textAlign: "center",
								margin: "20px 0 5px 0",
								textTransform: "uppercase",
							}}
						>
							Laporan Hasil Numerasi Siswa
						</h3>

						<p style={{ textAlign: "center", fontSize: "11pt", marginBottom: "30px" }}>
							Nama: <strong>{studentName}</strong> &nbsp;|&nbsp; Kelas: <strong>{kelasNama}</strong> &nbsp;|&nbsp;
							Semester: <strong>{semesterName}</strong>
						</p>

						<div style={{ display: "flex", gap: "15px", marginBottom: "30px" }}>
							<div
								style={{
									flex: 1,
									border: "1px solid #cbd5e1",
									borderRadius: "8px",
									padding: "15px",
									textAlign: "center",
								}}
							>
								<p
									style={{
										fontSize: "10pt",
										fontWeight: "bold",
										color: "#64748b",
										marginBottom: "5px",
										textTransform: "uppercase",
									}}
								>
									Rata-Rata Nilai
								</p>
								<p style={{ fontSize: "24pt", fontWeight: "bold", margin: 0, color: "#0f172a" }}>{stats.average}</p>
							</div>
							<div
								style={{
									flex: 1,
									border: "1px solid #cbd5e1",
									borderRadius: "8px",
									padding: "15px",
									textAlign: "center",
								}}
							>
								<p
									style={{
										fontSize: "10pt",
										fontWeight: "bold",
										color: "#64748b",
										marginBottom: "5px",
										textTransform: "uppercase",
									}}
								>
									Asesmen Selesai
								</p>
								<p style={{ fontSize: "24pt", fontWeight: "bold", margin: 0, color: "#0f172a" }}>
									{stats.selesai} <span style={{ fontSize: "12pt", color: "#64748b" }}>/ {stats.totalAsesmen}</span>
								</p>
							</div>
							<div
								style={{
									flex: 1,
									border: "1px solid #cbd5e1",
									borderRadius: "8px",
									padding: "15px",
									textAlign: "center",
									backgroundColor: stats.average >= 70 ? "#f0fdf4" : "#fffbeb",
								}}
							>
								<p
									style={{
										fontSize: "10pt",
										fontWeight: "bold",
										color: stats.average >= 70 ? "#0f766e" : "#b45309",
										marginBottom: "5px",
										textTransform: "uppercase",
									}}
								>
									Predikat
								</p>
								<p
									style={{
										fontSize: "18pt",
										fontWeight: "bold",
										margin: 0,
										color: stats.average >= 70 ? "#0f766e" : "#b45309",
									}}
								>
									{stats.predikat}
								</p>
							</div>
						</div>

						{chartData.length > 0 && (
							<div style={{ border: "1px solid #cbd5e1", padding: "15px", borderRadius: "8px" }}>
								<h4 style={{ fontSize: "12pt", fontWeight: "bold", marginBottom: "15px" }}>
									Grafik Tren Perkembangan Numerasi
								</h4>
								<div style={{ width: "100%", height: "250px", display: "flex", justifyContent: "center" }}>
									<AreaChart
										width={600}
										height={250}
										data={chartData}
										margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
									>
										<defs>
											<linearGradient id="colorScorePdf" x1="0" y1="0" x2="0" y2="1">
												<stop offset="5%" stopColor="#0d9488" stopOpacity={0.3} />
												<stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
											</linearGradient>
										</defs>
										<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
										<XAxis
											dataKey="name"
											axisLine={false}
											tickLine={false}
											tick={{ fill: "#64748b", fontSize: 10 }}
											dy={5}
										/>
										<YAxis
											domain={[0, 100]}
											axisLine={false}
											tickLine={false}
											tick={{ fill: "#64748b", fontSize: 10 }}
										/>
										<Area
											type="monotone"
											dataKey="score"
											stroke="#0d9488"
											strokeWidth={3}
											fill="url(#colorScorePdf)"
											isAnimationActive={false}
										/>
									</AreaChart>
								</div>
							</div>
						)}
						<PageFooter current={pageCounter++} total={totalPages} />
					</PageContainer>

					{/* HALAMAN 2: TABEL RINCIAN NILAI (DIPISAH DENGAN PAGE-BREAK) */}
					{historyChunks.map((chunk, chunkIdx) => (
						<div key={`history-page-${chunkIdx}`}>
							<div className="html2pdf__page-break"></div>
							<PageContainer orientation="portrait">
								<KopSurat />
								<h4 style={{ fontSize: "12pt", fontWeight: "bold", marginBottom: "15px", textAlign: "center" }}>
									Rincian Riwayat Nilai {historyChunks.length > 1 ? `(Bag. ${chunkIdx + 1})` : ""}
								</h4>
								<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
									<thead style={{ display: "table-header-group" }}>
										<tr style={{ backgroundColor: "#f1f5f9" }}>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "40px" }}>
												No
											</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left" }}>Nama Asesmen</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>Tanggal</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>Nilai</th>
											<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>Status</th>
										</tr>
									</thead>
									<tbody>
										{chunk.map((h: any, idx: number) => (
											<tr key={h.id} style={{ pageBreakInside: "avoid" }}>
												<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>
													{chunkIdx * 25 + idx + 1}
												</td>
												<td style={{ border: "1px solid #cbd5e1", padding: "10px" }}>
													<strong>{h.judul}</strong>
												</td>
												<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>{h.tanggal}</td>
												<td
													style={{
														border: "1px solid #cbd5e1",
														padding: "10px",
														textAlign: "center",
														fontWeight: "bold",
														color: h.nilai !== null && h.nilai < 70 ? "#b91c1c" : "#0d9488",
													}}
												>
													{h.nilai !== null ? h.nilai : "-"}
												</td>
												<td style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center" }}>{h.status}</td>
											</tr>
										))}
									</tbody>
								</table>
								<PageFooter current={pageCounter++} total={totalPages} />
							</PageContainer>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
