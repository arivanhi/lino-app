"use client";

import { useState, useMemo } from "react";
import { Users, BookOpen, Calculator, Search, Download, AlertTriangle, AlertCircle, X } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// --- KOMPONEN KOP SURAT PDF ---
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
	isLast
}: {
	children: React.ReactNode;
	orientation?: "portrait" | "landscape";
	isLast?: boolean;
}) => {
	const isPortrait = orientation === "portrait";
	const width = isPortrait ? "210mm" : "297mm";
	// Mengurangi 1mm untuk menghindari micro-overflow yang memicu blank page
	const height = isPortrait ? "296mm" : "209mm";

	return (
		<div
			style={{
				width,
				height, // Gunakan height pasti, bukan minHeight
				backgroundColor: "white",
				color: "black",
				boxSizing: "border-box",
				padding: "10mm 15mm",
				position: "relative",
				display: "flex",
				flexDirection: "column",
				pageBreakAfter: isLast ? "auto" : "always",
				overflow: "hidden" // Menjaga agar elemen tetap berada dalam kertas
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

export default function DashboardClientUI({
	role,
	totalSiswa,
	pctLiterasi,
	avgNumerasi,
	listBelumLiterasi,
	listNumerasiMerah,
	detailTabelKelas,
	trendDataRaw,
}: any) {
	const [activeTab, setActiveTab] = useState(detailTabelKelas[0]?.kelasId || "");
	const [search, setSearch] = useState("");
	const [trendFilter, setTrendFilter] = useState<"Harian" | "Mingguan" | "Bulanan">("Harian");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);

	const activeClassData = detailTabelKelas.find((k: any) => k.kelasId === activeTab);
	const filteredStudents =
		activeClassData?.students.filter(
			(s: any) => s.nama.toLowerCase().includes(search.toLowerCase()) || s.nis.includes(search),
		) || [];

	const chartData = useMemo(() => {
		const now = new Date();
		const data = trendDataRaw || [];

		if (trendFilter === "Harian") {
			const days = [];
			for (let i = 6; i >= 0; i--) {
				const d = new Date(now);
				d.setDate(d.getDate() - i);
				days.push({
					dateObj: d,
					name: d.toLocaleDateString("id-ID", { weekday: "short" }),
					Literasi: 0,
					Numerasi: 0,
				});
			}
			data.forEach((item: any) => {
				const d = new Date(item.tanggal);
				const dayMatch = days.find((day) => day.dateObj.toDateString() === d.toDateString());
				if (dayMatch) {
					if (item.tipe === "LITERASI") dayMatch.Literasi++;
					if (item.tipe === "NUMERASI") dayMatch.Numerasi++;
				}
			});
			return days;
		} else if (trendFilter === "Mingguan") {
			const weeks = [
				{ name: "Mg 1", start: 1, end: 7, Literasi: 0, Numerasi: 0 },
				{ name: "Mg 2", start: 8, end: 14, Literasi: 0, Numerasi: 0 },
				{ name: "Mg 3", start: 15, end: 21, Literasi: 0, Numerasi: 0 },
				{ name: "Mg 4", start: 22, end: 31, Literasi: 0, Numerasi: 0 },
			];
			data.forEach((item: any) => {
				const d = new Date(item.tanggal);
				if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
					const dateNum = d.getDate();
					const weekMatch = weeks.find((w) => dateNum >= w.start && dateNum <= w.end);
					if (weekMatch) {
						if (item.tipe === "LITERASI") weekMatch.Literasi++;
						if (item.tipe === "NUMERASI") weekMatch.Numerasi++;
					}
				}
			});
			return weeks;
		} else {
			const months = [];
			for (let i = 5; i >= 0; i--) {
				const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
				months.push({
					month: d.getMonth(),
					year: d.getFullYear(),
					name: d.toLocaleDateString("id-ID", { month: "short" }),
					Literasi: 0,
					Numerasi: 0,
				});
			}
			data.forEach((item: any) => {
				const d = new Date(item.tanggal);
				const monthMatch = months.find((m) => m.month === d.getMonth() && m.year === d.getFullYear());
				if (monthMatch) {
					if (item.tipe === "LITERASI") monthMatch.Literasi++;
					if (item.tipe === "NUMERASI") monthMatch.Numerasi++;
				}
			});
			return months;
		}
	}, [trendFilter, trendDataRaw]);

	// --- FUNGSI EXPORT Laporan Harian PDF ---
	const handleDownloadPdf = async () => {
		setIsDownloading(true);
		// Biarkan React mere-render komponen hidden sebelum meng-export
		setTimeout(async () => {
			try {
				const html2pdf = (await import("html2pdf.js")).default;
				const element = document.getElementById("pdf-harian-report");
				if (!element) return;

				const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

				const opt = {
					margin: 0, // Margin diset 0 untuk mematuhi <PageContainer>
					filename: `Laporan_Harian_Lino_${today.replace(/\s/g, "_")}.pdf`,
					image: { type: "jpeg", quality: 1 },
					html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
					jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
					pagebreak: { mode: ["css"] }, // Hanya gunakan CSS pageBreak
				};

				await html2pdf().set(opt).from(element).save();
			} catch (error) {
				console.error("Gagal men-generate PDF:", error);
				alert("Terjadi kesalahan saat memproses laporan PDF.");
			} finally {
				setIsDownloading(false);
			}
		}, 500);
	};

	// --- LOGIKA CHUNKING PDF ---
	const MAX_LITERASI_ROWS = 15;
	const MAX_NUMERASI_ROWS = 15;

	// Sort Data Secara Abjad Sebelum Di Chunk
	const sortedBelumLiterasi = [...listBelumLiterasi].sort((a: any, b: any) => a.nama.localeCompare(b.nama));
	const sortedNumerasiMerah = [...listNumerasiMerah].sort((a: any, b: any) => a.nama.localeCompare(b.nama));
	const sortedAllStudents = [];

	detailTabelKelas.forEach((k: any) => {
		const sorted = [...k.students].sort((a: any, b: any) => a.nama.localeCompare(b.nama));
		sortedAllStudents.push({ ...k, students: sorted });
	});

	const literasiChunks = chunkArray(sortedBelumLiterasi, MAX_LITERASI_ROWS);
	if (literasiChunks.length === 0) literasiChunks.push([]);

	const numerasiMerahChunks = chunkArray(sortedNumerasiMerah, MAX_NUMERASI_ROWS);
	if (numerasiMerahChunks.length === 0) numerasiMerahChunks.push([]);

	// Kalkulasi Total Halaman PDF (1 Hal Cover + Hal Literasi + Hal Numerasi Merah + Hal Tabel Siswa)
	let totalPdfPages = 1 + literasiChunks.length + numerasiMerahChunks.length;
	sortedAllStudents.forEach((k: any) => {
		const chunks = chunkArray(k.students, 30);
		totalPdfPages += (chunks.length > 0 ? chunks.length : 1);
	});

	let pageCounter = 1;

	return (
		<>
			<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
				{/* HEADER */}
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
					<div>
						<h1 className="text-3xl font-bold text-slate-900">Overview Laporan</h1>
						<p className="text-slate-500 mt-1">
							Ringkasan performa siswa {role === "WALI_KELAS" ? "di kelas Anda" : "secara keseluruhan"}.
						</p>
					</div>
					<button
						onClick={handleDownloadPdf}
						disabled={isDownloading}
						className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 flex items-center gap-2 shadow-sm"
					>
						<Download className="h-4 w-4" /> {isDownloading ? "Mengekspor..." : "Export Laporan Hari Ini"}
					</button>
				</div>

				{/* OVERVIEW CARDS */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="bg-white p-6 rounded-2xl border-l-4 border-l-slate-800 border-y border-r border-slate-200 shadow-sm">
						<div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider mb-3">
							<Users className="h-4 w-4" /> Total Siswa Aktif
						</div>
						<p className="text-4xl font-black text-slate-900">{totalSiswa}</p>
					</div>
					<div className="bg-white p-6 rounded-2xl border-l-4 border-l-teal-600 border-y border-r border-slate-200 shadow-sm">
						<div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider mb-3">
							<BookOpen className="h-4 w-4" /> Literasi: Selesai
						</div>
						<div className="flex items-baseline gap-2">
							<p className="text-4xl font-black text-slate-900">{pctLiterasi}%</p>
							<span className="text-xs font-bold text-teal-600">~+2%</span>
						</div>
					</div>
					<div className="bg-white p-6 rounded-2xl border-l-4 border-l-slate-900 border-y border-r border-slate-200 shadow-sm">
						<div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-wider mb-3">
							<Calculator className="h-4 w-4" /> Numerasi: Rata-rata
						</div>
						<div className="flex items-baseline gap-2">
							<p className="text-4xl font-black text-slate-900">{avgNumerasi}</p>
							<span className="text-xs font-bold text-red-500">~-1.2</span>
						</div>
					</div>
				</div>

				{/* MIDDLE SECTION: CHART & WARNINGS */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* GRAFIK TREN */}
					<div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
						<div className="flex justify-between items-center mb-6">
							<h3 className="font-bold text-slate-900 text-lg">Tren Sesi Aktif</h3>
							<select
								value={trendFilter}
								onChange={(e: any) => setTrendFilter(e.target.value)}
								className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg outline-none cursor-pointer"
							>
								<option value="Harian">Harian</option>
								<option value="Mingguan">Mingguan</option>
								<option value="Bulanan">Bulanan</option>
							</select>
						</div>
						<div className="flex-1 min-h-[250px] w-full">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={chartData} barSize={30}>
									<CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
									<XAxis
										dataKey="name"
										axisLine={false}
										tickLine={false}
										tick={{ fill: "#64748b", fontSize: 12 }}
										dy={10}
									/>
									<YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} dx={-10} />
									<Tooltip
										cursor={{ fill: "#f1f5f9" }}
										contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
									/>
									<Legend
										iconType="circle"
										wrapperStyle={{ fontSize: "12px", fontWeight: "bold", paddingTop: "10px" }}
									/>
									<Bar dataKey="Literasi" fill="#0d9488" radius={[4, 4, 0, 0]} />
									<Bar dataKey="Numerasi" fill="#0f172a" radius={[4, 4, 0, 0]} />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>

					{/* SCROLLABLE WARNING LISTS (DIPERBAIKI MAX 5 BARIS LALU SCROLL) */}
					<div className="space-y-6 flex flex-col h-full">
						{/* Box Literasi Belum */}
						<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1 h-[200px]">
							<div className="p-4 border-b border-slate-100 bg-slate-50">
								<h4 className="text-xs font-bold text-teal-700 flex items-center gap-1.5">
									<AlertTriangle className="h-4 w-4" /> Literasi: Belum Selesai
								</h4>
							</div>
							{/* Tambahkan max-height agar bisa di scroll jika data > 5 */}
							<div className="overflow-y-auto p-4 space-y-3 flex-1 max-h-[160px] custom-scrollbar">
								{sortedBelumLiterasi.length === 0 ? (
									<p className="text-xs text-slate-400 italic">Semua tuntas.</p>
								) : (
									sortedBelumLiterasi.map((s: any, i: number) => (
										<div key={i} className="flex justify-between items-center border-b border-slate-50 pb-2 last:border-0">
											<p className="text-sm font-semibold text-slate-700">{s.nama}</p>
											<span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
												{s.kelas}
											</span>
										</div>
									))
								)}
							</div>
						</div>

						{/* Box Numerasi Merah */}
						<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1 h-[200px]">
							<div className="p-4 border-b border-slate-100 bg-slate-50">
								<h4 className="text-xs font-bold text-red-600 flex items-center gap-1.5">
									<AlertCircle className="h-4 w-4" /> Numerasi: Nilai &lt; 50
								</h4>
							</div>
							<div className="overflow-y-auto p-4 space-y-3 flex-1 max-h-[160px] custom-scrollbar">
								{sortedNumerasiMerah.length === 0 ? (
									<p className="text-xs text-slate-400 italic">Tidak ada.</p>
								) : (
									sortedNumerasiMerah.map((s: any, i: number) => (
										<div
											key={i}
											className="flex justify-between items-center border-b border-slate-50 pb-2 last:border-0"
										>
											<div className="flex flex-col">
												<p className="text-sm font-semibold text-slate-700">{s.nama}</p>
												<span className="text-[10px] text-slate-500">{s.kelas}</span>
											</div>
											<span className="text-xs font-black text-red-600 bg-red-50 px-2 py-1 rounded">{s.nilai}</span>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				</div>

				{/* BOTTOM SECTION: TABS & TABLE NUMERASI */}
				<div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
					{/* TABS */}
					<div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 custom-scrollbar">
						{detailTabelKelas.map((k: any) => (
							<button
								key={k.kelasId}
								onClick={() => setActiveTab(k.kelasId)}
								className={`px-6 py-3 text-sm font-bold whitespace-nowrap transition-colors border-b-2 ${activeTab === k.kelasId ? "border-slate-900 text-slate-900 bg-white" : "border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-100"}`}
							>
								{k.kelasNama}
							</button>
						))}
					</div>

					<div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100">
						<h3 className="font-bold text-slate-900 text-lg">Data Detail Numerasi</h3>
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
							<input
								type="text"
								placeholder="Cari siswa..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm w-full sm:w-64 outline-none focus:border-slate-500"
							/>
						</div>
					</div>

					<div className="overflow-x-auto custom-scrollbar">
						<table className="w-full text-sm text-left border-collapse">
							<thead className="bg-white text-slate-600 font-bold border-b border-slate-200 text-xs tracking-wider">
								<tr>
									<th className="py-3 px-5 text-center w-[5%]">No</th>
									<th className="py-3 px-5 w-[30%]">Nama Siswa</th>
									<th className="py-3 px-5 w-[15%]">NIS</th>
									{activeClassData?.numHeaders.map((h: any) => (
										<th key={h.id} className="py-3 px-5 text-center">
											{h.judul}
										</th>
									))}
									<th className="py-3 px-5 text-center">Rata-rata</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100">
								{/* LIMIT TAMPILAN DI DASHBOARD HANYA 5 SISWA, SISANYA DI MODAL */}
								{filteredStudents.slice(0, 5).map((s: any, idx: number) => (
									<tr key={s.siswaId} className="hover:bg-slate-50">
										<td className="py-3 px-5 text-center text-slate-500">{idx + 1}</td>
										<td className="py-3 px-5 font-bold text-slate-800">{s.nama}</td>
										<td className="py-3 px-5 text-slate-500">{s.nis}</td>
										{activeClassData?.numHeaders.map((h: any) => {
											const val = s.scores[h.id];
											return (
												<td
													key={h.id}
													className={`py-3 px-5 text-center font-bold ${val !== null && val < 50 ? "text-red-500" : "text-slate-700"}`}
												>
													{val !== null ? val : "-"}
												</td>
											);
										})}
										<td
											className={`py-3 px-5 text-center font-black ${s.average !== "-" && Number(s.average) < 50 ? "text-red-600" : "text-slate-900"}`}
										>
											{s.average}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* BUTTON LIHAT SEMUA SISWA */}
					<div className="p-3 border-t border-slate-100 bg-slate-50">
						<button
							onClick={() => setIsModalOpen(true)}
							className="w-full py-2 text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors"
						>
							Lihat Semua Siswa {activeClassData?.kelasNama}
						</button>
					</div>
				</div>
			</div>

			{/* === MODAL "LIHAT SEMUA SISWA" === */}
			{isModalOpen && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
					<div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[85vh]">
						<div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
							<div>
								<h2 className="text-lg font-bold text-slate-900">Seluruh Data Numerasi</h2>
								<p className="text-xs text-slate-500 font-semibold mt-0.5">Kelas {activeClassData?.kelasNama}</p>
							</div>
							<button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
								<X className="h-6 w-6" />
							</button>
						</div>

						<div className="overflow-auto flex-1 p-6 custom-scrollbar">
							<table className="w-full text-sm text-left border-collapse">
								<thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 text-xs tracking-wider sticky top-0 shadow-sm">
									<tr>
										<th className="py-3 px-5 text-center w-[5%]">No</th>
										<th className="py-3 px-5 w-[30%]">Nama Siswa</th>
										<th className="py-3 px-5 w-[15%]">NIS</th>
										{activeClassData?.numHeaders.map((h: any) => (
											<th key={h.id} className="py-3 px-5 text-center">
												{h.judul}
											</th>
										))}
										<th className="py-3 px-5 text-center">Rata-rata</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-100">
									{filteredStudents.map((s: any, idx: number) => (
										<tr key={s.siswaId} className="hover:bg-slate-50">
											<td className="py-3 px-5 text-center text-slate-500">{idx + 1}</td>
											<td className="py-3 px-5 font-bold text-slate-800">{s.nama}</td>
											<td className="py-3 px-5 text-slate-500">{s.nis}</td>
											{activeClassData?.numHeaders.map((h: any) => {
												const val = s.scores[h.id];
												return (
													<td
														key={h.id}
														className={`py-3 px-5 text-center font-bold ${val !== null && val < 50 ? "text-red-500" : "text-slate-700"}`}
													>
														{val !== null ? val : "-"}
													</td>
												);
											})}
											<td
												className={`py-3 px-5 text-center font-black ${s.average !== "-" && Number(s.average) < 50 ? "text-red-600" : "text-slate-900"}`}
											>
												{s.average}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}

			{/* === HIDDEN PDF TEMPLATE (EKSPOR LAPORAN HARI INI) === */}
			<div style={{ position: "absolute", top: "-9999px", left: "-9999px", visibility: "hidden" }}>
				<div id="pdf-harian-report" style={{ backgroundColor: "white", width: "210mm" }}>
					{/* HALAMAN 1: COVER & OVERVIEW */}
					<PageContainer orientation="portrait" isLast={false}>
						<KopSurat />

						<h3
							style={{
								fontSize: "16pt",
								fontWeight: "bold",
								textAlign: "center",
								margin: "20px 0 5px 0",
								textTransform: "uppercase",
							}}
						>
							Laporan Harian Performa Siswa
						</h3>
						<p style={{ textAlign: "center", fontSize: "11pt", marginBottom: "30px" }}>
							Tanggal: {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
						</p>

						{/* Rekap Overview Kotak */}
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
								<p style={{ fontSize: "10pt", fontWeight: "bold", color: "#64748b", marginBottom: "5px" }}>
									Total Siswa Aktif
								</p>
								<p style={{ fontSize: "24pt", fontWeight: "bold", margin: 0 }}>{totalSiswa}</p>
							</div>
							<div
								style={{
									flex: 1,
									border: "1px solid #cbd5e1",
									borderRadius: "8px",
									padding: "15px",
									textAlign: "center",
									backgroundColor: "#f0fdf4",
								}}
							>
								<p style={{ fontSize: "10pt", fontWeight: "bold", color: "#0f766e", marginBottom: "5px" }}>
									Literasi Selesai
								</p>
								<p style={{ fontSize: "24pt", fontWeight: "bold", margin: 0, color: "#0f766e" }}>{pctLiterasi}%</p>
							</div>
							<div
								style={{
									flex: 1,
									border: "1px solid #cbd5e1",
									borderRadius: "8px",
									padding: "15px",
									textAlign: "center",
									backgroundColor: "#f8fafc",
								}}
							>
								<p style={{ fontSize: "10pt", fontWeight: "bold", color: "#0f172a", marginBottom: "5px" }}>
									Numerasi Rata-Rata
								</p>
								<p style={{ fontSize: "24pt", fontWeight: "bold", margin: 0 }}>{avgNumerasi}</p>
							</div>
						</div>

						{/* A. DAFTAR LITERASI BELUM SELESAI */}
						<h4
							style={{
								fontSize: "12pt",
								fontWeight: "bold",
								borderBottom: "2px solid #0f766e",
								paddingBottom: "5px",
								marginBottom: "10px",
								color: "#0f766e",
							}}
						>
							A. Daftar Literasi Belum Selesai
						</h4>
						<table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #000", marginBottom: "20px", fontSize: "10pt" }}>
							<thead>
								<tr style={{ backgroundColor: "#f1f5f9" }}>
									<th style={{ border: "1px solid #000", padding: "6px", width: "10%", textAlign: "center" }}>No</th>
									<th style={{ border: "1px solid #000", padding: "6px", width: "60%", textAlign: "left" }}>Nama Siswa</th>
									<th style={{ border: "1px solid #000", padding: "6px", width: "30%", textAlign: "center" }}>Kelas</th>
								</tr>
							</thead>
							<tbody>
								{literasiChunks[0].length === 0 ? (
									<tr>
										<td colSpan={3} style={{ border: "1px solid #000", padding: "6px", textAlign: "center", fontStyle: "italic" }}>
											Nihil (Semua Tuntas)
										</td>
									</tr>
								) : (
									literasiChunks[0].map((s: any, i: number) => (
										<tr key={i}>
											<td style={{ border: "1px solid #000", padding: "6px", textAlign: "center" }}>{i + 1}</td>
											<td style={{ border: "1px solid #000", padding: "6px", fontWeight: "bold" }}>{s.nama}</td>
											<td style={{ border: "1px solid #000", padding: "6px", textAlign: "center" }}>{s.kelas}</td>
										</tr>
									))
								)}
							</tbody>
						</table>
						<PageFooter current={pageCounter++} total={totalPdfPages} />
					</PageContainer>
					<div className="html2pdf__page-break"></div>

					{/* A. DAFTAR LITERASI BELUM SELESAI (LANJUTAN JIKA ADA) */}
					{literasiChunks.slice(1).map((chunk: any[], chunkIdx: number) => (
						<div key={`literasi-ext-${chunkIdx}`}>
							<PageContainer orientation="portrait" isLast={false}>
								<KopSurat />
								<h4
									style={{
										fontSize: "12pt",
										fontWeight: "bold",
										borderBottom: "2px solid #0f766e",
										paddingBottom: "5px",
										marginBottom: "10px",
										color: "#0f766e",
									}}
								>
									A. Daftar Literasi Belum Selesai (Lanjutan)
								</h4>
								<table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #000", marginBottom: "20px", fontSize: "10pt" }}>
									<thead>
										<tr style={{ backgroundColor: "#f1f5f9" }}>
											<th style={{ border: "1px solid #000", padding: "6px", width: "10%", textAlign: "center" }}>No</th>
											<th style={{ border: "1px solid #000", padding: "6px", width: "60%", textAlign: "left" }}>Nama Siswa</th>
											<th style={{ border: "1px solid #000", padding: "6px", width: "30%", textAlign: "center" }}>Kelas</th>
										</tr>
									</thead>
									<tbody>
										{chunk.map((s: any, i: number) => (
											<tr key={i}>
												<td style={{ border: "1px solid #000", padding: "6px", textAlign: "center" }}>{(chunkIdx + 1) * MAX_LITERASI_ROWS + i + 1}</td>
												<td style={{ border: "1px solid #000", padding: "6px", fontWeight: "bold" }}>{s.nama}</td>
												<td style={{ border: "1px solid #000", padding: "6px", textAlign: "center" }}>{s.kelas}</td>
											</tr>
										))}
									</tbody>
								</table>
								<PageFooter current={pageCounter++} total={totalPdfPages} />
							</PageContainer>
							<div className="html2pdf__page-break"></div>
						</div>
					))}

					{/* B. DAFTAR NUMERASI MERAH (<50) */}
					{numerasiMerahChunks.map((chunk: any[], chunkIdx: number) => (
						<div key={`numerasi-merah-${chunkIdx}`}>
							<PageContainer orientation="portrait" isLast={false}>
								<KopSurat />
								<h4
									style={{
										fontSize: "12pt",
										fontWeight: "bold",
										borderBottom: "2px solid #b91c1c",
										paddingBottom: "5px",
										marginBottom: "10px",
										color: "#b91c1c",
									}}
								>
									B. Peringatan: Numerasi &lt; 50 {chunkIdx > 0 ? "(Lanjutan)" : ""}
								</h4>
								<table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #000", marginBottom: "20px", fontSize: "10pt" }}>
									<thead>
										<tr style={{ backgroundColor: "#fef2f2" }}>
											<th style={{ border: "1px solid #000", padding: "6px", width: "10%", textAlign: "center", color: "#b91c1c" }}>No</th>
											<th style={{ border: "1px solid #000", padding: "6px", width: "50%", textAlign: "left", color: "#b91c1c" }}>Nama Siswa</th>
											<th style={{ border: "1px solid #000", padding: "6px", width: "25%", textAlign: "center", color: "#b91c1c" }}>Kelas</th>
											<th style={{ border: "1px solid #000", padding: "6px", width: "15%", textAlign: "center", color: "#b91c1c" }}>Nilai</th>
										</tr>
									</thead>
									<tbody>
										{chunk.length === 0 ? (
											<tr>
												<td colSpan={4} style={{ border: "1px solid #000", padding: "6px", textAlign: "center", fontStyle: "italic" }}>
													Nihil (Semua Lulus di atas 50)
												</td>
											</tr>
										) : (
											chunk.map((s: any, i: number) => (
												<tr key={i}>
													<td style={{ border: "1px solid #000", padding: "6px", textAlign: "center" }}>{chunkIdx * MAX_NUMERASI_ROWS + i + 1}</td>
													<td style={{ border: "1px solid #000", padding: "6px", fontWeight: "bold" }}>{s.nama}</td>
													<td style={{ border: "1px solid #000", padding: "6px", textAlign: "center" }}>{s.kelas}</td>
													<td style={{ border: "1px solid #000", padding: "6px", textAlign: "center", fontWeight: "bold", color: "#b91c1c" }}>{s.nilai}</td>
												</tr>
											))
										)}
									</tbody>
								</table>
								<PageFooter current={pageCounter++} total={totalPdfPages} />
							</PageContainer>
							<div className="html2pdf__page-break"></div>
						</div>
					))}

					{/* C. DAFTAR DETAIL NUMERASI SELURUH KELAS */}
					{sortedAllStudents.map((k: any, kIndex: number) => {
						const classChunks = chunkArray(k.students, 25); // Max 30 siswa untuk tabel numerasi

						return classChunks.map((chunk: any[], chunkIdx: number) => {
							const isVeryLastPage = (kIndex === sortedAllStudents.length - 1) && (chunkIdx === classChunks.length - 1);

							return (
								<div key={`kelas-${k.kelasId}-chunk-${chunkIdx}`}>
									<PageContainer orientation="portrait" isLast={isVeryLastPage}>
										<KopSurat />
										<h4 style={{ fontSize: "14pt", fontWeight: "bold", marginBottom: "15px", marginTop: "10px" }}>
											C. Detail Numerasi: Kelas {k.kelasNama} {chunkIdx > 0 ? `(Bag. ${chunkIdx + 1})` : ""}
										</h4>
										<table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt" }}>
											<thead>
												<tr style={{ backgroundColor: "#f1f5f9" }}>
													<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center", width: "5%" }}>No</th>
													<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "left", width: "35%" }}>Nama Siswa</th>
													<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "left", width: "15%" }}>NIS</th>
													{k.numHeaders.map((h: any) => (
														<th key={h.id} style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center" }}>
															{h.judul}
														</th>
													))}
													<th style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center" }}>Rata-rata</th>
												</tr>
											</thead>
											<tbody>
												{chunk.map((s: any, idx: number) => (
													<tr key={s.siswaId} style={{ pageBreakInside: "avoid" }}>
														<td style={{ border: "1px solid #cbd5e1", padding: "8px", textAlign: "center" }}>{chunkIdx * 30 + idx + 1}</td>
														<td style={{ border: "1px solid #cbd5e1", padding: "8px", fontWeight: "bold" }}>{s.nama}</td>
														<td style={{ border: "1px solid #cbd5e1", padding: "8px" }}>{s.nis}</td>
														{k.numHeaders.map((h: any) => {
															const val = s.scores[h.id];
															return (
																<td
																	key={h.id}
																	style={{
																		border: "1px solid #cbd5e1",
																		padding: "8px",
																		textAlign: "center",
																		color: val !== null && val < 50 ? "#ef4444" : "inherit",
																		fontWeight: val !== null && val < 50 ? "bold" : "normal"
																	}}
																>
																	{val !== null ? val : "-"}
																</td>
															);
														})}
														<td
															style={{
																border: "1px solid #cbd5e1",
																padding: "8px",
																textAlign: "center",
																fontWeight: "bold",
																color: s.average !== "-" && Number(s.average) < 50 ? "#ef4444" : "inherit"
															}}
														>
															{s.average}
														</td>
													</tr>
												))}
											</tbody>
										</table>
										<PageFooter current={pageCounter++} total={totalPdfPages} />
									</PageContainer>
									{!isVeryLastPage && <div className="html2pdf__page-break"></div>}
								</div>
							);
						});
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
		</>
	);
}