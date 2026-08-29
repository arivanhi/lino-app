const { PrismaClient } = require('./prisma/generated/ejournal-client'); const prisma = new PrismaClient(); prisma.jadwalPelajaran.findFirst().then(console.log).finally(() => prisma.$disconnect());
