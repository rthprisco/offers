export const runtime = "nodejs";

import { db } from "@/lib/db";

export async function getUserByEmail(email) {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
}

export async function getUserById(id) {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
}
