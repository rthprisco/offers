import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

const schema = z.object({
  nome: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  cnpj: z.string().min(14, "CNPJ inválido"),
  telefone: z.string().optional(),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  logo: z.string().url("URL do logo inválida").optional().or(z.literal("")).transform(v => v || undefined),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const parse = schema.safeParse(body);
    if (!parse.success) {
      const message = parse.error?.issues?.[0]?.message || "Dados inválidos";
      return NextResponse.json({ error: message }, { status: 400 });
    }
    const { nome, email, cnpj, telefone, senha, logo } = parse.data;

    // Simular verificação de mercado existente usando localStorage
    const mercados = JSON.parse(global.localStorage?.getItem('mercados') || '[]');
    const existsEmail = mercados.find(mercado => mercado.email === email);
    const existsCnpj = mercados.find(mercado => mercado.cnpj === cnpj);
    
    if (existsEmail) {
      return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 409 });
    }
    
    if (existsCnpj) {
      return NextResponse.json({ error: "CNPJ já cadastrado" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(senha, 10);
    const mercado = {
      id: Date.now().toString(),
      nome,
      email,
      cnpj,
      telefone,
      senha: hashed,
      logo,
      createdAt: new Date().toISOString(),
      type: 'mercado'
    };

    // Salvar mercado no localStorage simulado
    mercados.push(mercado);
    if (typeof global !== 'undefined') {
      global.localStorage = global.localStorage || {};
      global.localStorage.setItem = global.localStorage.setItem || function(key, value) {
        this[key] = value;
      };
      global.localStorage.getItem = global.localStorage.getItem || function(key) {
        return this[key] || null;
      };
      global.localStorage.setItem('mercados', JSON.stringify(mercados));
    }

    const { senha: _pass, ...safe } = mercado;
    return NextResponse.json(safe, { status: 201 });
  } catch (err) {
    console.error("[MERCADO_REGISTER_ERROR]", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}


