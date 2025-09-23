import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).json({ message: 'Method not allowed' });

  const { id, nome, senha } = req.body;

  const senhaHash = senha ? await bcrypt.hash(senha, 10) : undefined;

  try {
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id },
      data: {
        nome,
        ...(senhaHash && { senha: senhaHash }),
      },
    });
    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
