// app/admin/dashboard/page.tsx
export const dynamic = "force-dynamic"; // <--- INI TAMBAHANNYA PAK
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import { TrendingUp, Hourglass, AlertTriangle, FileText, Plus } from "lucide-react";
import Link from "next/link"; // <--- TAMBAHKAN INI

// Inisialisasi Klien Prisma Lino
const prisma = new LinoClient();

export default async function AdminDashboard() {
	const hariIni = new Date();

	// Hitung H+3 untuk tugas yang mendekati tenggat
	const tigaHariLagi = new Date();
	tigaHariLagi.setDate(tigaHariLagi.getDate() + 3);

	// 1. Kueri Data Fokus Literasi
	const tugasAktifLiterasi = await prisma.penugasanLino.count({
		where: { tipe: "LITERASI", status: "DITUGASKAN" },
	});

	// Asumsi: "Menunggu Penilaian" = Tugas sudah di-submit siswa (SELESAI) tapi belum dinilai guru (nilaiAkhir = null)
	const menungguPenilaian = await prisma.hasilKerjaSiswa.count({
		where: {
			penugasan: { tipe: "LITERASI" },
			statusPengerjaan: "SELESAI",
			nilaiAkhir: null,
		},
	});

	const mendekatiTenggat = await prisma.penugasanLino.count({
		where: {
			tipe: "LITERASI",
			status: "DITUGASKAN",
			waktuSelesai: {
				gte: hariIni,
				lte: tigaHariLagi,
			},
		},
	});

	// 2. Kueri Data Ringkasan Numerasi
	const agregatNumerasi = await prisma.hasilKerjaSiswa.aggregate({
		_avg: { nilaiAkhir: true },
		where: { penugasan: { tipe: "NUMERASI" } },
	});
	const rataRataNumerasi = Math.round(agregatNumerasi._avg.nilaiAkhir || 0);

	const totalTugasNumerasi = await prisma.hasilKerjaSiswa.count({
		where: { penugasan: { tipe: "NUMERASI" } },
	});
	const tugasSelesaiNumerasi = await prisma.hasilKerjaSiswa.count({
		where: { penugasan: { tipe: "NUMERASI" }, statusPengerjaan: "SELESAI" },
	});

	const persentaseSelesaiNumerasi =
		totalTugasNumerasi > 0 ? Math.round((tugasSelesaiNumerasi / totalTugasNumerasi) * 100) : 0;

	// 3. Kueri Tugas Terbaru (3 Teratas)
	const tugasTerbaru = await prisma.penugasanLino.findMany({
		orderBy: { createdAt: "desc" },
		take: 3,
	});

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
			{/* Header Section */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-slate-900">Ringkasan Pemantauan</h1>
					<p className="text-slate-500 mt-1">Pantau perkembangan kemampuan dasar literasi dan numerasi siswa.</p>
				</div>
				{/* --- BAGIAN TOMBOL YANG DIUBAH MENJADI LINK --- */}
				<div className="flex items-center gap-3">
					<Link
						href="/admin/literasi"
						className="px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
					>
						<Plus className="h-4 w-4" /> Tambah Tugas Literasi
					</Link>
					<Link
						href="/admin/numerasi"
						className="px-4 py-2.5 bg-white text-slate-700 border border-slate-300 text-sm font-semibold rounded-lg shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
					>
						<FileText className="h-4 w-4" /> Input Nilai Numerasi
					</Link>
				</div>
			</div>

			{/* Grid Dashboard */}
			<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
				{/* --- SISI KIRI: Literasi (3 kolom) --- */}
				<div className="lg:col-span-3 space-y-4">
					<h2 className="text-xl font-bold text-slate-800">Fokus Literasi</h2>

					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
							<p className="text-sm font-semibold text-slate-500 mb-2">Tugas Aktif</p>
							<div className="flex items-end justify-between mt-4">
								<span className="text-5xl font-extrabold text-slate-900 tracking-tight">{tugasAktifLiterasi}</span>
								<TrendingUp className="h-6 w-6 text-emerald-500 mb-1" />
							</div>
						</div>

						<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
							<p className="text-sm font-semibold text-slate-500 mb-2">Menunggu Penilaian</p>
							<div className="flex items-end justify-between mt-4">
								<span className="text-5xl font-extrabold text-slate-900 tracking-tight">{menungguPenilaian}</span>
								<Hourglass className="h-6 w-6 text-amber-500 mb-1" />
							</div>
						</div>

						<div className="bg-red-50 p-6 rounded-2xl shadow-sm border border-red-200 flex flex-col justify-between">
							<p className="text-sm font-semibold text-red-600 mb-2">Mendekati Tenggat</p>
							<div className="flex items-end justify-between mt-4">
								<span className="text-5xl font-extrabold text-red-600 tracking-tight">{mendekatiTenggat}</span>
								<AlertTriangle className="h-6 w-6 text-red-600 mb-1 fill-red-100" />
							</div>
						</div>
					</div>
				</div>

				{/* --- SISI KANAN: Numerasi (2 kolom) --- */}
				<div className="lg:col-span-2 space-y-4">
					<h2 className="text-xl font-bold text-slate-800">Ringkasan Numerasi</h2>

					<div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-l-amber-500 border-y border-r border-slate-200 h-[calc(100%-2.5rem)]">
						<p className="text-sm font-semibold text-slate-600 mb-6">Performa Siswa</p>

						<div className="space-y-6">
							<div>
								<div className="flex justify-between text-sm mb-2">
									<span className="font-medium text-slate-700">Rata-rata Nilai</span>
									<span className="font-bold text-slate-900">{rataRataNumerasi}</span>
								</div>
								<div className="w-full bg-slate-100 rounded-full h-2.5">
									<div className="bg-slate-900 h-2.5 rounded-full" style={{ width: `${rataRataNumerasi}%` }}></div>
								</div>
							</div>

							<div>
								<div className="flex justify-between text-sm mb-2">
									<span className="font-medium text-slate-700">Penyelesaian Tugas</span>
									<span className="font-bold text-slate-900">
										{tugasSelesaiNumerasi}/{totalTugasNumerasi}
									</span>
								</div>
								<div className="w-full bg-slate-100 rounded-full h-2.5">
									<div
										className="bg-teal-600 h-2.5 rounded-full"
										style={{ width: `${persentaseSelesaiNumerasi}%` }}
									></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* --- BAWAH: Tugas Terbaru --- */}
			<div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
				<div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
					<h3 className="font-bold text-slate-800">Tugas Terbaru</h3>
					<button className="text-sm font-semibold text-teal-600 hover:text-teal-700">Lihat Semua</button>
				</div>

				<div className="divide-y divide-slate-100">
					{tugasTerbaru.length === 0 ? (
						<div className="px-6 py-8 text-center text-slate-500 text-sm">
							Belum ada tugas yang ditambahkan ke sistem.
						</div>
					) : (
						tugasTerbaru.map((tugas) => {
							// Format Tanggal
							const tanggalBuat = new Intl.DateTimeFormat("id-ID", {
								day: "numeric",
								month: "short",
								year: "numeric",
							}).format(new Date(tugas.createdAt));

							// Logika Badge Status
							const isOverdue = tugas.status === "DITUGASKAN" && new Date(tugas.waktuSelesai) < hariIni;
							let badgeColor = "bg-teal-100 text-teal-700";
							let badgeText = tugas.status;

							if (isOverdue) {
								badgeColor = "bg-red-100 text-red-700";
								badgeText = "TERLAMBAT";
							} else if (tugas.status === "DITUGASKAN") {
								badgeColor = "bg-emerald-100 text-emerald-700";
							} else if (tugas.status === "SELESAI") {
								badgeColor = "bg-blue-100 text-blue-700";
							} else {
								badgeColor = "bg-slate-100 text-slate-700";
								badgeText = "DRAF";
							}

							return (
								<div
									key={tugas.id}
									className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
								>
									<div>
										<p className="font-semibold text-slate-800 text-base">{tugas.judul}</p>
										<p
											className={`text-sm flex items-center gap-1.5 mt-1 ${isOverdue ? "text-red-600 font-medium" : "text-slate-500"}`}
										>
											{isOverdue ? <AlertTriangle className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
											{tanggalBuat}
										</p>
									</div>
									<span className={`px-3 py-1 text-xs font-bold rounded-md tracking-wide w-fit ${badgeColor}`}>
										{badgeText}
									</span>
								</div>
							);
						})
					)}
				</div>
			</div>
		</div>
	);
}
