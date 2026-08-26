// app/siswa/literasi/ClientUI.tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
	FileText,
	CheckCircle2,
	ClipboardList,
	Clock,
	AlertTriangle,
	UploadCloud,
	X,
	File,
	AlertCircle,
	HelpCircle,
	RefreshCw,
	Eye,
	Info,
} from "lucide-react";
import Swal from "sweetalert2";
import { submitTugasLiterasi } from "./actions"; // Import Server Action kita

export default function LiterasiSiswaUI({ siswaId, kelasId, stats, tasks }: any) {
	const router = useRouter();

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;
	const totalPages = Math.ceil(tasks.length / itemsPerPage);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentTasks = tasks.slice(startIndex, startIndex + itemsPerPage);

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

	// === LOGIKA UPLOAD REAL KE DATABASE (MENGGUNAKAN BASE64) ===
	const handleUploadSubmit = () => {
		setIsUploading(true);

		try {
			// Gunakan FileReader untuk membaca file PDF sebagai teks (Data URL/Base64)
			const reader = new FileReader();

			reader.onloadend = async () => {
				const base64String = reader.result as string;

				try {
					// Panggil Server Action dengan parameter string yang aman
					await submitTugasLiterasi(selectedTask.id, siswaId, selectedFile!.name, base64String, kelasId);

					setIsUploading(false);
					closeUploadModal();

					// Munculkan Toast Notifikasi Sukses
					setToastMessage(`Berhasil! Tugas "${selectedTask.judul}" telah diunggah.`);
					setTimeout(() => setToastMessage(""), 4000);

					// Refresh data di latar belakang
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

			// Mulai proses pembacaan file
			reader.readAsDataURL(selectedFile!);
		} catch (error) {
			setIsUploading(false);
			setErrorMsg("Terjadi kesalahan sistem saat memproses file.");
		}
	};

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
				<h1 className="text-3xl font-black text-slate-900 tracking-tight">Daftar Tugas Literasi</h1>
				<p className="text-slate-500 font-medium mt-1">Pantau kemajuan dan kumpulkan tugas membaca dan menulis Anda.</p>
			</div>

			{/* STATS CARDS */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white p-6 rounded-2xl border-l-4 border-l-slate-800 border-y border-r border-slate-200 shadow-sm flex justify-between items-center">
					<div>
						<p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Tugas</p>
						<p className="text-4xl font-black text-slate-900">{stats.total}</p>
					</div>
					<div className="bg-slate-100 p-3 rounded-xl">
						<FileText className="h-6 w-6 text-slate-600" />
					</div>
				</div>
				<div className="bg-white p-6 rounded-2xl border-l-4 border-l-teal-500 border-y border-r border-slate-200 shadow-sm flex justify-between items-center">
					<div>
						<p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tugas Selesai</p>
						<p className="text-4xl font-black text-slate-900">{stats.selesai}</p>
					</div>
					<div className="bg-teal-50 p-3 rounded-xl">
						<CheckCircle2 className="h-6 w-6 text-teal-600" />
					</div>
				</div>
				<div className="bg-white p-6 rounded-2xl border-l-4 border-l-amber-500 border-y border-r border-slate-200 shadow-sm flex justify-between items-center">
					<div>
						<p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tugas Aktif</p>
						<p className="text-4xl font-black text-slate-900">{stats.aktif}</p>
					</div>
					<div className="bg-amber-50 p-3 rounded-xl">
						<ClipboardList className="h-6 w-6 text-amber-600" />
					</div>
				</div>
			</div>

			{/* TABLE TUGAS */}
			<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
				<div className="overflow-x-auto">
					<table className="w-full text-sm text-left">
						<thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 text-xs tracking-wider">
							<tr>
								<th className="py-4 px-6 w-16 text-center">No</th>
								<th className="py-4 px-6">Nama Tugas/Topik</th>
								<th className="py-4 px-6 text-center">Tanggal Ditugaskan</th>
								<th className="py-4 px-6 text-center">Tenggat Waktu</th>
								<th className="py-4 px-6 text-center">Status</th>
								<th className="py-4 px-6 text-right">Aksi</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{currentTasks.length === 0 ? (
								<tr>
									<td colSpan={6} className="py-8 text-center text-slate-500 italic">
										Belum ada tugas literasi.
									</td>
								</tr>
							) : (
								currentTasks.map((t: any, idx: number) => {
									const actualNumber = startIndex + idx + 1;
									return (
										<tr key={t.id} className="hover:bg-slate-50 transition-colors">
											<td className="py-4 px-6 text-center text-slate-500">{actualNumber}</td>
											<td className="py-4 px-6 font-bold text-slate-800">
												<div className="flex items-center gap-2">
													{t.judul}
													{t.deskripsi && (
														<button
															onClick={() =>
																Swal.fire({
																	title: "Deskripsi Tugas",
																	text: t.deskripsi,
																	icon: "info",
																	confirmButtonText: "Tutup",
																	confirmButtonColor: "#0d9488",
																})
															}
															className="text-teal-600 hover:text-teal-800 tooltip flex items-center justify-center p-1.5 bg-teal-50 rounded-full"
															title="Lihat Deskripsi"
														>
															<Info className="h-4 w-4" />
														</button>
													)}
													{t.soalPdf && (
														<button
															onClick={() => window.open(t.soalPdf, "_blank")}
															className="text-teal-600 hover:text-teal-800 tooltip flex items-center justify-center p-1.5 bg-teal-50 rounded-full"
															title="Lihat Soal"
														>
															<Eye className="h-4 w-4" />
														</button>
													)}
												</div>
											</td>
											<td className="py-4 px-6 text-center text-slate-500">{t.tanggalDitugaskan}</td>
											<td className="py-4 px-6 text-center">
												<span
													className={`flex items-center justify-center gap-1.5 font-medium ${t.status === "Terlambat" ? "text-red-500" : t.status === "Aktif" ? "text-amber-600" : "text-slate-500"}`}
												>
													{t.status === "Terlambat" ? (
														<AlertTriangle className="h-4 w-4" />
													) : t.status === "Aktif" ? (
														<Clock className="h-4 w-4" />
													) : null}
													{t.tenggatWaktu}
												</span>
											</td>
											<td className="py-4 px-6 text-center">
												<span
													className={`text-xs font-bold px-3 py-1.5 rounded-md ${
														t.status === "Selesai"
															? "bg-teal-50 text-teal-600"
															: t.status === "Terlambat"
																? "bg-red-50 text-red-600"
																: "bg-amber-50 text-amber-600"
													}`}
												>
													{t.status}
												</span>
											</td>
											<td className="py-4 px-6 text-right">
												<div className="flex items-center justify-end gap-2">
													{t.filePdf && (
														<button
															onClick={() => window.open(t.filePdf, "_blank")}
															className="px-3 py-2 bg-slate-100 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-200 tooltip flex items-center gap-2"
															title="Lihat Jawaban"
														>
															<Eye className="h-4 w-4" />
														</button>
													)}
												{t.status === "Selesai" ? (
													t.isDeadlinePassed ? (
														<span className="text-sm font-bold text-slate-400 italic cursor-not-allowed">
															Terkunci (Selesai)
														</span>
													) : (
														<button
															onClick={() => openUploadModal(t)}
															className="px-4 py-2 bg-white border border-teal-500 text-teal-600 text-xs font-bold rounded-lg hover:bg-teal-50 flex items-center gap-2"
														>
															<RefreshCw className="h-4 w-4" /> Ganti File
														</button>
													)
												) : t.status === "Aktif" ? (
													<button
														onClick={() => openUploadModal(t)}
														className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 shadow-sm flex items-center gap-2"
													>
														<UploadCloud className="h-4 w-4" /> Upload
													</button>
												) : (
													<button
														onClick={() => openUploadModal(t)}
														className="px-4 py-2 bg-white border border-red-500 text-red-600 text-xs font-bold rounded-lg hover:bg-red-50 flex items-center gap-2"
													>
														<UploadCloud className="h-4 w-4" /> Upload Susulan
													</button>
												)}
												</div>
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
				</div>

				{/* PAGINATION */}
				<div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-sm text-slate-500 font-medium">
						Menampilkan{" "}
						<strong className="text-slate-800">
							{tasks.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + itemsPerPage, tasks.length)}
						</strong>{" "}
						dari <strong className="text-slate-800">{tasks.length}</strong> tugas
					</p>
					{totalPages > 1 && (
						<div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
							<button
								onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
								disabled={currentPage === 1}
								className="px-2 py-1 text-slate-400 hover:text-slate-700 disabled:opacity-50"
							>
								&lsaquo;
							</button>
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
								<button
									key={num}
									onClick={() => setCurrentPage(num)}
									className={`px-3 py-1 text-sm font-bold rounded-md ${currentPage === num ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
								>
									{num}
								</button>
							))}
							<button
								onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
								disabled={currentPage === totalPages}
								className="px-2 py-1 text-slate-400 hover:text-slate-700 disabled:opacity-50"
							>
								&rsaquo;
							</button>
						</div>
					)}
				</div>
			</div>

			{/* === MODAL UPLOAD / KONFIRMASI === */}
			{isUploadModalOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
							<div>
								<h2 className="text-lg font-bold text-slate-900">
									{selectedTask?.status === "Selesai" ? "Re-Upload Tugas" : "Upload Tugas Literasi"}
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
										untuk tugas ini?
									</p>

									{selectedTask?.status === "Selesai" && (
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
		</div>
	);
}
