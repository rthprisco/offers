"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function RegisterFormMercado() {
  const [form, setForm] = useState({ nome: "", email: "", cnpj: "", telefone: "", senha: "", logo: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
try {
  const res = await fetch("/api/mercado/cadastro", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const { error } = await res.json();
    toast.error(error || "Erro ao cadastrar mercado");
    return;
  }
  toast.success("Mercado cadastrado com sucesso!");
} catch (err) {
  toast.error("Erro de rede, tente novamente");
}

  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Cadastro do Mercado</CardTitle>
        <CardDescription>Crie sua conta comercial</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" name="nome" value={form.nome} onChange={onChange} required />
          </div>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" name="email" type="email" value={form.email} onChange={onChange} required />
          </div>
          <div>
            <Label htmlFor="cnpj">CNPJ</Label>
            <Input id="cnpj" name="cnpj" value={form.cnpj} onChange={onChange} placeholder="00.000.000/0000-00" required />
          </div>
          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input id="telefone" name="telefone" value={form.telefone} onChange={onChange} placeholder="(00) 00000-0000" required />
          </div>
          <div>
            <Label htmlFor="senha">Senha</Label>
            <Input id="senha" name="senha" type="password" value={form.senha} onChange={onChange} required />
          </div>
          <div>
            <Label htmlFor="logo">Logo (URL opcional)</Label>
            <Input id="logo" name="logo" type="url" value={form.logo} onChange={onChange} placeholder="https://..." />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Enviando..." : "Cadastrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}