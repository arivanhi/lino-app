// app/admin/riwayat/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import RiwayatClientUI from "./ClientUI";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function RiwayatPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
	const awaitedParams = await searchParams;
	const currentPage = Number(awaitedParams?.page) || 1;
	const itemsPerPage = 6;
	const skip = (currentPage - 1) * itemsPerPage;

	// 1. Ambil Tahun Ajaran Aktif
	const ta = await prismaEjournal.tahunAjaran.findFirst({ where: { isActive: true } });

	if (!ta) {
		return (
			<div className="p-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
				<h1 className="text-2xl font-bold text-slate-800">Belum Ada Tahun Ajaran Aktif</h1>
			</div>
		);
	}

	const syaratKelasAktif = { riwayatSiswa: { some: { tahunAjaranId: ta.id } } };

	// 2. Ambil Kelas Paginasi (Untuk Card) & Semua Kelas (Untuk Modal PDF)
	const [kelasPaginasi, totalKelas, semuaKelas] = await Promise.all([
		prismaEjournal.kelas.findMany({
			skip,
			take: itemsPerPage,
			where: syaratKelasAktif,
			orderBy: { nama: "asc" },
		}),
		prismaEjournal.kelas.count({ where: syaratKelasAktif }),
		prismaEjournal.kelas.findMany({
			where: syaratKelasAktif,
			orderBy: { nama: "asc" },
		}),
	]);

	const totalPages = Math.ceil(totalKelas / itemsPerPage);

	// 3. Tarik Data Hasil Siswa untuk Kalkulasi Riwayat
	const semuaTugas = await prismaLino.penugasanLino.findMany({
		where: { tahunAjaranId: ta.id },
		include: { hasilKerjaSiswa: true },
	});

	// Fungsi Kalkulasi Agregat per Kelas
	const hitungAgregatKelas = (kelasId: string) => {
		const tugasKelasIni = semuaTugas.filter((t) => t.kelasId === kelasId);
		const tugasLit = tugasKelasIni.filter((t) => t.tipe === "LITERASI");
		const tugasNum = tugasKelasIni.filter((t) => t.tipe === "NUMERASI");

		// Rata-rata Literasi (Persentase Selesai)
		let litAvg = 0;
		if (tugasLit.length > 0) {
			let totalSelesai = 0;
			let totalAssigned = 0;
			tugasLit.forEach((t) => {
				totalSelesai += t.hasilKerjaSiswa.filter((h) => h.statusPengerjaan === "SELESAI").length;
				totalAssigned += t.hasilKerjaSiswa.length || 1; // Asumsi 1 jika kosong untuk menghindari NaN
			});
			litAvg = totalAssigned > 0 ? Math.round((totalSelesai / totalAssigned) * 100) : 0;
		}

		// Rata-rata Numerasi (Rata-rata Nilai Akhir)
		let numAvg = 0;
		let numCount = 0;
		tugasNum.forEach((t) => {
			t.hasilKerjaSiswa.forEach((h) => {
				if (h.nilaiAkhir !== null) {
					numAvg += h.nilaiAkhir;
					numCount++;
				}
			});
		});
		numAvg = numCount > 0 ? Math.round(numAvg / numCount) : 0;

		return { litAvg, numAvg };
	};

	// 4. Siapkan Data untuk UI
	const cardsData = kelasPaginasi.map((k) => {
		const { litAvg, numAvg } = hitungAgregatKelas(k.id);
		return { id: k.id, nama: k.nama, literasi: litAvg, numerasi: numAvg };
	});

	const allDataForPdf = semuaKelas.map((k) => {
		const { litAvg, numAvg } = hitungAgregatKelas(k.id);
		return { id: k.id, nama: k.nama, literasi: litAvg, numerasi: numAvg };
	});

	return (
		<RiwayatClientUI
			semesterName={ta.nama}
			cards={cardsData}
			allClasses={allDataForPdf}
			currentPage={currentPage}
			totalPages={totalPages}
		/>
	);
}
