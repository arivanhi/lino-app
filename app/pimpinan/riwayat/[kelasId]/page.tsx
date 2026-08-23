// app/pimpinan/riwayat/[kelasId]/page.tsx
export const dynamic = "force-dynamic";
import { PrismaClient as EjournalClient } from "../../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../../prisma/generated/lino-client";
import RiwayatDetailPimpinanUI from "./ClientUI";
import { notFound } from "next/navigation";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function PimpinanRiwayatDetail({ params }: { params: Promise<{ kelasId: string }> }) {
	const { kelasId } = await params;
	const ta = await prismaEjournal.tahunAjaran.findFirst({ where: { isActive: true } });
	if (!ta) return notFound();

	const kelas = await prismaEjournal.kelas.findUnique({
		where: { id: kelasId },
		include: { waliKelas: { include: { guru: { include: { user: true } } } } },
	});
	if (!kelas) return notFound();

	const siswaData = await prismaEjournal.riwayatKelasSiswa.findMany({
		where: { kelasId, tahunAjaranId: ta.id },
		include: { siswa: { include: { user: true } } },
		orderBy: { siswa: { user: { nama: "asc" } } },
	});

	const tugasLino = await prismaLino.penugasanLino.findMany({
		where: { kelasId, tahunAjaranId: ta.id },
		include: { hasilKerjaSiswa: true },
		orderBy: { createdAt: "asc" },
	});

	const literasiSiswa = siswaData.map((riwayat) => {
		let completed = 0;
		const history: any[] = [];
		tugasLino
			.filter((t) => t.tipe === "LITERASI")
			.forEach((t) => {
				const h = t.hasilKerjaSiswa.find((h) => h.siswaId === riwayat.siswaId);
				if (h?.statusPengerjaan === "SELESAI") completed++;
				if (h) history.push({ 
					judul: t.judul, 
					status: h.statusPengerjaan, 
					pdf: h.fileJawabanPdf || null,
					soalPdf: t.fileSoalUrl || null 
				});
			});
		return {
			siswaId: riwayat.siswaId,
			nama: riwayat.siswa.user.nama,
			nis: riwayat.siswa.nis,
			completed,
			total: tugasLino.filter((t) => t.tipe === "LITERASI").length,
			history,
		};
	});

	const numerasiSiswa = siswaData.map((riwayat) => {
		let countTaken = 0;
		let sumScore = 0;
		const scores: Record<string, number | null> = {};
		const numHistory: any[] = [];
		tugasLino
			.filter((t) => t.tipe === "NUMERASI")
			.forEach((t) => {
				const h = t.hasilKerjaSiswa.find((h) => h.siswaId === riwayat.siswaId);
				const nilai = h?.nilaiAkhir ?? null;
				scores[t.id] = nilai;
				if (nilai !== null) {
					countTaken++;
					sumScore += nilai;
				}
				numHistory.push({
					judul: t.judul,
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
			totalNum: tugasLino.filter((t) => t.tipe === "NUMERASI").length,
			scores,
			average: countTaken > 0 ? Number((sumScore / countTaken).toFixed(1)) : 0,
			numHistory,
		};
	});

	const numHeaders = tugasLino.filter((t) => t.tipe === "NUMERASI").map((t) => ({ id: t.id, judul: t.judul }));

	return (
		<RiwayatDetailPimpinanUI
			kelasNama={kelas.nama}
			waliKelas={kelas.waliKelas[0]?.guru.user.nama || "Belum Ditugaskan"}
			semesterName={ta.nama}
			literasiSiswa={literasiSiswa}
			numerasiSiswa={numerasiSiswa}
			numHeaders={numHeaders}
		/>
	);
}
