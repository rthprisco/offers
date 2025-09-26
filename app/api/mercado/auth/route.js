import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../../../../generated/prisma/index.js';

const prisma = new PrismaClient();

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres")
});

const JWT_SECRET = process.env.MERCADO_JWT_SECRET || process.env.NEXTAUTH_SECRET || "dev-secret";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.errors[0]?.message || "Dados inválidos";
      return NextResponse.json({ error: first }, { status: 400 });
    }

    const { email, senha } = parsed.data;

    const mercado = await prisma.mercado.findUnique({
      where: { email },
      select: { id: true, nome: true, email: true, cnpj: true, telefone: true, password: true, logo: true }
    });

    if (!mercado) {
      return NextResponse.json({ error: "E-mail não encontrado" }, { status: 404 });
    }

    const ok = await bcrypt.compare(senha, mercado.password);
    if (!ok) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    const token = jwt.sign(
      { sub: mercado.id, tipo: "mercado", nome: mercado.nome, email: mercado.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    const { password, ...safe } = mercado;

    return NextResponse.json({ message: "Login realizado com sucesso", token, mercado: safe });
  } catch (error) {
    console.error("Erro no login do mercado:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}