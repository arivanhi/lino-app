const fs = require("fs");
const path = require("path");

const files = [
  "app/pimpinan/literasi/page.tsx",
  "app/pimpinan/literasi/[kelasId]/page.tsx",
  "app/pimpinan/numerasi/page.tsx",
  "app/pimpinan/numerasi/[kelasId]/page.tsx",
  "app/pimpinan/riwayat/[kelasId]/page.tsx",
  "app/wali-kelas/dashboard/page.tsx",
  "app/wali-kelas/literasi/page.tsx",
  "app/wali-kelas/numerasi/page.tsx",
  "app/wali-kelas/riwayat/page.tsx"
];

for (const relPath of files) {
  const filePath = path.join(__dirname, relPath);
  if (!fs.existsSync(filePath)) {
    console.log("Not found:", filePath);
    continue;
  }
  let content = fs.readFileSync(filePath, "utf-8");
  
  // 1. Fix include query for Pimpinan and Wali Kelas pages
  if (content.includes("pendamping: { include: { user: true } }")) {
    content = content.replace(
      "pendamping: { include: { user: true } }",
      `jadwalPelajaran: {
					where: {
						OR: [{ hari: 2 }, { hari: 4 }],
						waktuMulai: "1"
					},
					include: { guru: { include: { user: true } } }
				}`
    );
  }

  // 2. Fix variable extraction for wali
  if (content.includes("k.pendamping ? k.pendamping.user.nama : (k.waliKelas[0]?.guru.user.nama")) {
    content = content.replace(
      /const wali = k\.pendamping \? k\.pendamping\.user\.nama : \(k\.waliKelas\[0\]\?\.guru\.user\.nama \|\| "Belum Ditugaskan"\);/g,
      `const isKelasX = k.nama.startsWith("X") && !k.nama.startsWith("XI");
			const guruPendamping = k.jadwalPelajaran?.[0]?.guru?.user?.nama;
			const wali = (isKelasX && guruPendamping) ? guruPendamping : (k.waliKelas[0]?.guru.user.nama || "Belum Ditugaskan");`
    );
  }
  
  if (content.includes("kelas.pendamping ? kelas.pendamping.user.nama : (kelas.waliKelas[0]?.guru.user.nama")) {
    content = content.replace(
      /const wali(Kelas)? = kelas\.pendamping \? kelas\.pendamping\.user\.nama : \(kelas\.waliKelas\[0\]\?\.guru\.user\.nama \|\| "Belum Ditugaskan"\);?/g,
      `const isKelasX = kelas.nama.startsWith("X") && !kelas.nama.startsWith("XI");
	const guruPendamping = kelas.jadwalPelajaran?.[0]?.guru?.user?.nama;
	const wali$1 = (isKelasX && guruPendamping) ? guruPendamping : (kelas.waliKelas[0]?.guru.user.nama || "Belum Ditugaskan");`
    );
  }

  // 3. Fix WHERE clause for Wali Kelas (Dashboard, Literasi, Numerasi, Riwayat)
  const oldWhere = `{ pendamping: { user: { username: loggedInUsername } } }`;
  const newWhere = `{ 
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
			}`;
  
  if (content.includes(oldWhere)) {
    content = content.replace(oldWhere, newWhere);
  }
  
  fs.writeFileSync(filePath, content, "utf-8");
  console.log("Updated:", relPath);
}
