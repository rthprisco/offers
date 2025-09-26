import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, senha } = req.body;

  const mercado = await prisma.mercado.findUnique({ where: { email } });
  if (!mercado) return res.status(404).json({ message: 'Mercado não encontrado' });

  const senhaValida = await bcrypt.compare(senha, mercado.senha);
  if (!senhaValida) return res.status(401).json({ message: 'Senha incorreta' });

  res.status(200).json(mercado);
}
