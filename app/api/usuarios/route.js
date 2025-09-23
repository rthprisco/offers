import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { selectUsuarios, insertUsuario } from "@/lib/sql";

export async function GET() {
  try {
    const users = await selectUsuarios();
    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.error("[USUARIOS_GET_ERROR]", err);
    return NextResponse.json({ error: "Erro ao listar usuários" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { nome, email, senha, telefone } = body;

    if (!nome || !email || !senha) {
      return NextResponse.json({ error: "nome, email e senha são obrigatórios" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(senha, 10);
    const created = await insertUsuario({
      nome,
      email,
      senha: hashed,
      telefone: telefone || null,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("[USUARIOS_POST_ERROR]", err);

    return NextResponse.json({ error: "Erro ao criar usuário" }, { status: 500 });
  }
}
