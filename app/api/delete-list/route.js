import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(request) {
  try {
    const { userId } = await request.json();

    // Busca a lista do usuário
    const existingList = await db.list.findFirst({
      where: { userId },
    });

    if (!existingList) {
      return NextResponse.json({ error: "Lista não encontrada" }, { status: 404 });
    }

    // Deleta os itens da lista
    await db.listItem.deleteMany({
      where: { ListId: existingList.id },
    });

    // Deleta a própria lista
    await db.list.delete({
      where: { id: existingList.id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao deletar lista:", error);
    return NextResponse.json({ error: "Erro ao deletar lista" }, { status: 500 });
  }
}