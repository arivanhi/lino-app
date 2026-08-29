// app/pimpinan/numerasi/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import NumerasiPimpinanClient from "./ClientUI";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function PimpinanNumerasiPage({ searchParams }: { searchParams: Promise<{ page?: string; tab?: string; q?: string }> }) {
	const awaitedParams = await searchParams;
	const currentPage = Number(awaitedParams?.page) || 1;
	const tab = awaitedParams?.tab || "Semua Kelas";
	const q = awaitedParams?.q || "";
	const itemsPerPage = 6;
	const skip = (currentPage - 1) * itemsPerPage;

	const ta = await prismaEjournal.tahunAjaran.findFirst({ where: { isActive: true } });
	if (!ta) return <div className="p-8 font-bold">Belum ada Tahun Ajaran aktif.</div>;

	const syaratKelasAktif: any = { riwayatSiswa: { some: { tahunAjaranId: ta.id } } };

	if (q) {
		syaratKelasAktif.nama = { contains: q };
	}

	if (tab !== "Semua Kelas") {
		syaratKelasAktif.nama = {
			...syaratKelasAktif.nama,
			startsWith: `${tab}-`,
		};
	}

	// Tarik Data Kelas (Pagination + Keseluruhan untuk PDF)
	const [kelasPaginasi, totalKelas, semuaKelas, semuaSiswa] = await Promise.all([
		prismaEjournal.kelas.findMany({
			skip,
			take: itemsPerPage,
			where: syaratKelasAktif,
			include: { 
				waliKelas: { include: { guru: { include: { user: true } } } },
				pendamping: { include: { user: true } }
			},
			orderBy: { nama: "asc" },
		}),
		prismaEjournal.kelas.count({ where: syaratKelasAktif }),
		prismaEjournal.kelas.findMany({
			where: syaratKelasAktif,
			include: { 
				waliKelas: { include: { guru: { include: { user: true } } } },
				pendamping: { include: { user: true } }
			},
			orderBy: { nama: "asc" },
		}),
		prismaEjournal.riwayatKelasSiswa.findMany({
			where: { tahunAjaranId: ta.id },
			include: { siswa: { include: { user: true } } },
			orderBy: { siswa: { user: { nama: "asc" } } },
		}),
	]);

	const totalPages = Math.ceil(totalKelas / itemsPerPage);

	// Tarik Semua Tugas Numerasi
	const tugasNumerasi = await prismaLino.penugasanLino.findMany({
		where: { tipe: "NUMERASI", tahunAjaranId: ta.id },
		include: { hasilKerjaSiswa: true },
		orderBy: { createdAt: "asc" },
	});

	// Fungsi Pembentuk Data Kelas
	const prosesDataKelas = (daftarKelas: any[]) => {
		return daftarKelas.map((k) => {
			const wali = k.pendamping ? k.pendamping.user.nama : (k.waliKelas[0]?.guru.user.nama || "Belum Ditugaskan");
			const tugasKelasIni = tugasNumerasi.filter((t) => t.kelasId === k.id);
			const siswaDiKelasIni = semuaSiswa.filter((s) => s.kelasId === k.id);

			let sumAvgSiswa = 0;
			let countSiswaBerisi = 0;

			const studentsData = siswaDiKelasIni.map((riwayat) => {
				const scores: Record<string, number | null> = {};
				let total = 0;
				let count = 0;
				tugasKelasIni.forEach((t) => {
					const val = t.hasilKerjaSiswa.find((h) => h.siswaId === riwayat.siswaId)?.nilaiAkhir ?? null;
					scores[t.id] = val;
					if (val !== null) {
						total += val;
						count++;
					}
				});

				const avgSiswa = count > 0 ? Number((total / count).toFixed(1)) : null;
				if (avgSiswa !== null) {
					sumAvgSiswa += avgSiswa;
					countSiswaBerisi++;
				}

				return {
					nama: riwayat.siswa.user.nama,
					nis: riwayat.siswa.nis,
					scores,
					average: avgSiswa !== null ? avgSiswa : "-",
				};
			});

			const avgKelas = countSiswaBerisi > 0 ? (sumAvgSiswa / countSiswaBerisi).toFixed(1) : "0.0";
			return {
				id: k.id,
				nama: k.nama,
				wali,
				totalTugas: tugasKelasIni.length,
				avgKelas,
				tasks: tugasKelasIni.map((t) => ({ id: t.id, judul: t.judul })),
				students: studentsData,
			};
		});
	};

	const cardsData = prosesDataKelas(kelasPaginasi);
	const allDataForPdf = prosesDataKelas(semuaKelas);

	return (
		<NumerasiPimpinanClient
			semesterName={ta.nama}
			cards={cardsData}
			allClasses={allDataForPdf}
			currentPage={currentPage}
			totalPages={totalPages}
			tab={tab}
			q={q}
		/>
	);
}
