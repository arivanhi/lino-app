import { NextRequest, NextResponse } from "next/server";
import { PrismaClient as EjournalClient } from "../../../prisma/generated/ejournal-client";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const ejournalPrisma = new EjournalClient();

export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session || (session.user.role !== "ADMIN_TU" && session.user.role !== "WAKA")) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const users = await ejournalPrisma.user.findMany({
			where: { role: "KOORDINATOR" },
			select: { id: true, username: true, nama: true, role: true },
			orderBy: { nama: "asc" },
		});
		return NextResponse.json(users);
	} catch (error) {
		console.error("GET Koordinator Error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	const session = await getServerSession(authOptions);
	if (!session || (session.user.role !== "ADMIN_TU" && session.user.role !== "WAKA")) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const { username, password, nama } = await req.json();

		if (!username || !password || !nama) {
			return NextResponse.json({ error: "Semua field harus diisi" }, { status: 400 });
		}

		// Cek apakah username sudah dipakai
		const existing = await ejournalPrisma.user.findUnique({ where: { username } });
		if (existing) {
			return NextResponse.json({ error: "Username sudah digunakan" }, { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await ejournalPrisma.user.create({
			data: {
				username,
				password: hashedPassword,
				nama,
				role: "KOORDINATOR",
			},
		});

		return NextResponse.json(newUser);
	} catch (error) {
		console.error("POST Koordinator Error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest) {
	const session = await getServerSession(authOptions);
	if (!session || (session.user.role !== "ADMIN_TU" && session.user.role !== "WAKA")) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const url = new URL(req.url);
	const id = url.searchParams.get("id");

	if (!id) {
		return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
	}

	try {
		await ejournalPrisma.user.delete({ where: { id } });
		return NextResponse.json({ message: "Berhasil dihapus" });
	} catch (error) {
		console.error("DELETE Koordinator Error:", error);
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}
