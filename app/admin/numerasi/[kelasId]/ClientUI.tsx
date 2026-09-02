// app/admin/numerasi/[kelasId]/ClientUI.tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Plus, X, Search, FileSpreadsheet, Download, Pencil, ArrowLeft, TrendingUp, FileText, Printer, Eye, Info, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import * as XLSX from "xlsx";
import { saveNilaiNumerasi, uploadExcelNumerasi, tambahTopikNumerasi, deleteNumeracyTask } from "./actions";

type TaskProps = { id: string; judul: string; deskripsi?: string | null; avgScore: number; fileSoalUrl?: string | null; createdAt?: Date };
type StudentProps = {
	siswaId: string;
	nama: string;
	nis: string;
	scores: Record<string, number | null>;
	average: number;
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

export default function NumerasiDetailClient({
	kelasId,
	namaKelas,
	tasks,
	students,
	backUrl,
}: {
	kelasId: string;
	namaKelas: string;
	tasks: TaskProps[];
	students: StudentProps[];
	backUrl?: string; // Tipe data tetap dipertahankan untuk kompatibilitas jika dikirim dari server
}) {
	const router = useRouter();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [search, setSearch] = useState("");
	const [modalType, setModalType] = useState<"UPLOAD" | "ADD" | "ADD_TOPIK" | null>(null);
	const [isDragging, setIsDragging] = useState(false);

	const [namaTugas, setNamaTugas] = useState("");
	const [deskripsiTugas, setDeskripsiTugas] = useState("");
	const [selectedStudent, setSelectedStudent] = useState("");
	const [inputNilai, setInputNilai] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);

	const [isDownloading, setIsDownloading] = useState(false);
	const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

	const showToast = (message: string, type: "success" | "error") => {
		setToast({ message, type });
		setTimeout(() => setToast(null), 3000);
	};

	// Filter data siswa sesuai pencarian, dan diurutkan abjad
	const sortedStudents = [...students].sort((a, b) => a.nama.localeCompare(b.nama));
	const filteredStudents = sortedStudents.filter(
		(s) => s.nama.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search),
	);

	const getInitials = (name: string) => {
		const cleanName = name.split(",")[0];
		const words = cleanName.split(" ").filter((word) => !word.includes(".") && word.trim() !== "");
		if (words.length === 0) return "U";
		return words
			.slice(0, 2)
			.map((w) => w[0])
			.join("")
			.toUpperCase();
	};

	const getStatusBadge = (avg: number) => {
		if (avg >= 85)
			return <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">Sangat Baik</span>;
		if (avg >= 70)
			return (
				<span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">Sesuai Target</span>
			);
		return <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">Beresiko</span>;
	};

	const chartData = tasks.map((t, index) => ({
		name: t.judul.includes("Numerasi") ? t.judul.replace("Numerasi", "Num") : `Num ${index + 1}`,
		actual: t.avgScore,
		fullTitle: t.judul,
	}));

	const handleEdit = (siswaId: string) => {
		const lastTask = tasks.length > 0 ? tasks[tasks.length - 1].judul : "Numerasi 1";
		setNamaTugas(lastTask);
		setSelectedStudent(siswaId);
		setInputNilai("");
		setModalType("ADD");
	};

	const handleSimpanManual = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			await saveNilaiNumerasi(kelasId, namaTugas, selectedStudent, Number(inputNilai));
			setModalType(null);
			setNamaTugas("");
			setSelectedStudent("");
			setInputNilai("");
			showToast("Nilai berhasil disimpan", "success");
			router.refresh();
		} catch (error) {
			showToast("Terjadi kesalahan saat menyimpan nilai.", "error");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleTambahTopik = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const formData = new FormData();
			formData.append("judul", namaTugas);
			formData.append("deskripsi", deskripsiTugas);
			if (selectedFile) formData.append("file", selectedFile);
			
			await tambahTopikNumerasi(kelasId, formData);
			setModalType(null);
			setNamaTugas("");
			setDeskripsiTugas("");
			setSelectedFile(null);
			showToast("Topik berhasil disimpan", "success");
			router.refresh();
		} catch (error: any) {
			showToast(error.message || "Terjadi kesalahan saat menyimpan topik.", "error");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDeleteTask = async (taskId: string, fileUrl: string | null | undefined) => {
		Swal.fire({
			title: "Hapus Tugas?",
			text: "Semua nilai dan progres siswa untuk tugas ini akan ikut terhapus. Lanjutkan?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#ef4444",
			cancelButtonColor: "#64748b",
			confirmButtonText: "Ya, Hapus!",
			cancelButtonText: "Batal",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await deleteNumeracyTask(taskId, fileUrl, kelasId);
					showToast("Tugas berhasil dihapus", "success");
					router.refresh();
				} catch (error: any) {
					showToast(error.message || "Gagal menghapus tugas.", "error");
				}
			}
		});
	};

	const processExcelFile = (file: File) => {
		setIsSubmitting(true);
		const reader = new FileReader();
		reader.onload = async (e) => {
			try {
				const data = new Uint8Array(e.target?.result as ArrayBuffer);
				const workbook = XLSX.read(data, { type: "array" });
				const sheetName = workbook.SheetNames[0];
				const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

				await uploadExcelNumerasi(kelasId, jsonData);

				setModalType(null);
				showToast("Nilai Excel berhasil diupload", "success");
				router.refresh();
			} catch (error) {
				showToast("Format Excel tidak sesuai. Pastikan menggunakan template yang disediakan.", "error");
			} finally {
				setIsSubmitting(false);
			}
		};
		reader.readAsArrayBuffer(file);
	};

	const handleDownloadTemplate = () => {
		const nextTaskNumber = tasks.length + 1;
		const defaultTaskName = `Numerasi ${nextTaskNumber}`;

		const dataExcel = sortedStudents.map((siswa) => ({
			NIS: siswa.nis,
			"Nama Siswa": siswa.nama,
			[defaultTaskName]: "",
		}));

		const worksheet = XLSX.utils.json_to_sheet(dataExcel);
		worksheet["!cols"] = [{ wch: 15 }, { wch: 35 }, { wch: 15 }];

		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, `Nilai Kelas`);
		XLSX.writeFile(workbook, `Template_Nilai_Kelas_${namaKelas}.xlsx`);
	};

	const handleDownloadDetail = async () => {
		setIsDownloading(true);
		setTimeout(async () => {
			try {
				const html2pdf = (await import("html2pdf.js")).default;
				const element = document.getElementById("pdf-detail-report");
				if (!element) return;

				const opt = {
					margin: 0,
					filename: `Laporan_Numerasi_${namaKelas}.pdf`,
					image: { type: "jpeg", quality: 1 },
					html2canvas: { scale: 2, useCORS: true },
					jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
					pagebreak: { mode: ["css"] },
				};

				await html2pdf().set(opt).from(element).save();
				showToast("Laporan berhasil diunduh", "success");
			} catch (error) {
				console.error("PDF Export error:", error);
				showToast("Terjadi kesalahan saat mengekspor laporan.", "error");
			} finally {
				setIsDownloading(false);
			}
		}, 500);
	};

	const openPdf = (url: string) => {
		setPdfUrl(url);
		setIsPdfModalOpen(true);
	};

	// Pagination PDF variables
	const PDF_MAX_ROWS = 10;
	const numerasiChunks = chunkArray(sortedStudents, PDF_MAX_ROWS);
	if (numerasiChunks.length === 0) numerasiChunks.push([]);
	const pdfTotalPages = 1 + numerasiChunks.length;
	let pageCounter = 1;

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 relative">
			{/* TOAST NOTIFICATION */}
			{toast && (
				<div
					className={`fixed top-4 right-4 z-[200] px-6 py-3 rounded-xl shadow-lg border text-sm font-bold animate-in fade-in slide-in-from-top-5 duration-300 ${
						toast.type === "success" ? "bg-teal-50 border-teal-200 text-teal-800" : "bg-red-50 border-red-200 text-red-800"
					}`}
				>
					{toast.message}
				</div>
			)}

			{/* Header View dengan Tombol Back */}
			<div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
				<div className="flex items-start gap-4">
					{/* Tombol Back dibuat Permanen */}
					<button
						onClick={() => backUrl ? router.push(backUrl) : router.back()}
						className="mt-1 p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600 shadow-sm"
						title="Kembali ke Daftar Kelas"
					>
						<ArrowLeft className="h-5 w-5" />
					</button>

					<div>
						<p className="text-sm font-medium text-slate-500 mb-1">
							Numeracy &gt; <span className="text-slate-900">Kelas {namaKelas}</span>
						</p>
						<h1 className="text-3xl font-bold text-slate-900">Hasil Numerasi: Kelas {namaKelas}</h1>
					</div>
				</div>

				<div className="flex gap-3 h-fit flex-wrap justify-end">
					<button
						onClick={handleDownloadDetail}
						disabled={isDownloading}
						className="px-4 py-2.5 bg-slate-100 text-slate-700 border border-slate-300 text-sm font-semibold rounded-lg shadow-sm hover:bg-slate-200 transition-colors flex items-center gap-2"
					>
						<Printer className="h-4 w-4" /> {isDownloading ? "Memproses..." : "Cetak PDF"}
					</button>
					<button
						onClick={() => setModalType("UPLOAD")}
						className="px-4 py-2.5 bg-white text-slate-900 border border-slate-300 text-sm font-semibold rounded-lg shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
					>
						<Upload className="h-4 w-4" /> Upload Nilai
					</button>
					<button
						onClick={() => {
							setNamaTugas(`Numerasi ${tasks.length + 1}`);
							setSelectedStudent("");
							setInputNilai("");
							setModalType("ADD");
						}}
						className="px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
					>
						<Plus className="h-4 w-4" /> Tambah Nilai
					</button>
					<button
						onClick={() => {
							setNamaTugas(`Numerasi ${tasks.length + 1}`);
							setSelectedFile(null);
							setModalType("ADD_TOPIK");
						}}
						className="px-4 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-teal-700 transition-colors flex items-center gap-2"
					>
						<FileText className="h-4 w-4" /> Tambah Topik
					</button>
				</div>
			</div>

			{/* Grafik Tren Rata-rata Kelas */}
			<div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
				<div className="flex justify-between items-center mb-6">
					<h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
						<TrendingUp className="h-5 w-5" /> Tren Rata-rata Kelas
					</h3>
					<div className="flex items-center gap-4 text-sm font-semibold">
						<span className="flex items-center gap-1.5 text-slate-800">
							<div className="w-3 h-3 rounded-full bg-teal-600"></div> Aktual
						</span>
						<span className="flex items-center gap-1.5 text-slate-500">
							<div className="w-3 h-3 rounded-full border-2 border-slate-300"></div> Target (80)
						</span>
					</div>
				</div>

				<div className="h-72 w-full mt-4">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
							<Tooltip
								contentStyle={{
									borderRadius: "12px",
									border: "none",
									boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
									color: "#0f172a",
								}}
								labelStyle={{ fontWeight: "bold", color: "#0f172a" }}
							/>
							<ReferenceLine y={80} stroke="#cbd5e1" strokeDasharray="5 5" />
							<Line
								type="monotone"
								dataKey="actual"
								name="Nilai Rata-rata"
								stroke="#0d9488"
								strokeWidth={3}
								dot={{ r: 4, fill: "#0d9488", strokeWidth: 2, stroke: "#fff" }}
								activeDot={{ r: 6 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Daftar Topik Penugasan */}
			<div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mt-8">
				<h3 className="font-bold text-slate-900 text-lg flex items-center gap-2 mb-4">
					<FileText className="h-5 w-5 text-indigo-600" /> Daftar Topik Tugas
				</h3>
				<div className="overflow-x-auto">
					<table className="w-full text-sm text-left">
						<thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-xs uppercase tracking-wider">
							<tr>
								<th className="px-6 py-3 w-16 text-center">No</th>
								<th className="px-6 py-3">Nama Topik</th>
								<th className="px-6 py-3 w-48 text-center">Rata-Rata Kelas</th>
								<th className="px-6 py-3 w-32 text-center">Aksi</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{tasks.length === 0 ? (
								<tr>
									<td colSpan={4} className="py-6 text-center text-slate-500 italic">
										Belum ada topik yang ditambahkan.
									</td>
								</tr>
							) : (
								tasks.map((task, idx) => (
									<tr key={task.id} className="hover:bg-slate-50">
										<td className="px-6 py-4 text-center font-medium text-slate-500">{idx + 1}</td>
										<td className="px-6 py-4 font-bold text-slate-800">{task.judul}</td>
										<td className="px-6 py-4 text-center font-semibold text-slate-700">{task.avgScore}</td>
										<td className="px-6 py-4 text-center">
											<div className="flex items-center justify-center gap-2">
												{task.deskripsi && (
													<button
														onClick={() =>
															Swal.fire({
																title: "Deskripsi Tugas",
																text: task.deskripsi,
																icon: "info",
																confirmButtonText: "Tutup",
																confirmButtonColor: "#0d9488",
															})
														}
														className="p-2 text-teal-600 hover:bg-teal-50 rounded-md transition-colors tooltip flex justify-center"
														title="Lihat Deskripsi"
													>
														<Info className="h-4 w-4" />
													</button>
												)}
												{task.fileSoalUrl ? (
													<button
														onClick={() => openPdf(task.fileSoalUrl!)}
														className="p-2 text-teal-600 hover:bg-teal-50 rounded-md transition-colors tooltip flex justify-center w-full"
														title="Lihat Soal PDF"
													>
														<Eye className="h-4 w-4" />
													</button>
												) : (
													<span className="text-xs text-slate-400 italic">Tidak ada file</span>
												)}
												<button
													onClick={() => handleDeleteTask(task.id, task.fileSoalUrl)}
													className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors tooltip flex justify-center w-full"
													title="Hapus Tugas"
												>
													<Trash2 className="h-4 w-4" />
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

			{/* Tabel Detail Siswa (Scrollable UI) */}
			<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col mt-8">
				<div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
					<h3 className="font-bold text-slate-900 text-lg">Detail Performa Siswa</h3>
					<div className="relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
						<input
							type="text"
							placeholder="Cari siswa..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							// Warna text dipertajam agar jelas terbaca
							className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm w-full sm:w-64 outline-none focus:border-teal-500 bg-white text-slate-900 placeholder:text-slate-400"
						/>
					</div>
				</div>

				{/* Container yang di-scroll, max-height membatasi hingga menampung ~10 baris */}
				<div className="overflow-x-auto overflow-y-auto max-h-[500px] custom-scrollbar">
					<table className="w-full text-sm text-left">
						{/* Header table sticky di atas */}
						<thead className="bg-white text-slate-500 font-bold border-b border-slate-200 text-xs uppercase tracking-wider sticky top-0 z-10 shadow-sm">
							<tr>
								<th className="px-6 py-4">Nama Siswa</th>
								<th className="px-6 py-4">NIS</th>
								{tasks.map((t) => (
									<th key={t.id} className="px-6 py-4 text-center" title={t.judul}>
										{t.judul}
									</th>
								))}
								<th className="px-6 py-4 text-center">Status</th>
								<th className="px-6 py-4 text-center">Aksi</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{filteredStudents.length === 0 ? (
								<tr>
									<td colSpan={tasks.length + 4} className="py-8 text-center text-slate-500 italic">
										Tidak ada siswa yang cocok dengan pencarian.
									</td>
								</tr>
							) : (
								filteredStudents.map((siswa) => (
									<tr key={siswa.siswaId} className="hover:bg-slate-50 transition-colors">
										<td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-3">
											<div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0">
												{getInitials(siswa.nama)}
											</div>
											{siswa.nama}
										</td>
										<td className="px-6 py-4 text-slate-600 font-medium">{siswa.nis}</td>
										{tasks.map((t) => {
											const skor = siswa.scores[t.id];
											return (
												<td key={t.id} className="px-6 py-4 text-center font-bold">
													{skor !== null ? (
														<span
															className={skor >= 80 ? "text-teal-600" : skor < 70 ? "text-red-600" : "text-slate-800"}
														>
															{skor}
														</span>
													) : (
														<span className="text-slate-300">-</span>
													)}
												</td>
											);
										})}
										<td className="px-6 py-4 text-center">
											{siswa.average > 0 ? (
												getStatusBadge(siswa.average)
											) : (
												<span className="text-slate-400 text-xs italic">Belum ada data</span>
											)}
										</td>
										<td className="px-6 py-4 flex justify-center">
											<button
												onClick={() => handleEdit(siswa.siswaId)}
												className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-md transition-colors tooltip"
												title="Edit Nilai"
											>
												<Pencil className="h-4 w-4" />
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* --- MODAL UPLOAD EXCEL --- */}
			{modalType === "UPLOAD" && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
							<h2 className="text-lg font-bold text-slate-900 border-l-4 border-teal-600 pl-2">Upload Nilai (Excel)</h2>
							<button onClick={() => setModalType(null)} className="text-slate-400 hover:text-slate-600">
								<X className="h-5 w-5" />
							</button>
						</div>

						<div className="p-6">
							<input
								type="file"
								ref={fileInputRef}
								className="hidden"
								accept=".xlsx,.xls"
								onChange={(e) => {
									if (e.target.files && e.target.files[0]) processExcelFile(e.target.files[0]);
								}}
							/>

							<div
								onDragOver={(e) => {
									e.preventDefault();
									setIsDragging(true);
								}}
								onDragLeave={() => setIsDragging(false)}
								onDrop={(e) => {
									e.preventDefault();
									setIsDragging(false);
									if (e.dataTransfer.files && e.dataTransfer.files[0]) processExcelFile(e.dataTransfer.files[0]);
								}}
								onClick={() => fileInputRef.current?.click()}
								className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer group mb-4 ${isDragging ? "border-teal-500 bg-teal-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"
									}`}
							>
								{isSubmitting ? (
									<div className="w-8 h-8 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-3"></div>
								) : (
									<FileSpreadsheet className="h-10 w-10 text-teal-600 mb-3 group-hover:scale-110 transition-transform" />
								)}
								<p className="text-sm font-bold text-slate-800">
									{isSubmitting ? "Memproses Data..." : "Klik atau Drag & Drop file Excel"}
								</p>
								<p className="text-xs text-slate-500 mt-1">Format: .xlsx (Maks 5MB)</p>
							</div>

							<div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-100">
								<p className="text-xs text-blue-900 font-bold">Belum punya formatnya?</p>
								<button
									type="button"
									onClick={handleDownloadTemplate}
									className="flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors"
								>
									<Download className="h-3.5 w-3.5" /> Template .xlsx
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* --- MODAL TAMBAH NILAI MANUAL --- */}
			{modalType === "ADD" && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
							<h2 className="text-lg font-bold text-slate-900 border-l-4 border-teal-600 pl-2">Tambah Nilai Manual</h2>
							<button onClick={() => setModalType(null)} className="text-slate-400 hover:text-slate-600">
								<X className="h-5 w-5" />
							</button>
						</div>

						<form onSubmit={handleSimpanManual} className="p-6 space-y-4">
							<div>
								<label className="block text-xs font-bold text-slate-800 mb-1">Judul Penugasan</label>
								<input
									type="text"
									required
									value={namaTugas}
									onChange={(e) => setNamaTugas(e.target.value)}
									placeholder="Misal: Numerasi 1"
									className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:border-teal-500 outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-bold text-slate-800 mb-1">Nama Siswa</label>
								<select
									required
									value={selectedStudent}
									onChange={(e) => setSelectedStudent(e.target.value)}
									className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:border-teal-500 outline-none"
								>
									<option value="" disabled>
										-- Pilih Siswa --
									</option>
									{sortedStudents.map((s) => (
										<option key={s.siswaId} value={s.siswaId}>
											{s.nis} - {s.nama}
										</option>
									))}
								</select>
							</div>

							<div>
								<label className="block text-xs font-bold text-slate-800 mb-1">Nilai Akhir (0-100)</label>
								<input
									type="number"
									required
									min="0"
									max="100"
									value={inputNilai}
									onChange={(e) => setInputNilai(e.target.value)}
									placeholder="Misal: 85"
									className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:border-teal-500 outline-none"
								/>
							</div>

							<div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
								<button
									type="button"
									onClick={() => setModalType(null)}
									className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors"
								>
									Batal
								</button>
								<button
									type="submit"
									disabled={isSubmitting}
									className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors"
								>
									{isSubmitting ? "Menyimpan..." : "Simpan Nilai"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* --- MODAL TAMBAH TOPIK --- */}
			{modalType === "ADD_TOPIK" && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
							<h2 className="text-lg font-bold text-slate-900 border-l-4 border-teal-600 pl-2">Tambah Topik Soal</h2>
							<button onClick={() => setModalType(null)} className="text-slate-400 hover:text-slate-600">
								<X className="h-5 w-5" />
							</button>
						</div>

						<form onSubmit={handleTambahTopik} className="p-6 space-y-4">
							<div>
								<label className="block text-xs font-bold text-slate-800 mb-1">Judul Penugasan</label>
								<input
									type="text"
									required
									value={namaTugas}
									onChange={(e) => setNamaTugas(e.target.value)}
									placeholder="Misal: Numerasi 1"
									className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:border-teal-500 outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-bold text-slate-800 mb-1">Detail Tugas (Deskripsi)</label>
								<textarea
									value={deskripsiTugas}
									onChange={(e) => setDeskripsiTugas(e.target.value)}
									placeholder="Tambahkan deskripsi tugas (opsional)"
									className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:border-teal-500 outline-none min-h-[80px] resize-y"
								/>
							</div>

							<div>
								<label className="block text-xs font-bold text-slate-800 mb-1">File Soal PDF (Opsional)</label>
								<input
									type="file"
									ref={fileInputRef}
									className="hidden"
									accept=".pdf"
									onChange={(e) => {
										if (e.target.files && e.target.files[0]) setSelectedFile(e.target.files[0]);
									}}
								/>

								<div
									onDragOver={(e) => {
										e.preventDefault();
										setIsDragging(true);
									}}
									onDragLeave={() => setIsDragging(false)}
									onDrop={(e) => {
										e.preventDefault();
										setIsDragging(false);
										if (e.dataTransfer.files && e.dataTransfer.files[0]) setSelectedFile(e.dataTransfer.files[0]);
									}}
									onClick={() => fileInputRef.current?.click()}
									className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-colors cursor-pointer group mb-2 ${isDragging ? "border-teal-500 bg-teal-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"
										}`}
								>
									<FileText className="h-8 w-8 text-teal-600 mb-2 group-hover:scale-110 transition-transform" />
									<p className="text-sm font-bold text-slate-800 text-center">
										{selectedFile ? selectedFile.name : "Klik atau Drag & Drop file PDF"}
									</p>
									<p className="text-xs text-slate-500 mt-1">Maks 5MB</p>
								</div>
							</div>

							<div className="pt-4 flex justify-end gap-3 border-t border-slate-100 mt-6">
								<button
									type="button"
									onClick={() => setModalType(null)}
									className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors"
								>
									Batal
								</button>
								<button
									type="submit"
									disabled={isSubmitting}
									className="px-4 py-2 bg-teal-600 text-white text-sm font-bold rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
								>
									{isSubmitting ? "Menyimpan..." : "Simpan Topik"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* --- MODAL PREVIEW PDF --- */}
			{isPdfModalOpen && pdfUrl && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
							<h2 className="text-lg font-bold text-slate-900">Preview Dokumen</h2>
							<button onClick={() => setIsPdfModalOpen(false)} className="text-slate-400 hover:text-slate-600">
								<X className="h-5 w-5" />
							</button>
						</div>
						<div className="flex-1 w-full bg-slate-200">
							<iframe src={pdfUrl} className="w-full h-full border-none" title="PDF Document" />
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
							<h2 style={{ fontSize: "22pt", fontWeight: "bold", color: "#0f172a" }}>Kelas {namaKelas}</h2>
							<div style={{ width: "50px", height: "4px", backgroundColor: "#0f172a", margin: "24px auto" }}></div>

							<p style={{ fontSize: "14pt", fontWeight: "bold" }}>Laporan Performa Numerasi</p>

							<p style={{ fontSize: "14pt", marginTop: "60px", fontWeight: "bold" }}>SMA NEGERI 2 BREBES</p>
						</div>
						<PageFooter current={pageCounter++} total={pdfTotalPages} />
					</PageContainer>
					<div className="html2pdf__page-break"></div>

					{/* Content Page: Tabel Numerasi (10 Baris per Halaman) */}
					{numerasiChunks.map((chunk, chunkIdx) => {
						const isVeryLastPage = chunkIdx === numerasiChunks.length - 1;
						return (
							<div key={`num-page-${chunkIdx}`}>
								<PageContainer>
									<KopSurat />
									<h3 style={{ fontSize: "14pt", fontWeight: "bold", margin: "0 0 15px 0", textAlign: "center" }}>
										Detail Performa Numerasi Siswa {numerasiChunks.length > 1 ? `(Bag. ${chunkIdx + 1})` : ""}
									</h3>
									<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
										<thead>
											<tr style={{ backgroundColor: "#f1f5f9" }}>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", width: "5%" }}>No</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left", width: "30%" }}>Nama Siswa</th>
												<th style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "left", width: "15%" }}>NIS</th>
												{tasks.map((h: any) => (
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
													<td colSpan={tasks.length + 4} style={{ border: "1px solid #cbd5e1", padding: "10px", textAlign: "center", fontStyle: "italic" }}>
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
														{tasks.map((h: any) => {
															const val = s.scores[h.id];
															return (
																<td
																	key={h.id}
																	style={{
																		border: "1px solid #cbd5e1",
																		padding: "10px",
																		textAlign: "center",
																		color: val !== null && val < 70 ? "red" : "black",
																		fontWeight: val !== null && val < 70 ? "bold" : "normal"
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
																color: s.average > 0 && Number(s.average) < 70 ? "red" : "black",
																backgroundColor: "#f8fafc",
															}}
														>
															{s.average > 0 ? s.average : "-"}
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