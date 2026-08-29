// app/admin/riwayat/[kelasId]/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../../prisma/generated/lino-client";
import RiwayatDetailClientUI from "./ClientUI";
import { notFound } from "next/navigation";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function RiwayatDetailServer({ params }: { params: Promise<{ kelasId: string }> }) {
	const { kelasId } = await params;

	// 1. Ambil Data Kelas & Tahun Ajaran
	const ta = await prismaEjournal.tahunAjaran.findFirst({ where: { isActive: true } });
	if (!ta) return notFound();

	const kelas = await prismaEjournal.kelas.findUnique({
		where: { id: kelasId },
		include: { 
			waliKelas: { include: { guru: { include: { user: true } } } },
			pendamping: { include: { user: true } }
		},
	});
	if (!kelas) return notFound();

	// 2. Ambil Siswa di Kelas Ini
	const siswaData = await prismaEjournal.riwayatKelasSiswa.findMany({
		where: { kelasId, tahunAjaranId: ta.id },
		include: { siswa: { include: { user: true } } },
		orderBy: { siswa: { user: { nama: "asc" } } },
	});

	// 3. Ambil Semua Tugas Lino (Lit & Num)
	const tugasLino = await prismaLino.penugasanLino.findMany({
		where: { kelasId, tahunAjaranId: ta.id },
		include: { hasilKerjaSiswa: true },
		orderBy: { createdAt: "asc" },
	});

	const tugasLit = tugasLino.filter((t) => t.tipe === "LITERASI");
	const tugasNum = tugasLino.filter((t) => t.tipe === "NUMERASI");

	// 4. Petakan Data Literasi per Siswa
	const literasiSiswa = siswaData.map((riwayat) => {
		let completed = 0;
		const history: { judul: string; deskripsi?: string | null; status: string; pdf: string | null; soalPdf: string | null }[] = [];

		tugasLit.forEach((t) => {
			const h = t.hasilKerjaSiswa.find((h) => h.siswaId === riwayat.siswaId);
			if (h?.statusPengerjaan === "SELESAI") completed++;
			if (h) {
				history.push({ 
					judul: t.judul, 
					deskripsi: t.deskripsi || null,
					status: h.statusPengerjaan, 
					pdf: h.fileJawabanPdf || null,
					soalPdf: t.fileSoalUrl || null
				});
			}
		});

		return {
			siswaId: riwayat.siswaId,
			nama: riwayat.siswa.user.nama,
			nis: riwayat.siswa.nis,
			completed,
			total: tugasLit.length,
			history,
		};
	});

	// 5. Petakan Data Numerasi per Siswa
	const numerasiSiswa = siswaData.map((riwayat) => {
		let countTaken = 0;
		let sumScore = 0;
		const scores: Record<string, number | null> = {};
		const numHistory: { judul: string; deskripsi?: string | null; nilai: number | null; soalPdf: string | null; jawabanPdf: string | null }[] = [];

		tugasNum.forEach((t) => {
			const h = t.hasilKerjaSiswa.find((h) => h.siswaId === riwayat.siswaId);
			const nilai = h?.nilaiAkhir ?? null;
			scores[t.id] = nilai;
			if (nilai !== null) {
				countTaken++;
				sumScore += nilai;
			}
			numHistory.push({
				judul: t.judul,
				deskripsi: t.deskripsi || null,
				nilai: nilai,
				soalPdf: t.fileSoalUrl || null,
				jawabanPdf: h?.fileJawabanPdf || null,
			});
		});

		return {
			siswaId: riwayat.siswaId,
			nama: riwayat.siswa.user.nama,
			nis: riwayat.siswa.nis,
			taken: countTaken,
			totalNum: tugasNum.length,
			scores,
			numHistory,
			average: countTaken > 0 ? Number((sumScore / countTaken).toFixed(1)) : 0,
		};
	});

	const numHeaders = tugasNum.map((t) => ({ id: t.id, judul: t.judul }));

	return (
		<RiwayatDetailClientUI
			kelasNama={kelas.nama}
			waliKelas={kelas.pendamping ? kelas.pendamping.user.nama : (kelas.waliKelas[0]?.guru.user.nama || "Belum Ditugaskan")}
			semesterName={ta.nama}
			literasiSiswa={literasiSiswa}
			numerasiSiswa={numerasiSiswa}
			numHeaders={numHeaders}
		/>
	);
}
