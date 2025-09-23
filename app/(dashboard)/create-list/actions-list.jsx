"use server";

import { prisma } from "@/lib/db";

export async function saveShoppingList({ userId, list }) {
  if (!userId || !Array.isArray(list)) return;

  // Verifica se já existe uma lista para o usuário
  let userList = await prisma.list.findUnique({
    where: { userId },
  });

  // Se não existe, cria a lista
  if (!userList) {
    userList = await prisma.list.create({
      data: {
        userId,
        items: {
          create: list.map((item) => ({
            itemName: item.name,
            isChecked: item.isPurchased,
          })),
        },
      },
    });
  } else {
    // Se já existe, deleta os itens antigos e recria com os novos
    await prisma.listItem.deleteMany({ where: { ListId: userList.id } });
    await prisma.list.update({
      where: { id: userList.id },
      data: {
        items: {
          create: list.map((item) => ({
            itemName: item.name,
            isChecked: item.isPurchased,
          })),
        },
      },
    });
  }
}
