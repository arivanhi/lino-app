// app/admin/literasi/[kelasId]/actions.ts
"use server";

import { PrismaClient as EjournalClient } from "../../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../../prisma/generated/lino-client";
import { revalidatePath } from "next/cache";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export async function createLiteracyTask(kelasId: string, judul: string, deadline: string, instruksi: string) {
	// 1. Cari tahun ajaran aktif dari E-Journal
	const ta = await prismaEjournal.tahunAjaran.findFirst({
		where: { isActive: true },
	});

	if (!ta) throw new Error("Tahun ajaran aktif tidak ditemukan.");

	// 2. Simpan tugas baru ke database Lino
	await prismaLino.penugasanLino.create({
		data: {
			judul: judul,
			tipe: "LITERASI",
			deskripsi: instruksi,
			tahunAjaranId: ta.id,
			kelasId: kelasId,
			guruId: "ADMIN_TU", // Default ID pembuat untuk Koordinator/Admin
			waktuMulai: new Date(),
			waktuSelesai: new Date(deadline),
			status: "DITUGASKAN", // Status langsung ditugaskan agar muncul di siswa
		},
	});

	// 3. Refresh halaman secara instan untuk memunculkan data terbaru
	revalidatePath(`/admin/literasi/${kelasId}`);
	return { success: true };
}
