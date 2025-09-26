import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export const registerMercado = async (req, res) => {
  try {
    const { nome, email, cnpj, telefone, senha, logo } = req.body;

    // Verificar se o mercado já existe
    const existingMercado = await prisma.mercado.findFirst({
      where: {
        OR: [
          { email },
          { cnpj }
        ]
      }
    });

    if (existingMercado) {
      return res.status(400).json({
        error: 'Mercado já cadastrado com este email ou CNPJ'
      });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 12);

    // Criar o mercado
    const mercado = await prisma.mercado.create({
      data: {
        nome,
        email,
        cnpj,
        telefone,
        logo,
        senha: hashedPassword
      }
    });

    // Remover a senha do retorno
    const { senha: _, ...mercadoSemSenha } = mercado;

    res.status(201).json({
      message: 'Mercado cadastrado com sucesso',
      mercado: mercadoSemSenha
    });

  } catch (error) {
    console.error('Erro ao cadastrar mercado:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
};

export const loginMercado = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Buscar o mercado pelo email
    const mercado = await prisma.mercado.findUnique({
      where: { email }
    });

    if (!mercado) {
      return res.status(401).json({
        error: 'Email ou senha inválidos'
      });
    }

    // Verificar a senha
    const senhaValida = await bcrypt.compare(senha, mercado.senha);

    if (!senhaValida) {
      return res.status(401).json({
        error: 'Email ou senha inválidos'
      });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { 
        id: mercado.id, 
        email: mercado.email,
        tipo: 'mercado'
      },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: '7d' }
    );

    // Remover a senha do retorno
    const { senha: _, ...mercadoSemSenha } = mercado;

    res.json({
      message: 'Login realizado com sucesso',
      token,
      mercado: mercadoSemSenha
    });

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
};

export const getMercadoProfile = async (req, res) => {
  try {
    const mercadoId = req.mercado.id;

    const mercado = await prisma.mercado.findUnique({
      where: { id: mercadoId }
    });

    if (!mercado) {
      return res.status(404).json({
        error: 'Mercado não encontrado'
      });
    }

    // Remover a senha do retorno
    const { senha: _, ...mercadoSemSenha } = mercado;

    res.json({
      mercado: mercadoSemSenha
    });

  } catch (error) {
    console.error('Erro ao buscar perfil do mercado:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
};

export const updateMercadoProfile = async (req, res) => {
  try {
    const mercadoId = req.mercado.id;
    const { nome, telefone, logo } = req.body;

    const mercadoAtualizado = await prisma.mercado.update({
      where: { id: mercadoId },
      data: {
        ...(nome && { nome }),
        ...(telefone && { telefone }),
        ...(logo && { logo })
      }
    });

    // Remover a senha do retorno
    const { senha: _, ...mercadoSemSenha } = mercadoAtualizado;

    res.json({
      message: 'Perfil atualizado com sucesso',
      mercado: mercadoSemSenha
    });

  } catch (error) {
    console.error('Erro ao atualizar perfil do mercado:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
};

