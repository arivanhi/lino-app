// app/admin/literasi/[kelasId]/ClientUI.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Eye, TrendingUp, Book, AlertTriangle, Users, ArrowLeft, Search, CheckCircle, Clock, AlertCircle, FileText, BookOpen, Info, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import Select from "react-select";
import { createLiteracyTask, deleteLiteracyTask, deleteMultipleLiteracyTasks } from "./actions";

type TaskProps = { id: string; judul: string; deskripsi?: string | null; waktuSelesai: Date; status: string; fileSoalUrl?: string | null };
type StudentProps = {
	siswaId: string;
	nama: string;
	nis: string;
	tugasSelesai: number;
	totalTugas: number;
	filePdfTerakhir?: string | null;
	history?: any[]; // Array riwayat pengerjaan tugas
};

export default function LiterasiDetailClient({
	kelasId,
	namaKelas,
	tasks,
	students,
}: {
	kelasId: string;
	namaKelas: string;
	tasks: TaskProps[];
	students: StudentProps[];
}) {
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const [isMassDeleteModalOpen, setIsMassDeleteModalOpen] = useState(false);
	const [selectedTasksForDelete, setSelectedTasksForDelete] = useState<{ value: string; label: string; fileUrl: string | null | undefined }[]>([]);
	const [isSubmittingMassDelete, setIsSubmittingMassDelete] = useState(false);

	// State untuk Modal Riwayat Tugas per Siswa
	const [selectedStudent, setSelectedStudent] = useState<StudentProps | null>(null);

	const [judul, setJudul] = useState("");
	const [deadline, setDeadline] = useState("");
	const [instruksi, setInstruksi] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [search, setSearch] = useState("");

	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);

	const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

	const showToast = (message: string, type: "success" | "error") => {
		setToast({ message, type });
		setTimeout(() => setToast(null), 3000);
	};

	// Perhitungan Statistik
	const avgSubmission = students.length > 0
		? Math.round((students.reduce((acc, s) => acc + s.tugasSelesai, 0) / (students.length * (tasks.length || 1))) * 100)
		: 0;
	const missingCount = students.filter(s => s.tugasSelesai < tasks.length).length;

	// Filter & Sort Data Siswa (Sesuai Abjad)
	const sortedStudents = [...students].sort((a, b) => a.nama.localeCompare(b.nama));
	const filteredStudents = sortedStudents.filter(
		(s) => s.nama.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search)
	);

	const handleCreateTask = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			const formData = new FormData();
			formData.append("judul", judul);
			formData.append("deadline", deadline);
			formData.append("instruksi", instruksi);
			if (selectedFile) formData.append("file", selectedFile);

			await createLiteracyTask(kelasId, formData);
			
			setJudul("");
			setDeadline("");
			setInstruksi("");
			setSelectedFile(null);
			setIsModalOpen(false);
			showToast("Tugas berhasil ditambahkan", "success");
			router.refresh(); // Refresh data setelah tugas ditambahkan
		} catch (error: any) {
			showToast(error.message || "Terjadi kesalahan saat menyimpan tugas.", "error");
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
					await deleteLiteracyTask(taskId, fileUrl, kelasId);
					showToast("Tugas berhasil dihapus", "success");
					router.refresh();
				} catch (error: any) {
					showToast(error.message || "Gagal menghapus tugas.", "error");
				}
			}
		});
	};

	const handleMassDelete = async () => {
		if (selectedTasksForDelete.length === 0) return;
		
		Swal.fire({
			title: "Yakin Hapus Massal?",
			text: `Anda akan menghapus ${selectedTasksForDelete.length} tugas beserta nilai siswanya. Lanjutkan?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#ef4444",
			cancelButtonColor: "#64748b",
			confirmButtonText: "Ya, Hapus!",
			cancelButtonText: "Batal",
		}).then(async (result) => {
			if (result.isConfirmed) {
				setIsSubmittingMassDelete(true);
				try {
					const taskIds = selectedTasksForDelete.map(t => t.value);
					await deleteMultipleLiteracyTasks(taskIds, kelasId);
					showToast(`${taskIds.length} Tugas berhasil dihapus`, "success");
					setIsMassDeleteModalOpen(false);
					setSelectedTasksForDelete([]);
					router.refresh();
				} catch (error: any) {
					showToast(error.message || "Gagal menghapus tugas massal.", "error");
				} finally {
					setIsSubmittingMassDelete(false);
				}
			}
		});
	};

	const handleViewPdf = (base64Data: string) => {
		const pdfWindow = window.open("");
		if (pdfWindow) {
			pdfWindow.document.write(`<iframe width='100%' height='100%' src='${base64Data}'></iframe>`);
		}
	};

	const getInitials = (name: string) => {
		const cleanName = name.split(",")[0];
		const words = cleanName.split(" ").filter((word) => !word.includes(".") && word.trim() !== "");
		if (words.length === 0) return "U";
		return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase();
	};

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
					<button
						onClick={() => router.push("/admin/literasi")}
						className="mt-1 p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600 shadow-sm"
						title="Kembali ke Daftar Kelas"
					>
						<ArrowLeft className="h-5 w-5" />
					</button>
					<div>
						<p className="text-sm font-medium text-slate-500 mb-1">
							Literasi &gt; <span className="text-slate-800">Kelas {namaKelas}</span>
						</p>
						<h1 className="text-3xl font-bold text-slate-900">Detail Literasi - Kelas {namaKelas}</h1>
					</div>
				</div>

				<div className="flex gap-2">
					<button
						onClick={() => setIsMassDeleteModalOpen(true)}
						className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2 h-fit"
					>
						<Trash2 className="h-4 w-4 text-red-600" /> Hapus Massal
					</button>
					<button
						onClick={() => setIsModalOpen(true)}
						className="px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-slate-800 transition-colors flex items-center gap-2 h-fit"
					>
						<Plus className="h-4 w-4" /> Tambah Topik Baru
					</button>
				</div>
			</div>

			{/* Card Statistik */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
					<p className="text-sm font-semibold text-slate-500 mb-2 flex items-center justify-between">
						Rata-rata Penyelesaian <TrendingUp className="h-4 w-4 text-teal-600" />
					</p>
					<p className="text-3xl font-bold text-slate-900">{avgSubmission}%</p>
				</div>
				<div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-l-teal-600 border-y border-r border-slate-200">
					<p className="text-sm font-semibold text-slate-500 mb-2 flex items-center justify-between">
						Total Topik <Book className="h-4 w-4 text-teal-600" />
					</p>
					<p className="text-3xl font-bold text-slate-900">{tasks.length}</p>
				</div>
				<div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
					<p className="text-sm font-semibold text-slate-500 mb-2 flex items-center justify-between">
						Siswa Tertinggal <AlertTriangle className="h-4 w-4 text-amber-500" />
					</p>
					<p className="text-3xl font-bold text-slate-900">{missingCount}</p>
				</div>
				<div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
					<p className="text-sm font-semibold text-slate-500 mb-2 flex items-center justify-between">
						Total Siswa <Users className="h-4 w-4 text-blue-600" />
					</p>
					<p className="text-3xl font-bold text-slate-900">{students.length}</p>
				</div>
			</div>

			{/* Konten Utama 2 Kolom */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

				{/* KOLOM KIRI: TOPIK DITUGASKAN */}
				<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col max-h-[600px]">
					<div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center z-10">
						<h3 className="font-bold text-slate-800">Topik Ditugaskan</h3>
					</div>
					{/* SCROLLABLE TASKS LIST */}
					<div className="p-5 space-y-4 overflow-y-auto custom-scrollbar flex-1">
						{tasks.length === 0 ? (
							<p className="text-sm text-slate-500 italic text-center py-4">Belum ada tugas.</p>
						) : (
							tasks.map((task) => (
								<div key={task.id} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
									<p className="font-bold text-slate-800 text-sm mb-1">{task.judul}</p>
									<div className="flex justify-between items-center text-xs text-slate-500 mt-2">
										<span>Tenggat: {new Date(task.waktuSelesai).toLocaleDateString("id-ID")}</span>
										<div className="flex gap-2 items-center">
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
													className="p-1 text-teal-600 hover:bg-teal-50 rounded-md transition-colors tooltip flex justify-center border border-teal-200"
													title="Lihat Deskripsi"
												>
													<Info className="h-3 w-3" />
												</button>
											)}
											{task.fileSoalUrl && (
												<button
													onClick={() => {
														setPdfUrl(task.fileSoalUrl!);
														setIsPdfModalOpen(true);
													}}
													className="p-1 text-teal-600 hover:bg-teal-50 rounded-md transition-colors tooltip flex justify-center border border-teal-200"
													title="Lihat Soal PDF"
												>
													<Eye className="h-3 w-3" />
												</button>
											)}
											<span className={task.status === "SELESAI" ? "bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-bold" : "bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold"}>
												{task.status === "SELESAI" ? "Selesai" : "Aktif"}
											</span>
											<button
												onClick={() => handleDeleteTask(task.id, task.fileSoalUrl)}
												className="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors tooltip flex justify-center border border-red-200 ml-1"
												title="Hapus Tugas"
											>
												<Trash2 className="h-3 w-3" />
											</button>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</div>

				{/* KOLOM KANAN: PROGRES SISWA */}
				<div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
					<div className="p-5 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10">
						<h3 className="font-bold text-slate-800">Progres Siswa</h3>
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
							<input
								type="text"
								placeholder="Cari nama atau NIS..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 w-full sm:w-64 outline-none focus:border-teal-500"
							/>
						</div>
					</div>
					{/* SCROLLABLE TABLE */}
					<div className="overflow-x-auto overflow-y-auto max-h-[500px] custom-scrollbar">
						<table className="w-full text-sm text-left">
							<thead className="bg-white text-slate-500 font-bold border-b border-slate-200 text-xs uppercase tracking-wider sticky top-0 z-10 shadow-sm">
								<tr>
									<th className="px-5 py-3 text-center">No</th>
									<th className="px-5 py-3">Nama Siswa</th>
									<th className="px-5 py-3 text-center">NIS</th>
									<th className="px-5 py-3 text-center">Tugas Selesai</th>
									<th className="px-5 py-3 text-center">Status</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100">
								{filteredStudents.length === 0 ? (
									<tr>
										<td colSpan={5} className="py-8 text-center text-slate-500 italic">Tidak ada siswa ditemukan.</td>
									</tr>
								) : (
									filteredStudents.map((siswa, idx) => {
										const isMastered = siswa.tugasSelesai === tasks.length && tasks.length > 0;
										const isOnTrack = siswa.tugasSelesai >= tasks.length / 2;

										return (
											<tr
												key={siswa.siswaId}
												className="hover:bg-slate-50 cursor-pointer transition-colors"
												onClick={() => setSelectedStudent(siswa)}
												title="Klik untuk melihat detail tugas"
											>
												<td className="px-5 py-4 text-center text-slate-500 font-medium">{idx + 1}</td>
												<td className="px-5 py-4 font-semibold text-slate-800 flex items-center gap-3">
													<div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0">
														{getInitials(siswa.nama)}
													</div>
													{siswa.nama}
												</td>
												<td className="px-5 py-4 text-center text-slate-600 font-medium">{siswa.nis}</td>
												<td className="px-5 py-4 text-center">
													<span className={`font-bold ${siswa.tugasSelesai < tasks.length ? "text-red-500" : "text-teal-600"}`}>
														{siswa.tugasSelesai}
													</span>
													<span className="text-slate-500">/{tasks.length}</span>
												</td>
												<td className="px-5 py-4 flex justify-center">
													{isMastered && (
														<span className="flex items-center gap-1 bg-teal-50 text-teal-600 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
															<CheckCircle className="h-3.5 w-3.5" /> Tuntas
														</span>
													)}
													{!isMastered && isOnTrack && (
														<span className="flex items-center gap-1 bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
															<Clock className="h-3.5 w-3.5" /> On Track
														</span>
													)}
													{!isMastered && !isOnTrack && (
														<span className="flex items-center gap-1 bg-red-50 text-red-600 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
															<AlertCircle className="h-3.5 w-3.5" /> Behind
														</span>
													)}
												</td>
											</tr>
										)
									})
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* --- MODAL LIHAT TUGAS LITERASI SISWA --- */}
			{selectedStudent && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
							<div>
								<h2 className="text-lg font-bold text-slate-900">Riwayat Tugas</h2>
								<p className="text-xs font-semibold text-slate-500">{selectedStudent.nama}</p>
							</div>
							<button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-slate-600 transition-colors">
								<X className="h-5 w-5" />
							</button>
						</div>
						<div className="p-6 max-h-[60vh] overflow-y-auto space-y-3 custom-scrollbar">
							{!selectedStudent.history || selectedStudent.history.length === 0 ? (
								<p className="text-sm text-slate-500 italic text-center">Belum ada tugas yang dikerjakan.</p>
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
													className={`text-xs font-bold ${h.status === "SELESAI" ? "text-teal-600" : "text-amber-500"}`}
												>
													{h.status}
												</p>
											</div>
										</div>
										<div className="flex items-center gap-2">
											{h.soalPdf && (
												<button
													onClick={(e) => {
														e.stopPropagation();
														handleViewPdf(h.soalPdf);
													}}
													className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-teal-50 text-teal-600 tooltip transition-colors"
													title="Lihat Soal"
												>
													<BookOpen className="h-4 w-4" />
												</button>
											)}
											{h.pdf && (
												<button
													onClick={(e) => {
														e.stopPropagation(); // Mencegah event click merambat
														handleViewPdf(h.pdf);
													}}
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

			{/* MODAL TAMBAH TUGAS */}
			{isModalOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
							<h2 className="text-lg font-bold text-slate-800 border-l-4 border-teal-600 pl-2">
								Tambah Topik Literasi
							</h2>
							<button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
								<X className="h-5 w-5" />
							</button>
						</div>

						<form onSubmit={handleCreateTask} className="p-6 space-y-4">
							<div>
								<label className="block text-xs font-bold text-slate-700 mb-1">Judul Topik / Tugas</label>
								<input
									type="text"
									required
									value={judul}
									onChange={(e) => setJudul(e.target.value)}
									placeholder="Contoh: Resume Buku Fiksi"
									className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-bold text-slate-700 mb-1">Target Kelas</label>
								<input
									type="text"
									value={`Kelas ${namaKelas}`}
									disabled
									className="w-full border border-slate-200 bg-slate-50 text-slate-600 font-medium rounded-lg px-3 py-2.5 text-sm"
								/>
							</div>

							<div>
								<label className="block text-xs font-bold text-slate-700 mb-1">Tenggat Waktu (Deadline)</label>
								<input
									type="date"
									required
									value={deadline}
									onChange={(e) => setDeadline(e.target.value)}
									className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-bold text-slate-700 mb-1">Instruksi Tugas</label>
								<textarea
									required
									rows={3}
									value={instruksi}
									onChange={(e) => setInstruksi(e.target.value)}
									placeholder="Tuliskan instruksi detail mengenai buku atau artikel yang harus dibaca..."
									className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none"
								></textarea>
							</div>

							<div>
								<label className="block text-xs font-bold text-slate-800 mb-1">File Soal PDF (Opsional)</label>
								<input
									type="file"
									id="file-upload-literasi"
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
									onClick={() => document.getElementById("file-upload-literasi")?.click()}
									className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center transition-colors cursor-pointer group ${isDragging ? "border-teal-500 bg-teal-50" : "border-slate-300 bg-slate-50 hover:bg-slate-100"
										}`}
								>
									<FileText className="h-6 w-6 text-teal-600 mb-2 group-hover:scale-110 transition-transform" />
									<p className="text-sm font-bold text-slate-800 text-center">
										{selectedFile ? selectedFile.name : "Klik atau Drag & Drop file PDF"}
									</p>
									<p className="text-xs text-slate-500 mt-1">Maks 5MB</p>
								</div>
							</div>

							<div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
								<button
									type="button"
									onClick={() => setIsModalOpen(false)}
									className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50 transition-colors"
								>
									Batal
								</button>
								<button
									type="submit"
									disabled={isSubmitting}
									className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 flex items-center gap-2 transition-colors disabled:opacity-50"
								>
									{isSubmitting ? "Menyimpan..." : "Buat Tugas"}
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

			{/* --- MODAL HAPUS MASSAL TUGAS --- */}
			{isMassDeleteModalOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
							<h2 className="text-lg font-bold text-slate-900">Hapus Massal Tugas</h2>
							<button onClick={() => setIsMassDeleteModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
								<X className="h-5 w-5" />
							</button>
						</div>
						<div className="p-6 space-y-4">
							<div>
								<label className="block text-sm font-semibold text-slate-700 mb-1">Pilih Tugas yang Ingin Dihapus</label>
								<Select
									isMulti
									options={tasks.map(t => ({ value: t.id, label: t.judul, fileUrl: t.fileSoalUrl }))}
									value={selectedTasksForDelete}
									onChange={(val: any) => setSelectedTasksForDelete(val)}
									placeholder="Pilih beberapa tugas..."
									className="text-sm"
								/>
							</div>
							<div className="flex justify-end gap-3 pt-4">
								<button
									type="button"
									onClick={() => setIsMassDeleteModalOpen(false)}
									className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
								>
									Batal
								</button>
								<button
									onClick={handleMassDelete}
									disabled={isSubmittingMassDelete || selectedTasksForDelete.length === 0}
									className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
								>
									{isSubmittingMassDelete ? "Menghapus..." : "Hapus Terpilih"}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Custom CSS untuk styling scrollbar agar terlihat modern */}
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