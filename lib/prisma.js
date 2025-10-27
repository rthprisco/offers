import { PrismaClient } from "@prisma/client";

// const prisma = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalThis.prisma = prisma;
// }

const prisma = new PrismaClient();

export default prisma;
