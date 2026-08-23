// app/admin/numerasi/[kelasId]/actions.ts
"use server";

import { PrismaClient as EjournalClient } from "../../../../prisma/generated/ejournal-client";
import { PrismaClient as LinoClient } from "../../../../prisma/generated/lino-client";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";

const prismaEjournal = new EjournalClient();
const prismaLino = new LinoClient();

// 1. Fungsi untuk Simpan / Update Nilai Manual
export async function saveNilaiNumerasi(kelasId: string, judulTugas: string, siswaId: string, nilaiAkhir: number) {
	const ta = await prismaEjournal.tahunAjaran.findFirst({ where: { isActive: true } });
	if (!ta) throw new Error("Tahun ajaran aktif tidak ditemukan.");

	// Cari atau buat Penugasan
	let penugasan = await prismaLino.penugasanLino.findFirst({
		where: { kelasId, judul: judulTugas, tipe: "NUMERASI" },
	});

	if (!penugasan) {
		penugasan = await prismaLino.penugasanLino.create({
			data: {
				judul: judulTugas,
				tipe: "NUMERASI",
				tahunAjaranId: ta.id,
				kelasId: kelasId,
				guruId: "ADMIN_TU", // ID default untuk admin
				waktuMulai: new Date(),
				waktuSelesai: new Date(),
				status: "SELESAI",
			},
		});
	}

	// Cek apakah siswa sudah punya nilai di tugas ini (Upsert)
	const existing = await prismaLino.hasilKerjaSiswa.findFirst({
		where: { penugasanId: penugasan.id, siswaId },
	});

	if (existing) {
		await prismaLino.hasilKerjaSiswa.update({
			where: { id: existing.id },
			data: { nilaiAkhir, statusPengerjaan: "SELESAI" },
		});
	} else {
		await prismaLino.hasilKerjaSiswa.create({
			data: {
				penugasanId: penugasan.id,
				siswaId,
				nilaiAkhir,
				statusPengerjaan: "SELESAI",
			},
		});
	}

	revalidatePath(`/admin/numerasi/${kelasId}`);
	return { success: true };
}

// 2. Fungsi untuk Upload Masal dari Excel
export async function uploadExcelNumerasi(kelasId: string, dataExcel: any[]) {
	const ta = await prismaEjournal.tahunAjaran.findFirst({ where: { isActive: true } });
	if (!ta) throw new Error("Tahun ajaran aktif tidak ditemukan.");

	// Ambil daftar siswa untuk pencocokan NIS -> ID Siswa
	const siswaList = await prismaEjournal.riwayatKelasSiswa.findMany({
		where: { kelasId, tahunAjaranId: ta.id },
		include: { siswa: true },
	});

	for (const row of dataExcel) {
		const nis = String(row["NIS"]);
		const siswa = siswaList.find((s) => s.siswa.nis === nis);
		if (!siswa) continue; // Abaikan jika NIS tidak ditemukan

		// Loop semua kolom tugas di Excel (selain NIS dan Nama Siswa)
		for (const key of Object.keys(row)) {
			if (key === "NIS" || key === "Nama Siswa") continue;

			const nilaiRaw = row[key];
			if (nilaiRaw === null || nilaiRaw === undefined || nilaiRaw === "") continue;

			const nilai = Number(nilaiRaw);
			if (isNaN(nilai)) continue;

			let penugasan = await prismaLino.penugasanLino.findFirst({
				where: { kelasId, judul: key, tipe: "NUMERASI" },
			});

			if (!penugasan) {
				penugasan = await prismaLino.penugasanLino.create({
					data: {
						judul: key,
						tipe: "NUMERASI",
						tahunAjaranId: ta.id,
						kelasId,
						guruId: "ADMIN_TU",
						waktuMulai: new Date(),
						waktuSelesai: new Date(),
						status: "SELESAI",
					},
				});
			}

			const existing = await prismaLino.hasilKerjaSiswa.findFirst({
				where: { penugasanId: penugasan.id, siswaId: siswa.siswaId },
			});

			if (existing) {
				await prismaLino.hasilKerjaSiswa.update({
					where: { id: existing.id },
					data: { nilaiAkhir: nilai, statusPengerjaan: "SELESAI" },
				});
			} else {
				await prismaLino.hasilKerjaSiswa.create({
					data: { penugasanId: penugasan.id, siswaId: siswa.siswaId, nilaiAkhir: nilai, statusPengerjaan: "SELESAI" },
				});
			}
		}
	}

	revalidatePath(`/admin/numerasi/${kelasId}`);
	return { success: true };
}

// 3. Fungsi untuk Tambah Topik beserta File Soal PDF
export async function tambahTopikNumerasi(kelasId: string, formData: FormData) {
	const ta = await prismaEjournal.tahunAjaran.findFirst({ where: { isActive: true } });
	if (!ta) throw new Error("Tahun ajaran aktif tidak ditemukan.");

	const judul = formData.get("judul") as string;
	const file = formData.get("file") as File | null;
	if (!judul) throw new Error("Judul topik harus diisi.");

	let fileSoalUrl = null;

	if (file && file.size > 0) {
		const buffer = Buffer.from(await file.arrayBuffer());
		const ext = path.extname(file.name) || ".pdf";
		const safeName = judul.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
		const filename = `${Date.now()}_${safeName}${ext}`;
		
		const uploadDir = path.join(process.cwd(), "storage", "uploads", "tugas_numerasi", kelasId);
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}

		const filePath = path.join(uploadDir, filename);
		fs.writeFileSync(filePath, buffer);
		
		// The API route handles files in storage/uploads
		fileSoalUrl = `/api/uploads/tugas_numerasi/${kelasId}/${filename}`;
	}

	await prismaLino.penugasanLino.create({
		data: {
			judul,
			tipe: "NUMERASI",
			tahunAjaranId: ta.id,
			kelasId,
			guruId: "ADMIN_TU",
			waktuMulai: new Date(),
			waktuSelesai: new Date(),
			status: "SELESAI",
			fileSoalUrl,
		},
	});

	revalidatePath(`/admin/numerasi/${kelasId}`);
	return { success: true };
}
