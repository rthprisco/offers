import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { insertUsuario, insertMercado } from "@/lib/sql";

export async function POST(req) {
  try {
    const body = await req.json();
    const tipo = body.tipo || "usuario";

    if (tipo === "usuario") {
      const { nome, email, senha, telefone } = body;
      if (!nome || !email || !senha) return NextResponse.json({ error: "nome, email e senha obrigatórios" }, { status: 400 });
      const hashed = await bcrypt.hash(senha, 10);
      const created = await insertUsuario({ nome, email, senha: hashed, telefone });
      return NextResponse.json(created, { status: 201 });
    } else {
      // mercado
      const { nome, email, senha, cnpj, telefone } = body;
      if (!nome || !email || !senha) return NextResponse.json({ error: "nome, email e senha obrigatórios" }, { status: 400 });
      const hashed = await bcrypt.hash(senha, 10);
      const created = await insertMercado({ nome, email, senha: hashed, cnpj, telefone });
      return NextResponse.json(created, { status: 201 });
    }
  } catch (err) {
    console.error("[AUTH_REGISTER_ERROR]", err);
    return NextResponse.json({ error: "Erro ao cadastrar" }, { status: 500 });
  }
}
