// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient as EjournalClient } from "../../../../prisma/generated/ejournal-client";

// Inisiasi Prisma untuk E-Journal
const prismaEjournal = new EjournalClient();

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username / NISN / NPP", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.username || !credentials?.password) {
					throw new Error("Username dan Password wajib diisi");
				}

				// 1. Cari user di database E-Journal
				const user = await prismaEjournal.user.findUnique({
					where: { username: credentials.username },
				});

				if (!user) {
					throw new Error("Akun tidak ditemukan");
				}

				// 2. Cocokkan password menggunakan bcryptjs
				const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

				if (!isPasswordValid) {
					throw new Error("Password salah");
				}

				// 3. Kembalikan data untuk dibungkus ke dalam sesi
				return {
					id: user.id,
					username: user.username,
					nama: user.nama,
					role: user.role,
				};
			},
		}),
	],
	callbacks: {
		// Memasukkan data tambahan ke dalam token JWT
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.username = user.username;
				token.nama = user.nama;
				token.role = user.role;
			}
			return token;
		},
		// Menyalin data dari token JWT agar bisa dibaca di sisi Client/UI
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.username = token.username as string;
				session.user.nama = token.nama as string;
				session.user.role = token.role as string;
			}
			return session;
		},
	},
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // Sesi berlaku 30 hari
	},
	pages: {
		signIn: "/login", // Halaman login kustom yang akan kita buat nanti
	},
	secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
