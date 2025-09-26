import jwt from 'jsonwebtoken';
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export const authMercado = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        error: 'Token de acesso requerido'
      });
    }

    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);

    // Verificar se é um token de mercado
    if (decoded.tipo !== 'mercado') {
      return res.status(401).json({
        error: 'Token inválido para mercado'
      });
    }

    // Buscar o mercado no banco de dados
    const mercado = await prisma.mercado.findUnique({
      where: { id: decoded.id }
    });

    if (!mercado) {
      return res.status(401).json({
        error: 'Mercado não encontrado'
      });
    }

    req.mercado = mercado;
    next();

  } catch (error) {
    console.error('Erro na autenticação do mercado:', error);
    res.status(401).json({
      error: 'Token inválido'
    });
  }
};

