// app/admin/literasi/[kelasId]/actions.ts
"use server";

import { PrismaClient as EjournalClient } from "../../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../../prisma/generated/lino-client";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

export async function createLiteracyTask(kelasId: string, formData: FormData) {
	// 1. Cari tahun ajaran aktif dari E-Journal
	const ta = await prismaEjournal.tahunAjaran.findFirst({
		where: { isActive: true },
	});

	if (!ta) throw new Error("Tahun ajaran aktif tidak ditemukan.");

	const judul = formData.get("judul") as string;
	const deadline = formData.get("deadline") as string;
	const instruksi = formData.get("instruksi") as string;
	const file = formData.get("file") as File | null;

	let fileSoalUrl = null;

	if (file && file.size > 0) {
		const buffer = Buffer.from(await file.arrayBuffer());
		const ext = path.extname(file.name) || ".pdf";
		const safeName = judul.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
		const filename = `${Date.now()}_${safeName}${ext}`;
		
		const uploadDir = path.join(process.cwd(), "storage", "uploads", "tugas_literasi", kelasId);
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}

		const filePath = path.join(uploadDir, filename);
		fs.writeFileSync(filePath, buffer);
		
		fileSoalUrl = `/api/uploads/tugas_literasi/${kelasId}/${filename}`;
	}

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
			fileSoalUrl: fileSoalUrl,
		},
	});

	// 3. Refresh halaman secara instan untuk memunculkan data terbaru
	revalidatePath(`/admin/literasi/${kelasId}`);
	return { success: true };
}

export async function deleteLiteracyTask(taskId: string, fileUrl: string | null | undefined, kelasId: string) {
	try {
		// 1. Hapus dari database (HasilKerjaSiswa akan otomatis terhapus karena onDelete: Cascade)
		await prismaLino.penugasanLino.delete({
			where: { id: taskId },
		});

		// 2. Hapus file fisik jika ada
		if (fileUrl) {
			const filename = path.basename(fileUrl);
			const filePath = path.join(process.cwd(), "storage", "uploads", "tugas_literasi", kelasId, filename);
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath);
			}
		}

		// 3. Refresh halaman
		revalidatePath(`/admin/literasi/${kelasId}`);
		return { success: true };
	} catch (error: any) {
		throw new Error(error.message || "Terjadi kesalahan saat menghapus tugas.");
	}
}

export async function deleteMultipleLiteracyTasks(taskIds: string[], kelasId: string) {
	try {
		// 1. Ambil data tugas untuk mendapatkan fileUrl sebelum dihapus
		const tasks = await prismaLino.penugasanLino.findMany({
			where: { id: { in: taskIds } },
			select: { fileSoalUrl: true }
		});

		// 2. Hapus dari database
		await prismaLino.penugasanLino.deleteMany({
			where: { id: { in: taskIds } },
		});

		// 3. Hapus file fisik jika ada
		tasks.forEach((task) => {
			if (task.fileSoalUrl) {
				const filename = path.basename(task.fileSoalUrl);
				const filePath = path.join(process.cwd(), "storage", "uploads", "tugas_literasi", kelasId, filename);
				if (fs.existsSync(filePath)) {
					fs.unlinkSync(filePath);
				}
			}
		});

		// 4. Refresh halaman
		revalidatePath(`/admin/literasi/${kelasId}`);
		return { success: true };
	} catch (error: any) {
		throw new Error(error.message || "Terjadi kesalahan saat menghapus tugas massal.");
	}
}
