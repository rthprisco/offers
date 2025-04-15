"use server";

import prisma from "@/lib/db/prisma";
import { compare, hash } from "bcryptjs";
import { z } from "zod";

export async function updateUser(_prevState, formData) {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries);

  await prisma.user.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
    },
  });

  return { success: true };
}

const schemaUpdatePassword = z
  .object({
    newPassword: z.string(),
    confirmNewPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "As senhas não coicidem",
  });

export async function updatePassword(_prevState, formData) {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries);

  const user = await prisma.user.findUnique({
    where: {
      id: data.id,
    },
  });

  const checkPassword = await compare(data.password, user.password);

  if (!checkPassword) {
    return {
      success: false,
      errors: { password: "Senha incorreta" },
    };
  }

  const checkShema = schemaUpdatePassword.safeParse(data);

  if (!checkShema.success) {
    return {
      success: false,
      errors: checkShema.error.flatten().fieldErrors,
    };
  }

  const newHashedPassword = await hash(data.newPassword, 10);

  await prisma.user.update({
    where: {
      id: data.id,
    },
    data: {
      password: newHashedPassword,
    },
  });

  return { success: true };
}
