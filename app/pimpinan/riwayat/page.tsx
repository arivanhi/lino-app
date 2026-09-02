// app/pimpinan/riwayat/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import RiwayatPimpinanUI from "./ClientUI";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function PimpinanRiwayatPage({ searchParams }: { searchParams: Promise<{ page?: string; taId?: string; tab?: string; q?: string }> }) {
	const awaitedParams = await searchParams;
	const currentPage = Number(awaitedParams?.page) || 1;
	const selectedTaId = awaitedParams?.taId;
	const tab = awaitedParams?.tab || "Semua Kelas";
	const q = awaitedParams?.q || "";
	const itemsPerPage = 6;
	const skip = (currentPage - 1) * itemsPerPage;

	const semuaTA = await prismaEjournal.tahunAjaran.findMany({ orderBy: { nama: "desc" } });
	const activeTA = semuaTA.find((t) => t.isActive) || semuaTA[0];
	const selectedTAId = awaitedParams?.taId || activeTA?.id;
	const ta = semuaTA.find((t) => t.id === selectedTAId);

	if (!ta) return <div className="p-8 font-bold">Belum Ada Tahun Ajaran</div>;

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

	const [kelasPaginasi, totalKelas, semuaKelas, semuaSiswa] = await Promise.all([
		prismaEjournal.kelas.findMany({ skip, take: itemsPerPage, where: syaratKelasAktif, orderBy: { nama: "asc" } }),
		prismaEjournal.kelas.count({ where: syaratKelasAktif }),
		prismaEjournal.kelas.findMany({ where: syaratKelasAktif, orderBy: { nama: "asc" } }),
		prismaEjournal.riwayatKelasSiswa.findMany({
			where: { tahunAjaranId: ta.id },
			include: { siswa: { include: { user: true } } },
		}),
	]);

	const totalPages = Math.ceil(totalKelas / itemsPerPage);

	const semuaTugas = await prismaLino.penugasanLino.findMany({
		where: { tahunAjaranId: ta.id },
		include: { hasilKerjaSiswa: true },
	});

	const hitungAgregatKelas = (kelasId: string) => {
		const tugasLit = semuaTugas.filter((t) => t.kelasId === kelasId && t.tipe === "LITERASI");
		const tugasNum = semuaTugas.filter((t) => t.kelasId === kelasId && t.tipe === "NUMERASI");

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
		return { litAvg, numAvg: numCount > 0 ? Math.round(numAvg / numCount) : 0 };
	};

	const cardsData = kelasPaginasi.map((k) => {
		const { litAvg, numAvg } = hitungAgregatKelas(k.id);
		return { id: k.id, nama: k.nama, literasi: litAvg, numerasi: numAvg };
	});

	const allDataForPdf = semuaKelas.map((k) => {
		const { litAvg, numAvg } = hitungAgregatKelas(k.id);
		const siswaKelasIni = semuaSiswa.filter((s) => s.kelasId === k.id);

		const studentDetails = siswaKelasIni.map((riwayat) => {
			let litCompleted = 0;
			let numSum = 0;
			let numCount = 0; // Deklarasi variabel

			semuaTugas
				.filter((t) => t.kelasId === k.id && t.tipe === "LITERASI")
				.forEach((t) => {
					if (t.hasilKerjaSiswa.some((h) => h.siswaId === riwayat.siswaId && h.statusPengerjaan === "SELESAI"))
						litCompleted++;
				});

			semuaTugas
				.filter((t) => t.kelasId === k.id && t.tipe === "NUMERASI")
				.forEach((t) => {
					const val = t.hasilKerjaSiswa.find((h) => h.siswaId === riwayat.siswaId)?.nilaiAkhir;
					if (val !== null && val !== undefined) {
						numSum += val;
						numCount++;
					} // Pengisian variabel
				});

			return {
				nama: riwayat.siswa.user.nama,
				nis: riwayat.siswa.nis,
				litCompleted,
				litTotal: semuaTugas.filter((t) => t.kelasId === k.id && t.tipe === "LITERASI").length,
				// PERBAIKAN DI SINI: count > 0 diganti jadi numCount > 0
				numAvg: numCount > 0 ? Math.round(numSum / numCount) : 0,
			};
		});

		return { id: k.id, nama: k.nama, literasi: litAvg, numerasi: numAvg, students: studentDetails };
	});

	return (
		<RiwayatPimpinanUI
			semesterName={ta.nama}
			semuaTA={semuaTA}
			selectedTAId={ta.id}
			cards={cardsData}
			allClasses={allDataForPdf}
			currentPage={currentPage}
			totalPages={totalPages}
			tab={tab}
			q={q}
		/>
	);
}
