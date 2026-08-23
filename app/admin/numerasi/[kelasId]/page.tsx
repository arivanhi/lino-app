// app/admin/numerasi/[kelasId]/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../../prisma/generated/lino-client";
import NumerasiDetailClient from "./ClientUI";
import { notFound } from "next/navigation";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function NumerasiDetailServerPage({ params }: { params: Promise<{ kelasId: string }> }) {
	const { kelasId } = await params;

	const kelas = await prismaEjournal.kelas.findUnique({ where: { id: kelasId } });
	if (!kelas) return notFound();

	// Ambil Tugas Numerasi (Diurutkan berdasarkan waktu pembuatan untuk sumbu X grafik)
	const tugasList = await prismaLino.penugasanLino.findMany({
		where: { kelasId: kelasId, tipe: "NUMERASI" },
		orderBy: { createdAt: "asc" },
	});

	const siswaDiKelas = await prismaEjournal.riwayatKelasSiswa.findMany({
		where: { kelasId: kelasId, tahunAjaran: { isActive: true } },
		include: { siswa: { include: { user: true } } },
		orderBy: { siswa: { user: { nama: "asc" } } },
	});

	const semuaHasil = await prismaLino.hasilKerjaSiswa.findMany({
		where: { penugasan: { kelasId: kelasId, tipe: "NUMERASI" } },
	});

	// 1. Format Data untuk Grafik (Rata-rata per Tugas)
	const chartTasks = tugasList.map((tugas) => {
		const hasilTugasIni = semuaHasil.filter((h) => h.penugasanId === tugas.id && h.nilaiAkhir !== null);
		let avg = 0;
		if (hasilTugasIni.length > 0) {
			const sum = hasilTugasIni.reduce((acc, curr) => acc + (curr.nilaiAkhir || 0), 0);
			avg = Math.round(sum / hasilTugasIni.length);
		}
		return { id: tugas.id, judul: tugas.judul, avgScore: avg, fileSoalUrl: tugas.fileSoalUrl, createdAt: tugas.createdAt };
	});

	// 2. Format Data untuk Tabel Siswa (Nilai per Tugas)
	const mappedStudents = siswaDiKelas.map((riwayat) => {
		const scores: Record<string, number | null> = {};
		let totalNilai = 0;
		let jumlahDinilai = 0;

		// Petakan nilai untuk setiap kolom tugas
		tugasList.forEach((tugas) => {
			const hasilSiswa = semuaHasil.find((h) => h.penugasanId === tugas.id && h.siswaId === riwayat.siswaId);
			const skor = hasilSiswa?.nilaiAkhir ?? null;
			scores[tugas.id] = skor;

			if (skor !== null) {
				totalNilai += skor;
				jumlahDinilai++;
			}
		});

		const average = jumlahDinilai > 0 ? Math.round(totalNilai / jumlahDinilai) : 0;

		return {
			siswaId: riwayat.siswaId,
			nama: riwayat.siswa.user.nama,
			nis: riwayat.siswa.nis,
			scores,
			average,
		};
	});

	return (
		<NumerasiDetailClient kelasId={kelas.id} namaKelas={kelas.nama} tasks={chartTasks} students={mappedStudents} />
	);
}
