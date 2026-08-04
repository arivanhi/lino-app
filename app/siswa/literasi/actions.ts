// app/siswa/literasi/action.ts
"use server";

import { PrismaClient as LinoClient } from "../../../prisma/generated/lino-client";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const prismaLino = new LinoClient();

export async function submitTugasLiterasi(penugasanId: string, siswaId: string, fileName: string, fileBase64: string) {
	try {
		// 1. Persiapkan folder penyimpanannya di "storage/uploads" (Bukan public)
		const uploadDir = path.join(process.cwd(), "storage", "uploads");
		try {
			await mkdir(uploadDir, { recursive: true });
		} catch (err) {
			// Abaikan jika folder sudah terbentuk
		}

		// 2. Buat nama file unik
		const timestamp = Date.now();
		const safeFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
		const finalFileName = `${siswaId}-${timestamp}-${safeFileName}`;
		const filePath = path.join(uploadDir, finalFileName);

		// 3. Ekstrak data Base64 dan simpan secara fisik ke server
		const base64Data = fileBase64.split(",")[1];
		const buffer = Buffer.from(base64Data, "base64");
		await writeFile(filePath, buffer);

		// 4. PATH URL BARU: Mengarah ke API Route yang baru kita buat!
		const fileUrl = `/api/uploads/${finalFileName}`;

		// 5. Simpan link API tersebut ke Database Prisma
		const existing = await prismaLino.hasilKerjaSiswa.findFirst({
			where: { penugasanId, siswaId },
		});

		if (existing) {
			await prismaLino.hasilKerjaSiswa.update({
				where: { id: existing.id },
				data: {
					statusPengerjaan: "SELESAI",
					fileJawabanPdf: fileUrl,
				},
			});
		} else {
			await prismaLino.hasilKerjaSiswa.create({
				data: {
					penugasanId,
					siswaId,
					statusPengerjaan: "SELESAI",
					fileJawabanPdf: fileUrl,
				},
			});
		}

		return { success: true };
	} catch (error) {
		console.error("Error upload tugas:", error);
		throw new Error("Gagal menyimpan tugas ke server.");
	}
}
