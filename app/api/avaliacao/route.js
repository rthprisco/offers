import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  return NextResponse.json([]);
}