import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;
  
  // Se não houver connection string ou for arquivo local, usa SQLite (MOCK/LOCAL)
  if (!connectionString || connectionString.startsWith('file:')) {
    const dbPath = path.resolve(process.cwd(), "./prisma/dev.db");
    const adapter = new PrismaBetterSqlite3({ 
      url: `file:${dbPath}` 
    });
    return new PrismaClient({ adapter });
  }

  // Caso contrário, usa PostgreSQL (PROD/SUPABASE)
  const pool = new Pool({ 
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });
  const adapter = new PrismaPg(pool);
  
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
