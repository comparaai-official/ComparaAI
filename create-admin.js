// Bu script bir kereye mahsus çalıştırılır, admin kullanıcı oluşturur.
// Kullanım: node create-admin.js <email> <sifre>

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error('Kullanim: node create-admin.js <email> <sifre>');
    process.exit(1);
  }

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
    },
  });

  console.log('Admin kullanici olusturuldu:', user.email);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
