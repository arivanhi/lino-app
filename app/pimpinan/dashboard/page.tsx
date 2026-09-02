// app/dashboard/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import DashboardClientUI from "./ClientUI";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function DashboardPage() {
	// 1. SIMULASI AUTENTIKASI:
	// (Di aplikasi asli, ambil dari session NextAuth, misal: session.user.role)
	const role = "KEPSEK"; // Ubah ke "WALI_KELAS" untuk mengetes mode Wali Kelas
	const loggedInGuruId = "GURU-123"; // Dummy ID jika role adalah Wali Kelas

	// 2. Ambil Tahun Ajaran Aktif
	const ta = await prismaEjournal.tahunAjaran.findFirst({ where: { isActive: true } });
	if (!ta) {
		return <div className="p-8 text-center text-xl font-bold">Belum ada Tahun Ajaran aktif.</div>;
	}

	// 3. Filter Kelas berdasarkan Role
	let kelasFilter = {};
	if (role === "WALI_KELAS") {
		kelasFilter = { waliKelas: { some: { guruId: loggedInGuruId } } };
	}

	const kelasiYangDiampu = await prismaEjournal.kelas.findMany({
		where: { ...kelasFilter, nama: { startsWith: "X" }, riwayatSiswa: { some: { tahunAjaranId: ta.id } } },
		orderBy: { nama: "asc" },
	});

	const kelasIds = kelasiYangDiampu.map((k) => k.id);

	// 4. Tarik Semua Data Siswa di Kelas Tersebut
	const siswaAktif = await prismaEjournal.riwayatKelasSiswa.findMany({
		where: { kelasId: { in: kelasIds }, tahunAjaranId: ta.id },
		include: { siswa: { include: { user: true } }, kelas: true },
		orderBy: { siswa: { user: { nama: "asc" } } },
	});

	// 5. Tarik Data Tugas Lino (Literasi & Numerasi)
	const semuaTugas = await prismaLino.penugasanLino.findMany({
		where: { kelasId: { in: kelasIds }, tahunAjaranId: ta.id },
		include: { hasilKerjaSiswa: true },
	});

	const tugasLiterasi = semuaTugas.filter((t) => t.tipe === "LITERASI");
	const tugasNumerasi = semuaTugas.filter((t) => t.tipe === "NUMERASI");

	// === KALKULASI OVERVIEW & WARNINGS ===
	let totalLitDitugaskan = 0;
	let totalLitSelesai = 0;
	const listBelumLiterasi: any[] = [];
	const listNumerasiMerah: any[] = []; // Nilai < 50

	// Proses Literasi
	siswaAktif.forEach((riwayat) => {
		const s = riwayat.siswa;
		let tugasSelesaiSiswaIni = 0;
		const tugasLitKelasIni = tugasLiterasi.filter((t) => t.kelasId === riwayat.kelasId);

		totalLitDitugaskan += tugasLitKelasIni.length;

		let adaBelumSelesai = false;
		tugasLitKelasIni.forEach((t) => {
			const hasil = t.hasilKerjaSiswa.find((h) => h.siswaId === s.id);
			if (hasil?.statusPengerjaan === "SELESAI") {
				tugasSelesaiSiswaIni++;
				totalLitSelesai++;
			} else {
				adaBelumSelesai = true;
			}
		});

		if (adaBelumSelesai && tugasLitKelasIni.length > 0) {
			listBelumLiterasi.push({ id: s.id, nama: s.user.nama, kelas: riwayat.kelas.nama });
		}
	});

	// Proses Numerasi
	let sumNum = 0;
	let countNum = 0;
	siswaAktif.forEach((riwayat) => {
		const s = riwayat.siswa;
		const tugasNumKelasIni = tugasNumerasi.filter((t) => t.kelasId === riwayat.kelasId);

		let sumSiswa = 0;
		let countSiswa = 0;

		tugasNumKelasIni.forEach((t) => {
			const hasil = t.hasilKerjaSiswa.find((h) => h.siswaId === s.id);
			if (hasil && hasil.nilaiAkhir !== null) {
				sumNum += hasil.nilaiAkhir;
				countNum++;
				sumSiswa += hasil.nilaiAkhir;
				countSiswa++;
			}
		});

		const avgSiswa = countSiswa > 0 ? sumSiswa / countSiswa : 0;
		if (countSiswa > 0 && avgSiswa < 50) {
			listNumerasiMerah.push({ id: s.id, nama: s.user.nama, nilai: Math.round(avgSiswa) });
		}
	});

	const avgNumerasiGlobal = countNum > 0 ? (sumNum / countNum).toFixed(1) : "0.0";
	const pctLiterasi = totalLitDitugaskan > 0 ? Math.round((totalLitSelesai / totalLitDitugaskan) * 100) : 0;

	// 6. Susun Data Detail per Kelas untuk Tab Tabel Bawah
	const detailTabelKelas = kelasiYangDiampu.map((kelas) => {
		const siswaDiKelas = siswaAktif.filter((s) => s.kelasId === kelas.id);
		const tugasNumKelas = tugasNumerasi
			.filter((t) => t.kelasId === kelas.id)
			.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

		const studentsData = siswaDiKelas.map((riwayat) => {
			const scores: Record<string, number | null> = {};
			let total = 0;
			let count = 0;
			tugasNumKelas.forEach((t) => {
				const val = t.hasilKerjaSiswa.find((h) => h.siswaId === riwayat.siswaId)?.nilaiAkhir ?? null;
				scores[t.id] = val;
				if (val !== null) {
					total += val;
					count++;
				}
			});
			return {
				siswaId: riwayat.siswaId,
				nama: riwayat.siswa.user.nama,
				nis: riwayat.siswa.nis,
				scores,
				average: count > 0 ? (total / count).toFixed(1) : "-",
			};
		});

		return {
			kelasId: kelas.id,
			kelasNama: kelas.nama,
			numHeaders: tugasNumKelas.map((t) => ({ id: t.id, judul: t.judul })),
			students: studentsData,
		};
	});

	// 7. Ambil Data Tren (Grafik Bar) dari tanggal pembuatan tugas (PenugasanLino)
	const trendDataRaw = semuaTugas.map((t) => ({
		tipe: t.tipe,
		// Gunakan createdAt agar sesuai dengan waktu guru/admin menugaskan
		tanggal: t.createdAt.toISOString(),
	}));

	return (
		<DashboardClientUI
			role={role}
			totalSiswa={siswaAktif.length}
			pctLiterasi={pctLiterasi}
			avgNumerasi={avgNumerasiGlobal}
			listBelumLiterasi={listBelumLiterasi}
			listNumerasiMerah={listNumerasiMerah}
			detailTabelKelas={detailTabelKelas}
			trendDataRaw={trendDataRaw}
		/>
	);
}
