"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { hash } from "bcryptjs";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

const schema = z
  .object({
    name: z.string().min(3, "Nome deve possui no mínimo 3 letras"),
    email: z.string().email("E-mail inválido"),
    phone: z.string().min(2, "Telefone inválido"),
    password: z.string().min(3, "A senha deve ter no mínimo 3 caracteres"),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coicidem",
  });

export async function register(_prevState, formData) {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries);

  const result = schema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      errors: { email: "Esse e-mail já está cadastrado" },
    };
  }

  const hashedPassword = await hash(data.password, 10);

  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: hashedPassword,
    },
  });

  await signIn("credentials", {
    email: formData.get("email"),
    password: formData.get("password"),
    redirect: true,
    redirectTo: "/",
  });
}

export async function login(_prevState, formData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: true,
      redirectTo: "/",
    });
  } catch (error) {
    // Correção do erro nativo do auth.js (está em beta)
    if (isRedirectError(error)) {
      throw error;
    }
  }
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
