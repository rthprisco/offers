import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, productId } = await req.json();

    const favorite = await prisma.favorite.create({
      data: { userId, productId },
    });

    return NextResponse.json(favorite);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // id do favorito

    await prisma.favorite.delete({ where: { id } });

    return NextResponse.json({ message: "Removido dos favoritos" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
