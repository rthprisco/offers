import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request) {
  try {
    const { userId, list } = await request.json();

    // Verifica se já existe uma lista para o usuário
    let existingList = await db.list.findFirst({
      where: { userId },
    });

    // Se existir, deletamos os itens antigos
    if (existingList) {
      await db.listItem.deleteMany({
        where: { ListId: existingList.id },
      });
    } else {
      // Se não existir, criamos uma nova lista
      existingList = await db.list.create({
        data: { userId },
      });
    }

    // Criamos os novos itens da lista
    await db.listItem.createMany({
      data: list.map((item) => ({
        itemName: item.name,
        isChecked: item.isPurchased,
        ListId: existingList.id,
      })),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro ao salvar lista:", error);
    return NextResponse.json({ error: "Erro ao salvar lista" }, { status: 500 });
  }
}

