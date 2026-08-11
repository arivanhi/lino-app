// app/admin/numerasi/[kelasId]/ClientUI.tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Plus, X, Search, FileSpreadsheet, Download, Pencil, ArrowLeft, TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import * as XLSX from "xlsx";
import { saveNilaiNumerasi, uploadExcelNumerasi } from "./actions";

type TaskProps = { id: string; judul: string; avgScore: number };
type StudentProps = {
	siswaId: string;
	nama: string;
	nis: string;
	scores: Record<string, number | null>;
	average: number;
};

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
	const [modalType, setModalType] = useState<"UPLOAD" | "ADD" | null>(null);
	const [isDragging, setIsDragging] = useState(false);

	const [namaTugas, setNamaTugas] = useState("");
	const [selectedStudent, setSelectedStudent] = useState("");
	const [inputNilai, setInputNilai] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

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
			router.refresh();
		} catch (error) {
			alert("Terjadi kesalahan saat menyimpan nilai.");
		} finally {
			setIsSubmitting(false);
		}
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
				router.refresh();
			} catch (error) {
				alert("Format Excel tidak sesuai. Pastikan menggunakan template yang disediakan.");
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

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
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

				<div className="flex gap-3 h-fit">
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