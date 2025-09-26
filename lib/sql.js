import prisma from "@/lib/prisma"; 


export async function selectUsuarios() {
  const rows = await prisma.$queryRaw`SELECT id, nome, email, telefone, criado_em FROM usuarios ORDER BY id DESC`;
  return rows;
}

export async function selectUsuarioById(id) {
  const rows = await prisma.$queryRaw`SELECT id, nome, email, telefone, criado_em FROM usuarios WHERE id = ${id} LIMIT 1`;
  return rows[0] || null;
}

export async function insertUsuario({ nome, email, senha, telefone }) {
  // retorna o id criado (Postgres RETURNING)
  const res = await prisma.$queryRaw`INSERT INTO usuarios (nome, email, senha, telefone) VALUES (${nome}, ${email}, ${senha}, ${telefone}) RETURNING id, nome, email, telefone, criado_em`;
  return res[0];
}

export async function updateUsuario(id, { nome, email, senha, telefone }) {
  // atualiza campos passados (trivial: atualiza todos)
  const res = await prisma.$queryRaw`UPDATE usuarios SET nome = ${nome}, email = ${email}, senha = ${senha}, telefone = ${telefone} WHERE id = ${id} RETURNING id, nome, email, telefone, criado_em`;
  return res[0] || null;
}

export async function deleteUsuario(id) {
  // delete e retorna número de linhas afetadas
  const res = await prisma.$executeRaw`DELETE FROM usuarios WHERE id = ${id}`;
  return res;
}

/* --- Mercados --- */

export async function selectMercados() {
  const rows = await prisma.$queryRaw`SELECT id, nome, email, cnpj, telefone, criado_em FROM mercados ORDER BY id DESC`;
  return rows;
}

export async function selectMercadoById(id) {
  const rows = await prisma.$queryRaw`SELECT id, nome, email, cnpj, telefone, criado_em FROM mercados WHERE id = ${id} LIMIT 1`;
  return rows[0] || null;
}

export async function insertMercado({ nome, email, senha, cnpj, telefone }) {
  const res = await prisma.$queryRaw`INSERT INTO mercados (nome, email, senha, cnpj, telefone) VALUES (${nome}, ${email}, ${senha}, ${cnpj}, ${telefone}) RETURNING id, nome, email, cnpj, telefone, criado_em`;
  return res[0];
}

export async function updateMercado(id, { nome, email, senha, cnpj, telefone }) {
  const res = await prisma.$queryRaw`UPDATE mercados SET nome = ${nome}, email = ${email}, senha = ${senha}, cnpj = ${cnpj}, telefone = ${telefone} WHERE id = ${id} RETURNING id, nome, email, cnpj, telefone, criado_em`;
  return res[0] || null;
}

export async function deleteMercado(id) {
  const res = await prisma.$executeRaw`DELETE FROM mercados WHERE id = ${id}`;
  return res;
}
