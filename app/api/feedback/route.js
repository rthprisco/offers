import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

// Criar novo feedback
export async function POST(req) {
  try {
    const body = await req.json();
    const { productId, comment } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "ProductId é obrigatório" },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        productId,
        comment,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error("Erro no POST /api/feedback:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

// Listar feedbacks por produto
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { error: "ProductId é obrigatório" },
        { status: 400 }
      );
    }

    const feedbacks = await prisma.feedback.findMany({
      where: { productId: Number(productId) },
      orderBy: { id: "desc" },
    });

    return NextResponse.json(feedbacks, { status: 200 });
  } catch (error) {
    console.error("Erro no GET /api/feedback:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
