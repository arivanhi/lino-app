// app/admin/literasi/[kelasId]/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../../prisma/generated/lino-client";
import LiterasiDetailClient from "./ClientUI";
import { notFound } from "next/navigation";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function KelasDetailServerPage({
	params,
}: {
	// Di Next.js terbaru, params adalah Promise
	params: Promise<{ kelasId: string }>;
}) {
	// Tunggu (await) params sebelum mengekstrak nilainya
	const { kelasId } = await params;

	// 1. Ambil Nama Kelas dari E-Journal
	const kelas = await prismaEjournal.kelas.findUnique({
		where: { id: kelasId },
	});

	if (!kelas) return notFound();

	// 2. Ambil Daftar Tugas Literasi untuk kelas ini
	const tugasList = await prismaLino.penugasanLino.findMany({
		where: { kelasId: kelasId, tipe: "LITERASI" },
		orderBy: { waktuSelesai: "asc" },
	});

	const totalTugas = tugasList.length;

	// 3. Ambil Daftar Siswa di kelas ini dari E-Journal (Hanya Tahun Ajaran Aktif)
	const siswaDiKelas = await prismaEjournal.riwayatKelasSiswa.findMany({
		where: {
			kelasId: kelasId,
			tahunAjaran: { isActive: true },
		},
		include: {
			siswa: { include: { user: true } },
		},
	});

	// 4. Ambil progres pengerjaan (Upload PDF) dari Lino untuk dihitung
	const semuaProgresSiswa = await prismaLino.hasilKerjaSiswa.findMany({
		where: { penugasan: { kelasId: kelasId, tipe: "LITERASI" } },
	});

	// Map data untuk dikirim ke Client UI
	const mappedStudents = siswaDiKelas.map((riwayat) => {
		const progresSiswaIni = semuaProgresSiswa.filter((p) => p.siswaId === riwayat.siswaId);
		const tugasSelesai = progresSiswaIni.filter((p) => p.statusPengerjaan === "SELESAI").length;
		const fileTerakhir = progresSiswaIni.find((p) => p.fileJawabanPdf !== null)?.fileJawabanPdf;

		// PERBAIKAN: Menyusun array history (Riwayat Tugas) agar bisa ditampilkan di Modal Client UI
		const historyData = progresSiswaIni.map((hasil) => {
			// Cari judul tugas yang bersesuaian
			const tugasTerkait = tugasList.find((t) => t.id === hasil.penugasanId);
			return {
				judul: tugasTerkait?.judul || "Tugas Literasi",
				status: hasil.statusPengerjaan,
				pdf: hasil.fileJawabanPdf || null,
				soalPdf: tugasTerkait?.fileSoalUrl || null,
			};
		});

		return {
			siswaId: riwayat.siswaId,
			nama: riwayat.siswa.user.nama,
			nis: riwayat.siswa.nis,
			tugasSelesai,
			totalTugas,
			filePdfTerakhir: fileTerakhir || null,
			history: historyData, // Variabel history dimasukkan ke dalam objek
		};
	});

	return <LiterasiDetailClient kelasId={kelas.id} namaKelas={kelas.nama} tasks={tugasList} students={mappedStudents} />;
}