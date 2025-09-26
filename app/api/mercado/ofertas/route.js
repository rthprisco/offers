import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { 
      nomeProduto, 
      descricao, 
      precoOriginal, 
      precoPromocional, 
      categoria, 
      dataInicio, 
      dataFim, 
      quantidadeDisponivel,
      imagemUrl,
      mercadoId 
    } = await req.json();

    // Validação básica
    if (!nomeProduto || !precoOriginal || !categoria || !dataInicio || !dataFim || !mercadoId) {
      return NextResponse.json({ error: "Campos obrigatórios não preenchidos" }, { status: 400 });
    }

    // Validar se o preço promocional é menor que o original (se fornecido)
    if (precoPromocional && parseFloat(precoPromocional) >= parseFloat(precoOriginal)) {
      return NextResponse.json({ error: "O preço promocional deve ser menor que o preço original" }, { status: 400 });
    }

    // Validar se a data de fim é posterior à data de início
    if (new Date(dataFim) <= new Date(dataInicio)) {
      return NextResponse.json({ error: "A data de fim deve ser posterior à data de início" }, { status: 400 });
    }

    // Criar objeto da oferta
    const novaOferta = {
      id: Date.now().toString(), // ID simples baseado em timestamp
      nomeProduto,
      descricao: descricao || '',
      precoOriginal: parseFloat(precoOriginal),
      precoPromocional: precoPromocional ? parseFloat(precoPromocional) : null,
      categoria,
      dataInicio,
      dataFim,
      quantidadeDisponivel: quantidadeDisponivel ? parseInt(quantidadeDisponivel) : null,
      imagemUrl: imagemUrl || '',
      mercadoId,
      dataCriacao: new Date().toISOString(),
      ativo: true
    };

    // Em um ambiente real, isso seria salvo em um banco de dados
    // Por enquanto, retornamos sucesso com a oferta criada
    return NextResponse.json({ 
      message: "Oferta criada com sucesso!", 
      oferta: novaOferta 
    }, { status: 201 });

  } catch (error) {
    console.error("[CRIAR_OFERTA_ERROR]", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const mercadoId = searchParams.get('mercadoId');

    if (!mercadoId) {
      return NextResponse.json({ error: "ID do mercado é obrigatório" }, { status: 400 });
    }

    // Em um ambiente real, isso buscaria as ofertas do banco de dados
    // Por enquanto, retornamos um array vazio
    const ofertas = [];

    return NextResponse.json({ ofertas }, { status: 200 });

  } catch (error) {
    console.error("[LISTAR_OFERTAS_ERROR]", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
