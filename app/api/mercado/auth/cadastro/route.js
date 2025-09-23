import { NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

const cadastroSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 letras"),
  email: z.string().email("E-mail inválido"),
  cnpj: z.string().min(11, "CNPJ inválido").max(18, "CNPJ inválido"),
  telefone: z.string().min(8, "Telefone inválido").optional().or(z.literal("")).transform(v => v || undefined),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  logo: z.string().url("Logo deve ser uma URL").optional().or(z.literal("")).transform(v => v || undefined),
});

export async function POST(request) {
  try {
    const json = await request.json();
    const parsed = cadastroSchema.safeParse(json);
    if (!parsed.success) {
      const message = parsed.error?.issues?.[0]?.message || "Dados inválidos";
      return NextResponse.json({ error: message }, { status: 400 });
    }
    const { nome, email, cnpj, telefone, senha, logo } = parsed.data;

    // verificar se já existe
    const existsEmail = await db.mercado.findUnique({ where: { email } });
    if (existsEmail) {
      return NextResponse.json({ error: "E-mail já está em uso" }, { status: 409 });
    }
    const existsCnpj = await db.mercado.findUnique({ where: { cnpj } });
    if (existsCnpj) {
      return NextResponse.json({ error: "CNPJ já está em uso" }, { status: 409 });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const mercado = await db.mercado.create({
      data: { nome, email, cnpj, telefone, senha: senhaHash, logo },
      select: { id: true, nome: true, email: true, cnpj: true, telefone: true, logo: true, criado_em: true }
    });

    return NextResponse.json({ message: "Mercado cadastrado com sucesso", mercado }, { status: 201 });
  } catch (error) {
    console.error("Erro no cadastro de mercado:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
