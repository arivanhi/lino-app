// app/admin/literasi/page.tsx
export const dynamic = "force-dynamic";

import Link from "next/link";
import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import ClassFilter from "../../components/ClassFilter";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function LiterasiPage({
	searchParams,
}: {
	// Di Next.js terbaru, searchParams adalah Promise
	searchParams: Promise<{ page?: string }>;
}) {
	const awaitedParams = await searchParams;
	const currentPage = Number(awaitedParams?.page) || 1;
	const tab = awaitedParams?.tab || "Semua Kelas";
	const q = awaitedParams?.q || "";
	const itemsPerPage = 6;
	const skip = (currentPage - 1) * itemsPerPage;

	// 1. Cari Tahun Ajaran yang sedang Aktif
	const tahunAjaranAktif = await prismaEjournal.tahunAjaran.findFirst({
		where: { isActive: true },
	});

	if (!tahunAjaranAktif) {
		return (
			<div className="p-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[50vh] text-center">
				<h1 className="text-2xl font-bold text-slate-800 mb-2">Belum Ada Tahun Ajaran Aktif</h1>
				<p className="text-slate-500">
					Silakan atur tahun ajaran aktif melalui database/aplikasi E-Journal terlebih dahulu agar daftar kelas muncul.
				</p>
			</div>
		);
	}

	// Syarat pencarian: Kelas harus memiliki riwayat siswa pada tahun ajaran yang aktif
	const syaratKelasAktif: any = {
		riwayatSiswa: {
			some: { tahunAjaranId: tahunAjaranAktif.id },
		},
	};

	if (q) {
		syaratKelasAktif.nama = { contains: q };
	}

	if (tab !== "Semua Kelas") {
		syaratKelasAktif.nama = {
			...syaratKelasAktif.nama,
			startsWith: `${tab}-`,
		};
	}

	// 2. Ambil data Kelas & Wali Kelas dengan syarat di atas
	const [kelasData, totalKelas] = await Promise.all([
		prismaEjournal.kelas.findMany({
			skip,
			take: itemsPerPage,
			where: syaratKelasAktif,
			include: {
				waliKelas: {
					include: { guru: { include: { user: true } } },
				},
			},
			orderBy: { nama: "asc" },
		}),
		prismaEjournal.kelas.count({ where: syaratKelasAktif }),
	]);

	const totalPages = Math.ceil(totalKelas / itemsPerPage);

	// 3. Ambil jumlah tugas Literasi per kelas dari database Lino
	const kelasIds = kelasData.map((k) => k.id);
	const taskCounts = await prismaLino.penugasanLino.groupBy({
		by: ["kelasId"],
		where: { kelasId: { in: kelasIds }, tipe: "LITERASI" },
		_count: true,
	});

	// Fungsi Cerdas Pengambil Inisial (Mengabaikan Gelar)
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
			<div>
				<h1 className="text-3xl font-bold text-slate-900">Manajemen Literasi</h1>
				<p className="text-slate-500 mt-1 mb-6">
					Tahun Ajaran Aktif: <span className="font-semibold text-teal-600">{tahunAjaranAktif.nama}</span>
				</p>
			</div>

			<ClassFilter />

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{kelasData.map((kelas) => {
					const taskCount = taskCounts.find((t) => t.kelasId === kelas.id)?._count || 0;
					const namaWali = kelas.waliKelas[0]?.guru.user.nama || "Belum Ditugaskan";

					return (
						<div
							key={kelas.id}
							className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow"
						>
							<div className="flex justify-between items-start mb-6">
								<h2 className="text-xl font-bold text-slate-800">Kelas {kelas.nama}</h2>
								<span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
									<FileText className="h-3.5 w-3.5" /> {taskCount} Tugas
								</span>
							</div>

							<div className="mb-6">
								<p className="text-xs font-semibold text-slate-500 mb-2">Wali Kelas</p>
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-bold">
										{getInitials(namaWali)}
									</div>
									<p className="text-sm font-semibold text-slate-700">{namaWali}</p>
								</div>
							</div>

							<Link
								href={`/admin/literasi/${kelas.id}`}
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
						href={`/admin/literasi?page=${currentPage - 1}${tab !== "Semua Kelas" ? `&tab=${tab}` : ""}${q ? `&q=${q}` : ""}`}
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
						href={`/admin/literasi?page=${currentPage + 1}${tab !== "Semua Kelas" ? `&tab=${tab}` : ""}${q ? `&q=${q}` : ""}`}
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
