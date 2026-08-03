// app/wali-kelas/riwayat/page.tsx
export const dynamic = "force-dynamic";

import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import WaliKelasRiwayatClient from "./ClientUI";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export default async function WaliKelasRiwayatPage({ searchParams }: { searchParams: Promise<{ ta?: string }> }) {
	const awaitedParams = await searchParams;

	const session = await getServerSession(authOptions);
	const loggedInUsername = session?.user?.username;

	if (!loggedInUsername) return <div className="p-8 text-center font-bold">Sesi tidak valid.</div>;

	const listTa = await prismaEjournal.tahunAjaran.findMany({ orderBy: { nama: "desc" } });
	if (listTa.length === 0) return <div className="p-8 font-bold">Belum ada Tahun Ajaran di sistem.</div>;

	const activeTa = awaitedParams?.ta
		? listTa.find((t) => t.id === awaitedParams.ta) || listTa[0]
		: listTa.find((t) => t.isActive) || listTa[0];

	const kelas = await prismaEjournal.kelas.findFirst({
		where: {
			waliKelas: { some: { guru: { user: { username: loggedInUsername } } } },
			riwayatSiswa: { some: { tahunAjaranId: activeTa.id } },
		},
		include: { waliKelas: { include: { guru: { include: { user: true } } } } },
	});

	if (!kelas) {
		return (
			<WaliKelasRiwayatClient isEmpty={true} listTa={listTa} activeTaId={activeTa.id} semesterName={activeTa.nama} />
		);
	}

	const wali = kelas.waliKelas[0]?.guru.user.nama || "Belum Ditugaskan";
	const siswaData = await prismaEjournal.riwayatKelasSiswa.findMany({
		where: { kelasId: kelas.id, tahunAjaranId: activeTa.id },
		include: { siswa: { include: { user: true } } },
		orderBy: { siswa: { user: { nama: "asc" } } },
	});

	const tugasLino = await prismaLino.penugasanLino.findMany({
		where: { kelasId: kelas.id, tahunAjaranId: activeTa.id },
		include: { hasilKerjaSiswa: true },
		orderBy: { createdAt: "asc" },
	});

	const tugasLit = tugasLino.filter((t) => t.tipe === "LITERASI");
	const tugasNum = tugasLino.filter((t) => t.tipe === "NUMERASI");

	const literasiSiswa = siswaData.map((riwayat) => {
		let completed = 0;
		const history: any[] = [];
		tugasLit.forEach((t) => {
			const h = t.hasilKerjaSiswa.find((h) => h.siswaId === riwayat.siswaId);
			if (h?.statusPengerjaan === "SELESAI") completed++;
			if (h) history.push({ judul: t.judul, status: h.statusPengerjaan, pdf: h.fileJawabanPdf || null });
		});
		return {
			siswaId: riwayat.siswaId,
			nama: riwayat.siswa.user.nama,
			nis: riwayat.siswa.nis,
			completed,
			total: tugasLit.length,
			history,
		};
	});

	const numerasiSiswa = siswaData.map((riwayat) => {
		let countTaken = 0;
		let sumScore = 0;
		const scores: Record<string, number | null> = {};
		tugasNum.forEach((t) => {
			const h = t.hasilKerjaSiswa.find((h) => h.siswaId === riwayat.siswaId);
			const nilai = h?.nilaiAkhir ?? null;
			scores[t.id] = nilai;
			if (nilai !== null) {
				countTaken++;
				sumScore += nilai;
			}
		});
		return {
			siswaId: riwayat.siswaId,
			nama: riwayat.siswa.user.nama,
			nis: riwayat.siswa.nis,
			taken: countTaken,
			totalNum: tugasNum.length,
			scores,
			average: countTaken > 0 ? Number((sumScore / countTaken).toFixed(1)) : 0,
		};
	});

	const numHeaders = tugasNum.map((t) => ({ id: t.id, judul: t.judul }));

	return (
		<WaliKelasRiwayatClient
			isEmpty={false}
			listTa={listTa}
			activeTaId={activeTa.id}
			kelasNama={kelas.nama}
			waliKelas={wali}
			semesterName={activeTa.nama}
			literasiSiswa={literasiSiswa}
			numerasiSiswa={numerasiSiswa}
			numHeaders={numHeaders}
		/>
	);
}
