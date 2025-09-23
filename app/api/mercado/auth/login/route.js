import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(1, "Senha obrigatória"),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const parse = schema.safeParse(body);
    if (!parse.success) {
      const message = parse.error?.issues?.[0]?.message || "Dados inválidos";
      return NextResponse.json({ error: message }, { status: 400 });
    }
    const { email, senha } = parse.data;

    // Buscar mercado no localStorage simulado
    const mercados = JSON.parse(global.localStorage?.getItem('mercados') || '[]');
    const mercado = mercados.find(m => m.email === email && m.type === 'mercado');
    
    if (!mercado) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }
    
    const ok = await bcrypt.compare(senha, mercado.senha || "");
    if (!ok) {
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
    }

    const { senha: _pass, ...safe } = mercado;
    return NextResponse.json({
      token: `mercado_${mercado.id}_${Date.now()}`,
      mercado: safe
    }, { status: 200 });
  } catch (err) {
    console.error("[MERCADO_LOGIN_ERROR]", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
