// app/api/uploads/[filename]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import fs from "fs";

// Menggunakan Promise pada params karena ini standar Next.js 15 (App Router)
export async function GET(req: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
	try {
		const resolvedParams = await params;
		const filename = resolvedParams.filename;

		// Kita arahkan ke folder "storage/uploads" di root proyek
		const filePath = path.join(process.cwd(), "storage", "uploads", filename);

		// Cek apakah file benar-benar ada secara fisik
		if (!fs.existsSync(filePath)) {
			return new NextResponse("File tidak ditemukan di server", { status: 404 });
		}

		// Baca file-nya
		const fileBuffer = await readFile(filePath);

		// Kembalikan sebagai format PDF ke browser
		return new NextResponse(fileBuffer, {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `inline; filename="${filename}"`,
			},
		});
	} catch (error) {
		console.error("Error reading file:", error);
		return new NextResponse("Terjadi kesalahan server saat membaca file", { status: 500 });
	}
}
