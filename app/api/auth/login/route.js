import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"; // para leitura direta de senha

export async function POST(req) {
  try {
    const { email, senha, tipo } = await req.json(); // tipo: 'usuario' ou 'mercado'
    if (!email || !senha) return NextResponse.json({ error: "email e senha obrigatórios" }, { status: 400 });

    const table = (tipo === "mercado") ? "mercados" : "usuarios";
    const rows = await prisma.$queryRaw`SELECT id, nome, email, senha, telefone, cnpj FROM ${table} WHERE email = ${email} LIMIT 1`;
    const user = rows[0];

    if (!user) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });

    delete user.senha;
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("[AUTH_LOGIN_ERROR]", err);
    return NextResponse.json({ error: "Erro de autenticação" }, { status: 500 });
  }
}
