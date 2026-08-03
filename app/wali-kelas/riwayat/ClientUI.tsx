// app/wali-kelas/riwayat/ClientUI.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Eye, X, FileText, Calendar, User, BookOpen, Calculator, BarChart2 } from "lucide-react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as RechartsTooltip,
	ResponsiveContainer,
} from "recharts";

const KopSurat = () => (
	<tr>
		<td colSpan={100} style={{ paddingBottom: "10px", backgroundColor: "white" }}>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					borderBottom: "3px solid black",
					paddingBottom: "6px",
					marginBottom: "2px",
				}}
			>
				<img
					src="/logo_sekolah.jpg"
					onError={(e) => (e.currentTarget.src = "/logo.jpeg")}
					style={{ width: "80px", height: "80px", objectFit: "contain" }}
				/>
				<div style={{ flex: 1, textAlign: "center" }}>
					<h2
						style={{
							fontFamily: '"Times New Roman", Times, serif',
							fontSize: "22px",
							fontWeight: "bold",
							margin: "0 0 4px 0",
							letterSpacing: "1px",
						}}
					>
						SMA NEGERI 2 BREBES
					</h2>
					<p style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", margin: "0 0 2px 0" }}>
						Jl. Jend. A. Yani 77 Brebes 52212 Telp. (0283) 671060
					</p>
					<p style={{ fontFamily: "Arial, sans-serif", fontSize: "12px", margin: 0 }}>
						Website: www.sman2-brebes.sch.id - Email: smadabes@ymail.com
					</p>
				</div>
				<div style={{ width: "80px" }}></div>
			</div>
			<div style={{ borderBottom: "1px solid black", marginBottom: "10px" }}></div>
		</td>
	</tr>
);

export default function WaliKelasRiwayatClient({
	isEmpty,
	listTa,
	activeTaId,
	kelasNama,
	waliKelas,
	semesterName,
	literasiSiswa,
	numerasiSiswa,
	numHeaders,
}: any) {
	const router = useRouter();
	const [selectedLitHistory, setSelectedLitHistory] = useState<any[] | null>(null);
	const [studentNameModal, setStudentNameModal] = useState("");
	const [isExportModalOpen, setIsExportModalOpen] = useState(false);
	const [jangkaWaktu, setJangkaWaktu] = useState("SEMESTER");
	const [isDownloading, setIsDownloading] = useState(false);

	// Jika tidak punya kelas
	if (isEmpty) {
		return (
			<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
				<div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
					<div>
						<h1 className="text-3xl font-bold text-slate-900">Riwayat Lino</h1>
						<div className="flex items-center gap-3 mt-3">
							<span className="text-sm font-semibold text-slate-500">Tahun Ajaran:</span>
							<select
								value={activeTaId}
								onChange={(e) => router.push(`/wali-kelas/riwayat?ta=${e.target.value}`)}
								className="bg-white border border-slate-300 text-slate-700 text-sm font-bold px-3 py-1.5 rounded-lg outline-none cursor-pointer"
							>
								{listTa.map((ta: any) => (
									<option key={ta.id} value={ta.id}>
										{ta.nama}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				<div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
					<p className="text-slate-500 font-medium">
						Anda tidak memiliki catatan perwalian kelas pada Tahun Ajaran{" "}
						<strong className="text-slate-700">{semesterName}</strong>.
					</p>
				</div>
			</div>
		);
	}

	const totalRataNum = numerasiSiswa.reduce((sum: number, s: any) => sum + s.average, 0) / (numerasiSiswa.length || 1);
	const chartData = numHeaders.map((h: any, idx: number) => {
		const validScores = numerasiSiswa
			.map((s: any) => s.scores[h.id])
			.filter((score: any) => score !== null) as number[];
		const avg = validScores.length > 0 ? validScores.reduce((a, b) => a + b, 0) / validScores.length : 0;
		return {
			name: h.judul.includes("Numerasi") ? h.judul.replace("Numerasi", "Num") : `Num ${idx + 1}`,
			actual: Math.round(avg),
		};
	});

	const handleDownloadDetail = async () => {
		setIsDownloading(true);
		const html2pdf = (await import("html2pdf.js")).default;
		const element = document.getElementById("pdf-detail-report");
		const opt = {
			margin: 10,
			filename: `Detail_Lino_${kelasNama}_${semesterName.replace(/\s/g, "_")}.pdf`,
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: { scale: 2, useCORS: true },
			jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
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

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6 relative">
			<div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 border-b border-slate-200 pb-6">
				<div>
					<h1 className="text-3xl font-bold text-slate-900">Riwayat Lino - Kelas {kelasNama}</h1>
					<div className="flex items-center gap-4 mt-3">
						<div className="flex items-center gap-2">
							<Calendar className="h-4 w-4 text-slate-400" />
							<select
								value={activeTaId}
								onChange={(e) => router.push(`/wali-kelas/riwayat?ta=${e.target.value}`)}
								className="bg-white border border-slate-300 text-slate-700 text-sm font-bold px-2 py-1 rounded-md outline-none hover:border-slate-400 transition-colors"
							>
								{listTa.map((ta: any) => (
									<option key={ta.id} value={ta.id}>
										{ta.nama}
									</option>
								))}
							</select>
						</div>
						<span className="flex items-center gap-1.5 text-sm font-semibold text-slate-500">
							<User className="h-4 w-4" /> Wali Kelas: {waliKelas}
						</span>
					</div>
				</div>
				<button
					onClick={() => setIsExportModalOpen(true)}
					className="px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-slate-800 flex items-center gap-2 h-fit"
				>
					<Download className="h-4 w-4" /> Export Laporan PDF
				</button>
			</div>

			{/* (KODE CARD LITERASI, NUMERASI, & TABEL BAWAH SAMA PERSIS DENGAN DETAIL CLIENT UI ADMIN/PIMPINAN SEBELUMNYA) */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
				<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
					<h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
						<BookOpen className="h-5 w-5 text-teal-600" /> Literacy Engagement
					</h3>
					<div className="max-h-[300px] overflow-y-auto pr-2">
						<table className="w-full text-sm text-left">
							<thead className="bg-slate-50 text-slate-500 font-semibold sticky top-0">
								<tr>
									<th className="py-2 px-2">Nama Siswa</th>
									<th className="py-2 px-2 text-center">Terkumpul</th>
									<th className="py-2 px-2 text-right">Aksi</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100">
								{literasiSiswa.map((s: any) => (
									<tr key={s.siswaId}>
										<td className="py-3 px-2 font-semibold text-slate-800">{s.nama}</td>
										<td className="py-3 px-2 text-center font-bold text-slate-600">
											<span
												className={
													s.completed === s.total ? "text-teal-600" : s.completed < s.total / 2 ? "text-red-600" : ""
												}
											>
												{s.completed}/{s.total}
											</span>
										</td>
										<td className="py-3 px-2 text-right">
											<button
												onClick={() => {
													setStudentNameModal(s.nama);
													setSelectedLitHistory(s.history);
												}}
												className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-3 py-1.5 rounded-lg"
											>
												Lihat Tugas
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
					<h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
						<Calculator className="h-5 w-5 text-amber-500" /> Numeracy Performance
					</h3>
					<div className="flex gap-4 items-center mb-6">
						<div className="bg-slate-50 border border-slate-100 p-6 rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-inner shrink-0">
							<p className="text-3xl font-black text-slate-900">{totalRataNum.toFixed(1)}</p>
							<p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wide text-center">Rata-Rata</p>
						</div>
						<p className="text-sm font-medium text-slate-600">
							Siswa rata-rata telah menyelesaikan <strong className="text-slate-900">{numHeaders.length}</strong> sesi
							tes numerasi.
						</p>
					</div>
					<div className="flex-1 min-h-[150px] w-full">
						<h4 className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1">
							<BarChart2 className="h-3.5 w-3.5" /> Tren Nilai Kelas
						</h4>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={chartData}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
								<XAxis
									dataKey="name"
									axisLine={false}
									tickLine={false}
									tick={{ fill: "#94a3b8", fontSize: 10 }}
									dy={5}
								/>
								<YAxis
									domain={[0, 100]}
									axisLine={false}
									tickLine={false}
									tick={{ fill: "#94a3b8", fontSize: 10 }}
									dx={-5}
								/>
								<RechartsTooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
								<Line
									type="monotone"
									dataKey="actual"
									stroke="#f59e0b"
									strokeWidth={3}
									dot={{ r: 3, fill: "#f59e0b" }}
								/>
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>

			<div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
				<h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
					<BarChart2 className="h-5 w-5 text-blue-500" /> Detailed Numeracy Scores
				</h3>
				<table className="w-full text-sm text-left border-collapse">
					<thead className="bg-slate-50 text-slate-700 font-bold border-b-2 border-slate-200 uppercase text-xs tracking-wide">
						<tr>
							<th className="py-3 px-4">Nama Siswa</th>
							<th className="py-3 px-4">NIS</th>
							{numHeaders.map((h: any) => (
								<th key={h.id} className="py-3 px-4 text-center">
									{h.judul}
								</th>
							))}
							<th className="py-3 px-4 text-center bg-slate-100">Average</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-slate-100">
						{numerasiSiswa.map((s: any) => (
							<tr key={s.siswaId} className="hover:bg-slate-50">
								<td className="py-3 px-4 font-bold text-slate-800">{s.nama}</td>
								<td className="py-3 px-4 text-slate-600 font-medium">{s.nis}</td>
								{numHeaders.map((h: any) => (
									<td key={h.id} className="py-3 px-4 text-center font-semibold text-slate-700">
										{s.scores[h.id] !== null ? s.scores[h.id] : "-"}
									</td>
								))}
								<td className="py-3 px-4 text-center font-black bg-slate-50 text-slate-900">{s.average}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* MODAL EXPORT PDF, MODAL TUGAS SISWA & HIDDEN PDF SAMA PERSIS SEPERTI SEBELUMNYA */}
			{/* ... (Sisipkan kode modal dan <div id="pdf-detail-report"> dari Detail Admin sebelumnya di sini agar Export PDF tetap berfungsi) ... */}
		</div>
	);
}
