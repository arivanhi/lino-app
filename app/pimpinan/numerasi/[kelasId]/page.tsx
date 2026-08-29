// app/pimpinan/numerasi/[kelasId]/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../../prisma/generated/lino-client";
import NumerasiDetailUI from "../../../../components/NumerasiDetailUI";
import { notFound } from "next/navigation";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function PimpinanNumerasiDetail({ params }: { params: Promise<{ kelasId: string }> }) {
	const { kelasId } = await params;

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

	const wali = kelas.pendamping ? kelas.pendamping.user.nama : (kelas.waliKelas[0]?.guru.user.nama || "Belum Ditugaskan");

	const tasks = await prismaLino.penugasanLino.findMany({
		where: { kelasId, tahunAjaranId: ta.id, tipe: "NUMERASI" },
		include: { hasilKerjaSiswa: true },
		orderBy: { createdAt: "asc" },
	});

	const siswaData = await prismaEjournal.riwayatKelasSiswa.findMany({
		where: { kelasId, tahunAjaranId: ta.id },
		include: { siswa: { include: { user: true } } },
		orderBy: { siswa: { user: { nama: "asc" } } },
	});

	let sumAvg = 0;
	let countAvg = 0;
	const students = siswaData.map((riwayat) => {
		const scores: Record<string, number | null> = {};
		let total = 0;
		let count = 0;
		const numHistory: any[] = [];
		tasks.forEach((t) => {
			const h = t.hasilKerjaSiswa.find((h) => h.siswaId === riwayat.siswaId);
			const val = h?.nilaiAkhir ?? null;
			scores[t.id] = val;
			if (val !== null) {
				total += val;
				count++;
			}
			numHistory.push({
				judul: t.judul,
				deskripsi: t.deskripsi || null,
				nilai: val,
				soalPdf: t.fileSoalUrl || null,
				jawabanPdf: h?.fileJawabanPdf || null,
			});
		});

		const avgSiswa = count > 0 ? Number((total / count).toFixed(1)) : null;
		if (avgSiswa !== null) {
			sumAvg += avgSiswa;
			countAvg++;
		}

		return {
			siswaId: riwayat.siswaId,
			nama: riwayat.siswa.user.nama,
			nis: riwayat.siswa.nis,
			scores,
			average: avgSiswa !== null ? avgSiswa : "-",
			numHistory,
		};
	});

	const avgKelas = countAvg > 0 ? (sumAvg / countAvg).toFixed(1) : "0.0";

	return (
		<NumerasiDetailUI
			kelasNama={kelas.nama}
			waliKelas={wali}
			semesterName={ta.nama}
			tasks={tasks}
			students={students}
			avgKelas={avgKelas}
			backUrl="/pimpinan/numerasi"
		/>
	);
}
