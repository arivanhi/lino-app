// app/admin/riwayat/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import RiwayatClientUI from "./ClientUI";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function RiwayatPage({ searchParams }: { searchParams: Promise<{ page?: string; taId?: string }> }) {
	const awaitedParams = await searchParams;
	const currentPage = Number(awaitedParams?.page) || 1;
	const selectedTaId = awaitedParams?.taId;
	const itemsPerPage = 6;
	const skip = (currentPage - 1) * itemsPerPage;

	// 1. Ambil Semua Tahun Ajaran dan Tentukan TA Aktif
	const semuaSemester = await prismaEjournal.tahunAjaran.findMany({
		orderBy: { nama: "desc" },
	});

	let ta = null;
	if (selectedTaId) {
		ta = semuaSemester.find((s) => s.id === selectedTaId);
	}
	if (!ta) {
		ta = semuaSemester.find((s) => s.isActive);
	}

	if (!ta) {
		return (
			<div className="p-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
				<h1 className="text-2xl font-bold text-slate-800">Belum Ada Tahun Ajaran Aktif</h1>
			</div>
		);
	}

	const syaratKelasAktif = { riwayatSiswa: { some: { tahunAjaranId: ta.id } } };

	// 2. Ambil Kelas Paginasi (Untuk Card) & Semua Kelas (Untuk Modal PDF)
	const [kelasPaginasi, totalKelas, semuaKelas, semuaSiswa] = await Promise.all([
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
		// Tarik daftar semua siswa aktif untuk laporan PDF
		prismaEjournal.riwayatKelasSiswa.findMany({
			where: { tahunAjaranId: ta.id },
			include: { siswa: { include: { user: true } } },
			orderBy: { siswa: { user: { nama: "asc" } } },
		}),
	]);

	const totalPages = Math.ceil(totalKelas / itemsPerPage);

	// 3. Tarik Data Hasil Lino
	const semuaTugas = await prismaLino.penugasanLino.findMany({
		where: { tahunAjaranId: ta.id },
		include: { hasilKerjaSiswa: true },
	});

	const hitungAgregatKelas = (kelasId: string) => {
		const tugasKelasIni = semuaTugas.filter((t) => t.kelasId === kelasId);
		const tugasLit = tugasKelasIni.filter((t) => t.tipe === "LITERASI");
		const tugasNum = tugasKelasIni.filter((t) => t.tipe === "NUMERASI");

		let litAvg = 0;
		if (tugasLit.length > 0) {
			let totalSelesai = 0;
			let totalAssigned = 0;
			tugasLit.forEach((t) => {
				totalSelesai += t.hasilKerjaSiswa.filter((h) => h.statusPengerjaan === "SELESAI").length;
				totalAssigned += t.hasilKerjaSiswa.length || 1;
			});
			litAvg = totalAssigned > 0 ? Math.round((totalSelesai / totalAssigned) * 100) : 0;
		}

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

	const cardsData = kelasPaginasi.map((k) => {
		const { litAvg, numAvg } = hitungAgregatKelas(k.id);
		return { id: k.id, nama: k.nama, literasi: litAvg, numerasi: numAvg };
	});

	// Susun data super lengkap untuk Bulk PDF Report
	const allDataForPdf = semuaKelas.map((k) => {
		const { litAvg, numAvg } = hitungAgregatKelas(k.id);

		// Tarik dan hitung detail per individu siswa di kelas ini
		const siswaKelasIni = semuaSiswa.filter((s) => s.kelasId === k.id);
		const studentDetails = siswaKelasIni.map((riwayat) => {
			const tugasLitKelas = semuaTugas.filter((t) => t.kelasId === k.id && t.tipe === "LITERASI");
			let litCompleted = 0;
			tugasLitKelas.forEach((t) => {
				if (t.hasilKerjaSiswa.some((h) => h.siswaId === riwayat.siswaId && h.statusPengerjaan === "SELESAI")) {
					litCompleted++;
				}
			});

			const tugasNumKelas = semuaTugas.filter((t) => t.kelasId === k.id && t.tipe === "NUMERASI");
			let numSum = 0;
			let numCount = 0;
			tugasNumKelas.forEach((t) => {
				const h = t.hasilKerjaSiswa.find((h) => h.siswaId === riwayat.siswaId);
				if (h?.nilaiAkhir !== null && h?.nilaiAkhir !== undefined) {
					numSum += h.nilaiAkhir;
					numCount++;
				}
			});
			const numAvgSiswa = numCount > 0 ? Math.round(numSum / numCount) : 0;

			return {
				nama: riwayat.siswa.user.nama,
				nis: riwayat.siswa.nis,
				litCompleted,
				litTotal: tugasLitKelas.length,
				numAvg: numAvgSiswa,
			};
		});

		return { id: k.id, nama: k.nama, literasi: litAvg, numerasi: numAvg, students: studentDetails };
	});

	return (
		<RiwayatClientUI
			semesterName={ta.nama}
			semuaSemester={semuaSemester}
			selectedTaId={ta.id}
			cards={cardsData}
			allClasses={allDataForPdf}
			currentPage={currentPage}
			totalPages={totalPages}
		/>
	);
}
