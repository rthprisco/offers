import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../../../../generated/prisma/index.js';

const prisma = new PrismaClient();

// Middleware de autenticação
async function authenticateMercado(request) {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);

    // Verificar se é um token de mercado
    if (decoded.tipo !== 'mercado') {
      return null;
    }

    // Buscar o mercado no banco de dados
    const mercado = await prisma.mercado.findUnique({
      where: { id: decoded.id }
    });

    return mercado;
  } catch (error) {
    return null;
  }
}

export async function GET(request) {
  try {
    const mercado = await authenticateMercado(request);

    if (!mercado) {
      return NextResponse.json(
        { error: 'Token de acesso inválido ou não fornecido' },
        { status: 401 }
      );
    }

    // Remover a senha do retorno
    const { senha: _, ...mercadoSemSenha } = mercado;

    return NextResponse.json({
      mercado: mercadoSemSenha
    });

  } catch (error) {
    console.error('Erro ao buscar perfil do mercado:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const mercado = await authenticateMercado(request);

    if (!mercado) {
      return NextResponse.json(
        { error: 'Token de acesso inválido ou não fornecido' },
        { status: 401 }
      );
    }

    const { nome, telefone, logo } = await request.json();

    const mercadoAtualizado = await prisma.mercado.update({
      where: { id: mercado.id },
      data: {
        ...(nome && { nome }),
        ...(telefone && { telefone }),
        ...(logo && { logo })
      }
    });

    // Remover a senha do retorno
    const { senha: _, ...mercadoSemSenha } = mercadoAtualizado;

    return NextResponse.json({
      message: 'Perfil atualizado com sucesso',
      mercado: mercadoSemSenha
    });

  } catch (error) {
    console.error('Erro ao atualizar perfil do mercado:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

