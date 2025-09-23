import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { selectMercados, insertMercado } from "@/lib/sql";

export async function GET() {
  try {
    const rows = await selectMercados();
    return NextResponse.json(rows, { status: 200 });
  } catch (err) {
    console.error("[MERCADOS_GET_ERROR]", err);
    return NextResponse.json({ error: "Erro ao listar mercados" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { nome, email, senha, cnpj, telefone } = body;
    if (!nome || !email || !senha) {
      return NextResponse.json({ error: "nome, email e senha são obrigatórios" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(senha, 10);
    const created = await insertMercado({
      nome,
      email,
      senha: hashed,
      cnpj: cnpj || null,
      telefone: telefone || null,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("[MERCADOS_POST_ERROR]", err);
    return NextResponse.json({ error: "Erro ao criar mercado" }, { status: 500 });
  }
}
