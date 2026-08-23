// app/siswa/literasi/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import LiterasiSiswaUI from "./ClientUI";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function LiterasiSiswaPage() {
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
	});

	if (!riwayatSiswa)
		return <div className="p-8 font-bold text-center">Anda belum terdaftar di kelas manapun pada semester ini.</div>;

	const kelasId = riwayatSiswa.kelasId;

	// Tarik penugasan khusus Literasi
	const tugasLiterasi = await prismaLino.penugasanLino.findMany({
		where: { kelasId, tahunAjaranId: ta.id, tipe: "LITERASI" },
		include: {
			hasilKerjaSiswa: { where: { siswaId } },
		},
		orderBy: { createdAt: "desc" },
	});

	const now = new Date();
	let totalTugas = 0;
	let tugasSelesai = 0;
	let tugasAktif = 0;

	const tasksData = tugasLiterasi.map((t) => {
		totalTugas++;
		const hasil = t.hasilKerjaSiswa[0];
		const isSelesai = hasil?.statusPengerjaan === "SELESAI";
		const deadlineDate = new Date(t.waktuSelesai);
		const isDeadlinePassed = deadlineDate < now; // PENANDA BARU: Apakah deadline sudah lewat?
		const isTerlambat = !isSelesai && isDeadlinePassed;

		if (isSelesai) {
			tugasSelesai++;
		} else {
			tugasAktif++;
		}

		let status = "Aktif";
		if (isSelesai) status = "Selesai";
		else if (isTerlambat) status = "Terlambat";

		return {
			id: t.id,
			judul: t.judul,
			tanggalDitugaskan: new Date(t.createdAt).toLocaleDateString("id-ID", {
				day: "2-digit",
				month: "short",
				year: "numeric",
			}),
			tenggatWaktu: deadlineDate.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
			status,
			isDeadlinePassed, // Dikirim ke UI
			hasilId: hasil?.id || null,
			filePdf: hasil?.fileJawabanPdf || null,
			soalPdf: t.fileSoalUrl || null,
		};
	});

	return (
		<LiterasiSiswaUI
			siswaId={siswaId}
			kelasId={kelasId}
			stats={{ total: totalTugas, selesai: tugasSelesai, aktif: tugasAktif }}
			tasks={tasksData}
		/>
	);
}
