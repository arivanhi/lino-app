// app/admin/numerasi/page.tsx
export const dynamic = "force-dynamic";

import Link from "next/link";
import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import ClassFilter from "../../components/ClassFilter";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function NumerasiPage({ searchParams }: { searchParams: Promise<{ page?: string, tab?: string, q?: string }> }) {
	const awaitedParams = await searchParams;
	const currentPage = Number(awaitedParams?.page) || 1;
	const tab = awaitedParams?.tab || "Semua Kelas";
	const q = awaitedParams?.q || "";
	const itemsPerPage = 6;
	const skip = (currentPage - 1) * itemsPerPage;

	// 1. Cari Tahun Ajaran Aktif
	const tahunAjaranAktif = await prismaEjournal.tahunAjaran.findFirst({
		where: { isActive: true },
	});

	if (!tahunAjaranAktif) {
		return (
			<div className="p-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[50vh] text-center">
				<h1 className="text-2xl font-bold text-slate-800 mb-2">Belum Ada Tahun Ajaran Aktif</h1>
				<p className="text-slate-500">
					Silakan atur tahun ajaran aktif melalui database/aplikasi E-Journal terlebih dahulu.
				</p>
			</div>
		);
	}

	// Syarat pencarian: Kelas harus memiliki riwayat siswa pada tahun ajaran yang aktif
	const syaratKelasAktif: any = {
		AND: [
			{ nama: { startsWith: "X" } },
			{ riwayatSiswa: { some: { tahunAjaranId: tahunAjaranAktif.id } } }
		]
	};

	if (q) {
		syaratKelasAktif.AND.push({ nama: { contains: q } });
	}

	if (tab !== "Semua Kelas") {
		syaratKelasAktif.AND.push({ nama: { startsWith: `${tab}-` } });
	}

	// 2. Ambil data Kelas dengan paginasi
	const [kelasData, totalKelas] = await Promise.all([
		prismaEjournal.kelas.findMany({
			skip,
			take: itemsPerPage,
			where: syaratKelasAktif,
			orderBy: { nama: "asc" },
		}),
		prismaEjournal.kelas.count({ where: syaratKelasAktif }),
	]);

	const totalPages = Math.ceil(totalKelas / itemsPerPage);
	const kelasIds = kelasData.map((k) => k.id);

	// 3. Ambil seluruh Penugasan Numerasi untuk kelas-kelas tersebut
	const penugasanNumerasi = await prismaLino.penugasanLino.findMany({
		where: { kelasId: { in: kelasIds }, tipe: "NUMERASI" },
		select: { id: true, kelasId: true },
	});
	const penugasanIds = penugasanNumerasi.map((p) => p.id);

	// 4. Ambil seluruh Hasil Kerja (Nilai) terkait
	const hasilKerja = await prismaLino.hasilKerjaSiswa.findMany({
		where: { penugasanId: { in: penugasanIds } },
		select: { penugasanId: true, nilaiAkhir: true, statusPengerjaan: true },
	});

	return (
		<div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-slate-900">Manajemen Numerasi</h1>
					<p className="text-slate-500 mt-1 mb-6">
						Tahun Ajaran Aktif: <span className="font-semibold text-teal-600">{tahunAjaranAktif.nama}</span>
					</p>
				</div>

				<ClassFilter />
			</div>

			{/* Grid Kartu Kelas */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{kelasData.map((kelas) => {
					// Filter tugas milik kelas ini
					const tugasKelasIni = penugasanNumerasi.filter((p) => p.kelasId === kelas.id).map((p) => p.id);
					const hasilKelasIni = hasilKerja.filter((h) => tugasKelasIni.includes(h.penugasanId));

					let rataRata = 0;
					let isCompleted = false;

					if (hasilKelasIni.length > 0) {
						const nilaiTerkumpul = hasilKelasIni.filter((h) => h.nilaiAkhir !== null);
						if (nilaiTerkumpul.length > 0) {
							const totalNilai = nilaiTerkumpul.reduce((sum, h) => sum + (h.nilaiAkhir || 0), 0);
							rataRata = Math.round(totalNilai / nilaiTerkumpul.length);
						}
						// Dianggap selesai jika semua siswa yang ditugaskan sudah ada nilainya
						isCompleted = hasilKelasIni.every((h) => h.statusPengerjaan === "SELESAI" && h.nilaiAkhir !== null);
					}

					return (
						<div
							key={kelas.id}
							className="bg-white rounded-2xl border-l-4 border-l-slate-900 border-y border-r border-slate-200 shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow"
						>
							<div className="flex justify-between items-start mb-4">
								<h2 className="text-xl font-bold text-slate-800">Kelas {kelas.nama}</h2>
								{tugasKelasIni.length === 0 ? (
									<span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">
										Belum Ada Tugas
									</span>
								) : isCompleted ? (
									<span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
										<FileText className="h-3.5 w-3.5" /> Selesai
									</span>
								) : (
									<span className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
										<FileText className="h-3.5 w-3.5" /> Menunggu
									</span>
								)}
							</div>

							<div className="mb-6">
								<p className="text-xs font-semibold text-slate-500 mb-1">Rata-rata Nilai</p>
								<div className="flex items-baseline gap-2">
									<span className="text-5xl font-extrabold text-slate-900">
										{tugasKelasIni.length > 0 ? `${rataRata}%` : "--"}
									</span>
									{!isCompleted && tugasKelasIni.length > 0 && (
										<span className="text-sm font-medium text-slate-500">(Dalam Proses)</span>
									)}
								</div>
							</div>

							<Link
								href={`/admin/numerasi/${kelas.id}`}
								className="mt-auto block w-full text-center py-2.5 border border-teal-600 text-teal-700 font-semibold text-sm rounded-xl hover:bg-teal-50 transition-colors"
							>
								Lihat Detail &rarr;
							</Link>
						</div>
					);
				})}
			</div>

			{totalPages > 1 && (
				<div className="flex items-center justify-between border-t border-slate-200 pt-6 mt-8">
					<Link
						href={`/admin/numerasi?page=${currentPage - 1}${tab !== "Semua Kelas" ? `&tab=${tab}` : ""}${q ? `&q=${q}` : ""}`}
						className={`flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-800 transition-colors ${
							currentPage === 1 ? "pointer-events-none opacity-50" : "hover:bg-slate-50"
						}`}
					>
						<ChevronLeft className="h-4 w-4" /> Sebelumnya
					</Link>
					<span className="text-sm font-medium text-slate-600">
						Halaman {currentPage} dari {totalPages}
					</span>
					<Link
						href={`/admin/numerasi?page=${currentPage + 1}${tab !== "Semua Kelas" ? `&tab=${tab}` : ""}${q ? `&q=${q}` : ""}`}
						className={`flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-800 transition-colors ${
							currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:bg-slate-50"
						}`}
					>
						Selanjutnya <ChevronRight className="h-4 w-4" />
					</Link>
				</div>
			)}
		</div>
	);
}
