// app/wali-kelas/dashboard/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import DashboardClientUI from "./ClientUI";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route"; // Import authOptions

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function DashboardPage() {
	// Sisipkan authOptions agar session.user.username bisa terbaca
	const session = await getServerSession(authOptions);

	// HAPUS FALLBACK PAK HARTONO. Gunakan murni dari session.
	const loggedInUsername = session?.user?.username;

	if (!loggedInUsername) {
		return <div className="p-8 text-center font-bold">Sesi tidak valid. Silakan login ulang.</div>;
	}

	const ta = await prismaEjournal.tahunAjaran.findFirst({ where: { isActive: true } });
	if (!ta) return <div className="p-8 font-bold">Belum ada Tahun Ajaran aktif.</div>;

	const kelasiYangDiampu = await prismaEjournal.kelas.findMany({
		where: {
			waliKelas: { some: { guru: { user: { username: loggedInUsername } } } },
			riwayatSiswa: { some: { tahunAjaranId: ta.id } },
		},
		orderBy: { nama: "asc" },
	});

	const kelasIds = kelasiYangDiampu.map((k) => k.id);

	const siswaAktif = await prismaEjournal.riwayatKelasSiswa.findMany({
		where: { kelasId: { in: kelasIds }, tahunAjaranId: ta.id },
		include: { siswa: { include: { user: true } }, kelas: true },
		orderBy: { siswa: { user: { nama: "asc" } } },
	});

	const semuaTugas = await prismaLino.penugasanLino.findMany({
		where: { kelasId: { in: kelasIds }, tahunAjaranId: ta.id },
		include: { hasilKerjaSiswa: true },
	});

	const tugasLiterasi = semuaTugas.filter((t) => t.tipe === "LITERASI");
	const tugasNumerasi = semuaTugas.filter((t) => t.tipe === "NUMERASI");

	let totalLitDitugaskan = 0;
	let totalLitSelesai = 0;
	const listBelumLiterasi: any[] = [];
	const listNumerasiMerah: any[] = [];

	siswaAktif.forEach((riwayat) => {
		const s = riwayat.siswa;
		const tugasLitKelasIni = tugasLiterasi.filter((t) => t.kelasId === riwayat.kelasId);
		totalLitDitugaskan += tugasLitKelasIni.length;
		let adaBelumSelesai = false;

		tugasLitKelasIni.forEach((t) => {
			if (t.hasilKerjaSiswa.some((h) => h.siswaId === s.id && h.statusPengerjaan === "SELESAI")) {
				totalLitSelesai++;
			} else {
				adaBelumSelesai = true;
			}
		});

		if (adaBelumSelesai && tugasLitKelasIni.length > 0) {
			listBelumLiterasi.push({ id: s.id, nama: s.user.nama, kelas: riwayat.kelas.nama });
		}
	});

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

	const trendDataRaw = semuaTugas.map((t) => ({ tipe: t.tipe, tanggal: t.createdAt.toISOString() }));

	return (
		<DashboardClientUI
			role="WALI_KELAS"
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
