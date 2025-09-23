import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req, { params }) {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: "User ID não fornecido" }, { status: 400 });
  }

  try {
    // Busca a lista do usuário
    const list = await db.list.findFirst({
      where: { userId },
      include: {
        items: true, // Inclui os itens da lista
      },
    });

    if (!list) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    // Mapeia os itens no formato que o front espera
    const items = list.items.map(item => ({
      id: item.id,
      name: item.itemName,
      isPurchased: item.isChecked,
    }));

    return NextResponse.json({ items }, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar lista:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}