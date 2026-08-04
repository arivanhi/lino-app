// app/siswa/dashboard/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import DashboardSiswaUI from "./ClientUI";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function DashboardSiswaPage() {
	const session = await getServerSession(authOptions);

	// Mencari NISN dari session, fallback ke Ahmad Budi untuk testing jika session kosong
	const loggedInUsername = session?.user?.username || "0051234567";

	// 1. Cari data User beserta relasinya
	const user = await prismaEjournal.user.findUnique({
		where: { username: loggedInUsername },
		include: { siswa: true },
	});

	// PERBAIKAN: Handle otomatis apakah relasi siswa berupa objek tunggal atau array
	const dataSiswa = Array.isArray(user?.siswa) ? user?.siswa[0] : user?.siswa;

	if (!user || !dataSiswa) {
		return <div className="p-8 font-bold text-center">Akun Anda belum terdaftar sebagai Siswa di sistem.</div>;
	}

	// Mengambil ID siswa dengan aman
	const siswaId = dataSiswa.id;

	// 2. Ambil TA Aktif dan Kelas Siswa saat ini
	const ta = await prismaEjournal.tahunAjaran.findFirst({ where: { isActive: true } });
	if (!ta) return <div className="p-8 font-bold text-center">Belum ada Tahun Ajaran aktif.</div>;

	const riwayatSiswa = await prismaEjournal.riwayatKelasSiswa.findFirst({
		where: { siswaId, tahunAjaranId: ta.id },
		include: { kelas: true },
	});

	if (!riwayatSiswa) {
		return <div className="p-8 font-bold text-center">Anda belum terdaftar di kelas manapun pada semester ini.</div>;
	}

	const kelasId = riwayatSiswa.kelasId;
	const kelasNama = riwayatSiswa.kelas.nama;

	// 3. Tarik Semua Tugas untuk Kelas Ini & Hasil Kerjanya
	const tugasLino = await prismaLino.penugasanLino.findMany({
		where: { kelasId, tahunAjaranId: ta.id },
		include: {
			hasilKerjaSiswa: { where: { siswaId } },
		},
		orderBy: { waktuSelesai: "asc" },
	});

	const now = new Date();

	// === MENGOLAH DATA LITERASI ===
	const tugasLiterasi = tugasLino.filter((t) => t.tipe === "LITERASI");
	let litCompleted = 0;
	const ongoingLiterasi: any[] = [];
	let nearestLiterasi: any = null;

	tugasLiterasi.forEach((t) => {
		const isSelesai = t.hasilKerjaSiswa[0]?.statusPengerjaan === "SELESAI";
		if (isSelesai) {
			litCompleted++;
		} else {
			const deadline = new Date(t.waktuSelesai);
			const diffTime = deadline.getTime() - now.getTime();
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

			const taskData = {
				id: t.id,
				judul: t.judul,
				topik: t.deskripsi || "Penugasan Reguler",
				sisaHari: diffDays,
				isTerlambat: diffDays < 0,
			};

			ongoingLiterasi.push(taskData);

			if (!nearestLiterasi || diffDays < nearestLiterasi.sisaHari) {
				nearestLiterasi = taskData;
			}
		}
	});

	// === MENGOLAH DATA NUMERASI ===
	const tugasNumerasi = tugasLino
		.filter((t) => t.tipe === "NUMERASI")
		.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
	let numSum = 0;
	let numCount = 0;
	const trendNumerasi: any[] = [];
	const detailNumerasi: any[] = [];

	tugasNumerasi.forEach((t) => {
		const nilai = t.hasilKerjaSiswa[0]?.nilaiAkhir ?? null;
		if (nilai !== null) {
			numSum += nilai;
			numCount++;
			trendNumerasi.push({
				name: t.judul.replace("Numerasi ", "N"),
				score: nilai,
			});
		}

		detailNumerasi.push({
			id: t.id,
			namaAsesmen: t.judul,
			tanggal: new Date(t.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" }),
			nilai: nilai !== null ? nilai : "-",
			status: nilai !== null ? "Selesai" : "Menunggu",
		});
	});

	const avgNumerasi = numCount > 0 ? (numSum / numCount).toFixed(1) : "0.0";

	return (
		<DashboardSiswaUI
			studentName={user.nama}
			kelasNama={kelasNama}
			literasiStats={{ completed: litCompleted, total: tugasLiterasi.length, nearestTask: nearestLiterasi }}
			numerasiStats={{ average: avgNumerasi, trendData: trendNumerasi }}
			ongoingLiterasi={ongoingLiterasi}
			detailNumerasi={detailNumerasi}
		/>
	);
}
