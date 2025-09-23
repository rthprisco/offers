import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { nome, email, senha } = req.body;

  const senhaHash = await bcrypt.hash(senha, 10);

  try {
    const novoUsuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaHash },
    });
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
