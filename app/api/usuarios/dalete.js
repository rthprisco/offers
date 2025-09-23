import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).json({ message: 'Method not allowed' });

  const { id } = req.body;

  try {
    const usuarioDeletado = await prisma.usuario.delete({ where: { id } });
    res.status(200).json(usuarioDeletado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
