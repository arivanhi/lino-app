// app/admin/literasi/[kelasId]/ClientUI.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// Tambahkan ArrowLeft di daftar import icon
import { Plus, X, Download, Eye, TrendingUp, Book, AlertTriangle, Users, ArrowLeft } from "lucide-react";
import { createLiteracyTask } from "./actions";

type TaskProps = { id: string; judul: string; waktuSelesai: Date; status: string };
type StudentProps = {
	siswaId: string;
	nama: string;
	nis: string;
	tugasSelesai: number;
	totalTugas: number;
	filePdfTerakhir?: string | null;
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

	const [judul, setJudul] = useState("");
	const [deadline, setDeadline] = useState("");
	const [instruksi, setInstruksi] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleCreateTask = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			await createLiteracyTask(kelasId, judul, deadline, instruksi);

			setJudul("");
			setDeadline("");
			setInstruksi("");
			setIsModalOpen(false);
		} catch (error) {
			alert("Terjadi kesalahan saat menyimpan tugas. Pastikan Tahun Ajaran aktif sudah disetel.");
		} finally {
			setIsSubmitting(false);
		}
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
		return words
			.slice(0, 2)
			.map((w) => w[0])
			.join("")
			.toUpperCase();
	};

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
			{/* Header View 2 dengan Tombol Back */}
			<div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
				<div className="flex items-start gap-4">
					{/* Tombol Back */}
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

				<button
					onClick={() => setIsModalOpen(true)}
					className="px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-slate-800 transition-colors flex items-center gap-2 h-fit"
				>
					<Plus className="h-4 w-4" /> Tambah Topik Baru
				</button>
			</div>

			{/* Card Statistik */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
					<p className="text-sm font-semibold text-slate-500 mb-2 flex items-center justify-between">
						Rata-rata Penyelesaian <TrendingUp className="h-4 w-4 text-teal-600" />
					</p>
					<p className="text-3xl font-bold text-slate-900">85%</p>
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
					<p className="text-3xl font-bold text-slate-900">3</p>
				</div>
				<div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
					<p className="text-sm font-semibold text-slate-500 mb-2 flex items-center justify-between">
						Partisipasi Aktif <Users className="h-4 w-4 text-blue-600" />
					</p>
					<p className="text-3xl font-bold text-slate-900">{students.length}</p>
				</div>
			</div>

			{/* Konten Utama 2 Kolom */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
					<div className="p-5 border-b border-slate-100 flex justify-between items-center">
						<h3 className="font-bold text-slate-800">Topik Ditugaskan</h3>
					</div>
					<div className="p-5 space-y-4">
						{tasks.length === 0 ? (
							<p className="text-sm text-slate-500 italic text-center py-4">Belum ada tugas.</p>
						) : (
							tasks.map((task) => (
								<div key={task.id} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
									<p className="font-bold text-slate-800 text-sm mb-1">{task.judul}</p>
									<div className="flex justify-between items-center text-xs text-slate-500">
										<span>Tenggat: {new Date(task.waktuSelesai).toLocaleDateString("id-ID")}</span>
										<span className={task.status === "SELESAI" ? "text-teal-600 font-semibold" : ""}>
											{task.status}
										</span>
									</div>
								</div>
							))
						)}
					</div>
				</div>

				<div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
					<div className="p-5 border-b border-slate-100 flex justify-between items-center">
						<h3 className="font-bold text-slate-800">Progres Siswa</h3>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left">
							<thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 text-xs">
								<tr>
									<th className="px-5 py-3">Nama Siswa</th>
									<th className="px-5 py-3">NIS</th>
									<th className="px-5 py-3 text-center">Tugas Diunggah</th>
									<th className="px-5 py-3 text-center">Aksi Dokumen</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100">
								{students.map((siswa) => (
									<tr key={siswa.siswaId} className="hover:bg-slate-50">
										<td className="px-5 py-4 font-semibold text-slate-800 flex items-center gap-3">
											<div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
												{getInitials(siswa.nama)}
											</div>
											{siswa.nama}
										</td>
										<td className="px-5 py-4 text-slate-600">{siswa.nis}</td>
										<td className="px-5 py-4 text-center">
											<span className="font-bold text-slate-800">{siswa.tugasSelesai}</span>
											<span className="text-slate-500">/{siswa.totalTugas}</span>
										</td>
										<td className="px-5 py-4 flex justify-center gap-2">
											{siswa.filePdfTerakhir ? (
												<>
													<button
														onClick={() => handleViewPdf(siswa.filePdfTerakhir!)}
														className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-md transition-colors tooltip"
														title="Lihat Langsung (View)"
													>
														<Eye className="h-4 w-4" />
													</button>
													<a
														href={siswa.filePdfTerakhir}
														download={`Tugas_${siswa.nama}.pdf`}
														className="p-1.5 bg-teal-50 text-teal-600 hover:bg-teal-100 rounded-md transition-colors tooltip"
														title="Download PDF"
													>
														<Download className="h-4 w-4" />
													</a>
												</>
											) : (
												<span className="text-xs text-slate-400 italic">Belum Upload</span>
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{/* --- View 3: MODAL TAMBAH TUGAS --- */}
			{isModalOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
							<h2 className="text-lg font-bold text-slate-800 border-l-4 border-teal-600 pl-2">
								Add New Literacy Task
							</h2>
							<button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
								<X className="h-5 w-5" />
							</button>
						</div>

						<form onSubmit={handleCreateTask} className="p-6 space-y-4">
							<div>
								<label className="block text-xs font-bold text-slate-700 mb-1">Task Topic (Judul)</label>
								<input
									type="text"
									required
									value={judul}
									onChange={(e) => setJudul(e.target.value)}
									placeholder="e.g., Reading Comprehension Practice"
									className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-bold text-slate-700 mb-1">Target Class</label>
								<input
									type="text"
									value={`Kelas ${namaKelas}`}
									disabled
									className="w-full border border-slate-200 bg-slate-50 text-slate-600 font-medium rounded-lg px-3 py-2.5 text-sm"
								/>
							</div>

							<div>
								<label className="block text-xs font-bold text-slate-700 mb-1">Deadline</label>
								<input
									type="date"
									required
									value={deadline}
									onChange={(e) => setDeadline(e.target.value)}
									className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
								/>
							</div>

							<div>
								<label className="block text-xs font-bold text-slate-700 mb-1">Task Instructions</label>
								<textarea
									required
									rows={4}
									value={instruksi}
									onChange={(e) => setInstruksi(e.target.value)}
									placeholder="Enter specific instructions for the students..."
									className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none"
								></textarea>
							</div>

							<div className="pt-4 flex justify-end gap-3">
								<button
									type="button"
									onClick={() => setIsModalOpen(false)}
									className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-bold rounded-lg hover:bg-slate-50"
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={isSubmitting}
									className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 flex items-center gap-2"
								>
									{isSubmitting ? "Menyimpan..." : "Create Task"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
