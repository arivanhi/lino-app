// app/wali-kelas/literasi/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import LiterasiDetailUI from "../../../components/LiterasiDetailUI";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function WaliKelasLiterasiPage() {
	const session = await getServerSession(authOptions);
	const loggedInUsername = session?.user?.username;

	if (!loggedInUsername) return <div className="p-8 text-center font-bold">Sesi tidak valid.</div>;

	const ta = await prismaEjournal.tahunAjaran.findFirst({ where: { isActive: true } });
	if (!ta) return <div className="p-8 font-bold">Belum ada Tahun Ajaran aktif.</div>;

	const kelas = await prismaEjournal.kelas.findFirst({
		where: {
			OR: [
				{ waliKelas: { some: { guru: { user: { username: loggedInUsername } } } } },
				{ 
				AND: [
					{ nama: { startsWith: "X" } },
					{ nama: { not: { startsWith: "XI" } } },
					{
						jadwalPelajaran: {
							some: {
								guru: { user: { username: loggedInUsername } },
								OR: [{ hari: 2 }, { hari: 4 }],
								waktuMulai: "1"
							}
						}
					}
				]
			}
			],
			riwayatSiswa: { some: { tahunAjaranId: ta.id } },
		},
		include: { 
			waliKelas: { include: { guru: { include: { user: true } } } },
			jadwalPelajaran: {
					where: {
						OR: [{ hari: 2 }, { hari: 4 }],
						waktuMulai: "1"
					},
					include: { guru: { include: { user: true } } }
				}
		},
	});

	if (!kelas) {
		return (
			<div className="p-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[50vh] text-center">
				<h1 className="text-2xl font-bold text-slate-800">Anda Belum Ditugaskan Sebagai Wali Kelas</h1>
				<p className="text-slate-500 mt-2">
					Pastikan akun Anda sudah terhubung sebagai Wali Kelas di Tahun Ajaran aktif.
				</p>
			</div>
		);
	}

	const isKelasX = kelas.nama.startsWith("X") && !kelas.nama.startsWith("XI");
	const guruPendamping = kelas.jadwalPelajaran?.[0]?.guru?.user?.nama;
	const wali = (isKelasX && guruPendamping) ? guruPendamping : (kelas.waliKelas[0]?.guru.user.nama || "Belum Ditugaskan");
	const tasks = await prismaLino.penugasanLino.findMany({
		where: { kelasId: kelas.id, tahunAjaranId: ta.id, tipe: "LITERASI" },
		include: { hasilKerjaSiswa: true },
		orderBy: { createdAt: "asc" },
	});

	const siswaData = await prismaEjournal.riwayatKelasSiswa.findMany({
		where: { kelasId: kelas.id, tahunAjaranId: ta.id },
		include: { siswa: { include: { user: true } } },
		orderBy: { siswa: { user: { nama: "asc" } } },
	});

	const students = siswaData.map((riwayat) => {
		let uploaded = 0;
		const history: any[] = [];
		tasks.forEach((t) => {
			const h = t.hasilKerjaSiswa.find((h) => h.siswaId === riwayat.siswaId);
			if (h?.statusPengerjaan === "SELESAI") uploaded++;
			if (h) history.push({ judul: t.judul, status: h.statusPengerjaan, pdf: h.fileJawabanPdf || null });
		});
		const isMastered = uploaded === tasks.length && tasks.length > 0;
		const isOnTrack = uploaded >= tasks.length / 2;
		return {
			siswaId: riwayat.siswaId,
			nama: riwayat.siswa.user.nama,
			nis: riwayat.siswa.nis,
			uploaded,
			status: isMastered ? "Mastered" : isOnTrack ? "On Track" : "Behind",
			history,
		};
	});

	return (
		<LiterasiDetailUI
			kelasNama={kelas.nama}
			waliKelas={wali}
			semesterName={ta.nama}
			tasks={tasks}
			students={students}
		/>
	);
}
