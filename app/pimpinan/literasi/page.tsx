// app/pimpinan/literasi/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import LiterasiPimpinanClient from "./ClientUI";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function PimpinanLiterasiPage({ searchParams }: { searchParams: Promise<{ page?: string; tab?: string; q?: string }> }) {
	const awaitedParams = await searchParams;
	const currentPage = Number(awaitedParams?.page) || 1;
	const tab = awaitedParams?.tab || "Semua Kelas";
	const q = awaitedParams?.q || "";
	const itemsPerPage = 6;
	const skip = (currentPage - 1) * itemsPerPage;

	const ta = await prismaEjournal.tahunAjaran.findFirst({ where: { isActive: true } });
	if (!ta) return <div className="p-8 font-bold">Belum ada Tahun Ajaran aktif.</div>;

	// Tarik semua kelas yang punya siswa di TA aktif
	const syaratKelasAktif: any = {
		AND: [
			{ nama: { startsWith: "X" } },
			{ riwayatSiswa: { some: { tahunAjaranId: ta.id } } }
		]
	};

	if (q) {
		syaratKelasAktif.AND.push({ nama: { contains: q } });
	}

	if (tab !== "Semua Kelas") {
		syaratKelasAktif.AND.push({ nama: { startsWith: `${tab}-` } });
	}

	// Tarik Data Kelas (Pagination + Keseluruhan untuk PDF)
	const [kelasPaginasi, totalKelas, semuaKelas, semuaSiswa] = await Promise.all([
		prismaEjournal.kelas.findMany({
			skip,
			take: itemsPerPage,
			where: syaratKelasAktif,
			include: { 
				waliKelas: { include: { guru: { include: { user: true } } } },
				jadwalPelajaran: {
					where: {
						OR: [{ hari: 2 }, { hari: 4 }],
						waktuMulai: "1"
					},
					include: { guru: { include: { user: true } } }
				}
			},
			orderBy: { nama: "asc" },
		}),
		prismaEjournal.kelas.count({ where: syaratKelasAktif }),
		prismaEjournal.kelas.findMany({
			where: syaratKelasAktif,
			include: { 
				waliKelas: { include: { guru: { include: { user: true } } } }
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

	// Tarik semua tugas literasi
	const semuaTugas = await prismaLino.penugasanLino.findMany({
		where: { tipe: "LITERASI", tahunAjaranId: ta.id },
		include: { hasilKerjaSiswa: true },
	});

	// Fungsi Pembentuk Data Kelas
	const prosesDataKelas = (daftarKelas: any[]) => {
		return daftarKelas.map((k) => {
			const isKelasX = k.nama.startsWith("X") && !k.nama.startsWith("XI");
			const guruPendamping = k.jadwalPelajaran?.[0]?.guru?.user?.nama;
			const wali = (isKelasX && guruPendamping) ? guruPendamping : (k.waliKelas[0]?.guru.user.nama || "Belum Ditugaskan");
			const tugasKelasIni = semuaTugas.filter((t) => t.kelasId === k.id);
			const totalTugas = tugasKelasIni.length;

			// Kalkulasi Rata-rata Selesai
			let sumSelesai = 0;
			tugasKelasIni.forEach((t) => {
				sumSelesai += t.hasilKerjaSiswa.filter((h) => h.statusPengerjaan === "SELESAI").length;
			});

			const siswaDiKelasIni = semuaSiswa.filter((s) => s.kelasId === k.id);
			const totalMaxUpload = siswaDiKelasIni.length * totalTugas;
			const avgSubmission = totalMaxUpload > 0 ? Math.round((sumSelesai / totalMaxUpload) * 100) : 0;

			// Data Siswa Detail untuk PDF
			const studentsData = siswaDiKelasIni.map((riwayat) => {
				let uploaded = 0;
				tugasKelasIni.forEach((t) => {
					if (t.hasilKerjaSiswa.some((h) => h.siswaId === riwayat.siswaId && h.statusPengerjaan === "SELESAI")) {
						uploaded++;
					}
				});
				return {
					nama: riwayat.siswa.user.nama,
					nis: riwayat.siswa.nis,
					uploaded,
					total: totalTugas,
				};
			});

			return { id: k.id, nama: k.nama, wali, totalTugas, avgSubmission, students: studentsData };
		});
	};

	const cardsData = prosesDataKelas(kelasPaginasi);
	const allDataForPdf = prosesDataKelas(semuaKelas);

	return (
		<LiterasiPimpinanClient
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
