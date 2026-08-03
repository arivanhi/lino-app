// app/wali-kelas/numerasi/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import NumerasiDetailUI from "../../../components/NumerasiDetailUI";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function WaliKelasNumerasiPage() {
	const session = await getServerSession(authOptions);
	const loggedInUsername = session?.user?.username;

	if (!loggedInUsername) return <div className="p-8 text-center font-bold">Sesi tidak valid.</div>;

	const ta = await prismaEjournal.tahunAjaran.findFirst({ where: { isActive: true } });
	if (!ta) return <div className="p-8 font-bold">Belum ada Tahun Ajaran aktif.</div>;

	const kelas = await prismaEjournal.kelas.findFirst({
		where: {
			waliKelas: { some: { guru: { user: { username: loggedInUsername } } } },
			riwayatSiswa: { some: { tahunAjaranId: ta.id } },
		},
		include: { waliKelas: { include: { guru: { include: { user: true } } } } },
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

	const wali = kelas.waliKelas[0]?.guru.user.nama || "Belum Ditugaskan";
	const tasks = await prismaLino.penugasanLino.findMany({
		where: { kelasId: kelas.id, tahunAjaranId: ta.id, tipe: "NUMERASI" },
		include: { hasilKerjaSiswa: true },
		orderBy: { createdAt: "asc" },
	});

	const siswaData = await prismaEjournal.riwayatKelasSiswa.findMany({
		where: { kelasId: kelas.id, tahunAjaranId: ta.id },
		include: { siswa: { include: { user: true } } },
		orderBy: { siswa: { user: { nama: "asc" } } },
	});

	let sumAvg = 0;
	let countAvg = 0;
	const students = siswaData.map((riwayat) => {
		const scores: Record<string, number | null> = {};
		let total = 0;
		let count = 0;
		tasks.forEach((t) => {
			const val = t.hasilKerjaSiswa.find((h) => h.siswaId === riwayat.siswaId)?.nilaiAkhir ?? null;
			scores[t.id] = val;
			if (val !== null) {
				total += val;
				count++;
			}
		});
		const avgSiswa = count > 0 ? Number((total / count).toFixed(1)) : null;
		if (avgSiswa !== null) {
			sumAvg += avgSiswa;
			countAvg++;
		}
		return {
			siswaId: riwayat.siswaId,
			nama: riwayat.siswa.user.nama,
			nis: riwayat.siswa.nis,
			scores,
			average: avgSiswa !== null ? avgSiswa : "-",
		};
	});

	const avgKelas = countAvg > 0 ? (sumAvg / countAvg).toFixed(1) : "0.0";

	return (
		<NumerasiDetailUI
			kelasNama={kelas.nama}
			waliKelas={wali}
			semesterName={ta.nama}
			tasks={tasks}
			students={students}
			avgKelas={avgKelas}
		/>
	);
}
