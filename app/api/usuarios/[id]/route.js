import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { selectUsuarioById, updateUsuario, deleteUsuario } from "@/lib/sql";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const user = await selectUsuarioById(Number(id));
    if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("[USUARIO_GET_ID_ERROR]", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { nome, email, senha, telefone } = body;

    let hashed = senha;
    if (senha) {
      hashed = await bcrypt.hash(senha, 10);
    }

    const updated = await updateUsuario(Number(id), {
      nome,
      email,
      senha: hashed,
      telefone: telefone || null,
    });

    if (!updated) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("[USUARIO_PUT_ERROR]", err);
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const res = await deleteUsuario(Number(id));
    if (res === 0) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[USUARIO_DELETE_ERROR]", err);
    return NextResponse.json({ error: "Erro ao deletar usuário" }, { status: 500 });
  }
}
