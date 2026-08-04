// app/siswa/numerasi/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import NumerasiSiswaUI from "./ClientUI";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function NumerasiSiswaPage() {
	const session = await getServerSession(authOptions);
	const loggedInUsername = session?.user?.username;

	if (!loggedInUsername) return <div className="p-8 text-center font-bold">Sesi tidak valid. Silakan login ulang.</div>;

	const user = await prismaEjournal.user.findUnique({
		where: { username: loggedInUsername },
		include: { siswa: true },
	});

	const dataSiswa = Array.isArray(user?.siswa) ? user?.siswa[0] : user?.siswa;
	if (!user || !dataSiswa)
		return <div className="p-8 font-bold text-center">Akun Anda belum terdaftar sebagai Siswa di sistem.</div>;

	const siswaId = dataSiswa.id;
	const ta = await prismaEjournal.tahunAjaran.findFirst({ where: { isActive: true } });
	if (!ta) return <div className="p-8 font-bold text-center">Belum ada Tahun Ajaran aktif.</div>;

	const riwayatSiswa = await prismaEjournal.riwayatKelasSiswa.findFirst({
		where: { siswaId, tahunAjaranId: ta.id },
		include: { kelas: true }, // Pastikan kelas di-include untuk mendapatkan namanya
	});

	if (!riwayatSiswa)
		return <div className="p-8 font-bold text-center">Anda belum terdaftar di kelas manapun pada semester ini.</div>;

	const kelasId = riwayatSiswa.kelasId;
	const kelasNama = riwayatSiswa.kelas.nama; // Ambil nama kelas

	// Tarik penugasan khusus Numerasi
	const tugasNumerasi = await prismaLino.penugasanLino.findMany({
		where: { kelasId, tahunAjaranId: ta.id, tipe: "NUMERASI" },
		include: {
			hasilKerjaSiswa: { where: { siswaId } },
		},
		orderBy: { createdAt: "asc" },
	});

	let totalDinilai = 0;
	let sumNilai = 0;

	const historyData: any[] = [];
	const chartData: any[] = [];

	tugasNumerasi.forEach((t) => {
		const hasil = t.hasilKerjaSiswa[0];
		const nilai = hasil?.nilaiAkhir ?? null;
		const dateStr = new Date(t.createdAt).toLocaleDateString("id-ID", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});
		const monthStr = new Date(t.createdAt).toLocaleDateString("id-ID", { month: "short" });

		if (nilai !== null) {
			sumNilai += nilai;
			totalDinilai++;
			chartData.push({
				name: monthStr,
				score: nilai,
			});
		}

		historyData.push({
			id: t.id,
			judul: t.judul,
			deskripsi: t.deskripsi || "", // Hilangkan fallback "Semester Ganjil" di sini agar bersih
			tanggal: dateStr,
			nilai: nilai,
			status: nilai !== null ? "Selesai" : "Menunggu Hasil",
		});
	});

	historyData.reverse();

	const average = totalDinilai > 0 ? Number((sumNilai / totalDinilai).toFixed(1)) : 0;

	let predikat = "Belum Ada Data";
	let predikatDesc = "Selesaikan asesmen untuk melihat predikat.";
	if (totalDinilai > 0) {
		if (average >= 85) {
			predikat = "Sangat Baik";
			predikatDesc = "Memenuhi standar akademik tinggi.";
		} else if (average >= 70) {
			predikat = "Baik";
			predikatDesc = "Memenuhi standar kelulusan minimal.";
		} else {
			predikat = "Perlu Perbaikan";
			predikatDesc = "Butuh evaluasi dan bimbingan lanjut.";
		}
	}

	const stats = {
		average,
		totalAsesmen: tugasNumerasi.length,
		selesai: totalDinilai,
		predikat,
		predikatDesc,
	};

	return (
		<NumerasiSiswaUI
			studentName={user.nama}
			kelasNama={kelasNama} // Kirim ke Client UI
			semesterName={ta.nama}
			stats={stats}
			chartData={chartData}
			historyData={historyData}
		/>
	);
}
