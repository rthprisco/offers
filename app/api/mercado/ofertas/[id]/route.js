import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PUT → atualizar oferta
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { nomeProduto, descricao, precoPromocional, imagemUrl } = body;

    const ofertaAtualizada = await prisma.oferta.update({
      where: { id },
      data: {
        nomeProduto,
        descricao,
        precoPromocional: parseFloat(precoPromocional),
        imagemUrl,
      },
    });

    return NextResponse.json({ oferta: ofertaAtualizada });
  } catch (error) {
    console.error("Erro ao atualizar oferta:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar oferta" },
      { status: 500 }
    );
  }
}

// DELETE → excluir oferta
export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await prisma.oferta.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Oferta excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir oferta:", error);
    return NextResponse.json(
      { error: "Erro ao excluir oferta" },
      { status: 500 }
    );
  }
}
