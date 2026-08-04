// app/siswa/riwayat/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import RiwayatSiswaUI from "./ClientUI";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function SiswaRiwayatPage({ searchParams }: { searchParams: Promise<{ ta?: string }> }) {
	const awaitedParams = await searchParams;
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

	// Tarik semua Tahun Ajaran untuk dropdown
	const listTa = await prismaEjournal.tahunAjaran.findMany({ orderBy: { nama: "desc" } });
	if (listTa.length === 0) return <div className="p-8 font-bold">Belum ada Tahun Ajaran di sistem.</div>;

	// Tentukan TA aktif dari URL, jika tidak ada, gunakan TA yang sedang aktif di sistem
	const activeTa = awaitedParams?.ta
		? listTa.find((t) => t.id === awaitedParams.ta) || listTa[0]
		: listTa.find((t) => t.isActive) || listTa[0];

	// Cari kelas siswa di semester yang dipilih
	const riwayatSiswa = await prismaEjournal.riwayatKelasSiswa.findFirst({
		where: { siswaId, tahunAjaranId: activeTa.id },
		include: { kelas: true },
	});

	if (!riwayatSiswa) {
		return <RiwayatSiswaUI isEmpty={true} listTa={listTa} activeTaId={activeTa.id} semesterName={activeTa.nama} />;
	}

	const kelasId = riwayatSiswa.kelasId;
	const kelasNama = riwayatSiswa.kelas.nama;

	// Tarik semua penugasan Lino di kelas & TA tersebut
	const tugasLino = await prismaLino.penugasanLino.findMany({
		where: { kelasId, tahunAjaranId: activeTa.id },
		include: { hasilKerjaSiswa: { where: { siswaId } } },
		orderBy: { createdAt: "asc" },
	});

	// === PROSES DATA LITERASI ===
	const tugasLiterasi = tugasLino.filter((t) => t.tipe === "LITERASI");
	let litCompleted = 0;
	const literasiList = tugasLiterasi.map((t) => {
		const hasil = t.hasilKerjaSiswa[0];
		const isSelesai = hasil?.statusPengerjaan === "SELESAI";
		if (isSelesai) litCompleted++;

		return {
			id: t.id,
			judul: t.judul,
			status: isSelesai ? "Selesai" : "Belum / Terlambat",
			pdf: hasil?.fileJawabanPdf || null,
		};
	});

	// === PROSES DATA NUMERASI ===
	const tugasNumerasi = tugasLino.filter((t) => t.tipe === "NUMERASI");
	let numSum = 0;
	let numCount = 0;
	const chartData: any[] = [];

	const numerasiList = tugasNumerasi.map((t) => {
		const nilai = t.hasilKerjaSiswa[0]?.nilaiAkhir ?? null;
		const dateStr = new Date(t.createdAt).toLocaleDateString("id-ID", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});

		if (nilai !== null) {
			numSum += nilai;
			numCount++;
			chartData.push({
				name: t.judul.replace("Numerasi ", "N"), // Singkatan untuk chart
				score: nilai,
			});
		}

		return {
			id: t.id,
			judul: t.judul,
			tanggal: dateStr,
			nilai: nilai !== null ? nilai : "-",
		};
	});

	const avgNumerasi = numCount > 0 ? (numSum / numCount).toFixed(1) : "0.0";

	return (
		<RiwayatSiswaUI
			isEmpty={false}
			listTa={listTa}
			activeTaId={activeTa.id}
			semesterName={activeTa.nama}
			studentName={user.nama}
			kelasNama={kelasNama}
			literasiStats={{ completed: litCompleted, total: tugasLiterasi.length }}
			numerasiStats={{ average: avgNumerasi, total: numCount }}
			chartData={chartData}
			literasiList={literasiList}
			numerasiList={numerasiList}
		/>
	);
}
