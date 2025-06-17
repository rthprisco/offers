import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(_, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID do item não fornecido" }, { status: 400 });
  }

  try {
    await db.listItem.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true, message: "Item deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar item:", error);
    return NextResponse.json({ error: "Erro interno ao deletar item" }, { status: 500 });
  }
}
