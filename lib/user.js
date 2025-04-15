import { compare } from "bcryptjs";
import prisma from "./db/prisma";

export async function findUserByCredentials(email, password) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) return null;

  const passwordMatch = await compare(password, user.password);

  if (passwordMatch) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
    };
  }

  return null;
}
