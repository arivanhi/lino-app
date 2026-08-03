// app/pimpinan/literasi/[kelasId]/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../../prisma/generated/lino-client";
import LiterasiDetailUI from "../../../../components/LiterasiDetailUI";
import { notFound } from "next/navigation";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function PimpinanLiterasiDetail({ params }: { params: Promise<{ kelasId: string }> }) {
	const { kelasId } = await params;

	const ta = await prismaEjournal.tahunAjaran.findFirst({ where: { isActive: true } });
	if (!ta) return notFound();

	const kelas = await prismaEjournal.kelas.findUnique({
		where: { id: kelasId },
		include: { waliKelas: { include: { guru: { include: { user: true } } } } },
	});
	if (!kelas) return notFound();

	const wali = kelas.waliKelas[0]?.guru.user.nama || "Belum Ditugaskan";

	// Data Tugas
	const tasks = await prismaLino.penugasanLino.findMany({
		where: { kelasId, tahunAjaranId: ta.id, tipe: "LITERASI" },
		include: { hasilKerjaSiswa: true },
		orderBy: { createdAt: "asc" },
	});

	// Data Siswa
	const siswaData = await prismaEjournal.riwayatKelasSiswa.findMany({
		where: { kelasId, tahunAjaranId: ta.id },
		include: { siswa: { include: { user: true } } },
		orderBy: { siswa: { user: { nama: "asc" } } },
	});

	const students = siswaData.map((riwayat) => {
		let uploaded = 0;
		const history: any[] = [];

		tasks.forEach((t) => {
			const h = t.hasilKerjaSiswa.find((h) => h.siswaId === riwayat.siswaId);
			if (h?.statusPengerjaan === "SELESAI") uploaded++;
			if (h) history.push({ judul: t.judul, status: h.statusPengerjaan, pdf: h.fileJawabanPdf || null });
		});

		const isMastered = uploaded === tasks.length && tasks.length > 0;
		const isOnTrack = uploaded >= tasks.length / 2;
		const status = isMastered ? "Mastered" : isOnTrack ? "On Track" : "Tertinggal";

		return {
			siswaId: riwayat.siswaId,
			nama: riwayat.siswa.user.nama,
			nis: riwayat.siswa.nis,
			uploaded,
			status,
			history,
		};
	});

	return (
		<LiterasiDetailUI
			kelasNama={kelas.nama}
			waliKelas={wali}
			semesterName={ta.nama}
			tasks={tasks}
			students={students}
			backUrl="/pimpinan/literasi"
		/>
	);
}
