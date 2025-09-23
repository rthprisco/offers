"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginFormMercado() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
try {
  const res = await fetch("/api/mercado/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, senha }),
  });
  if (!res.ok) {
    const { error } = await res.json();
    toast.error(error || "Erro ao fazer login");
    return;
  }
  const data = await res.json();
  localStorage.setItem("mercado_data", JSON.stringify(data));
  toast.success("Login realizado!");
} catch {
  toast.error("Erro de rede");
}

  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login do Mercado</CardTitle>
        <CardDescription>Entre para gerenciar suas ofertas</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="senha">Senha</Label>
            <Input id="senha" type="password" value={senha} onChange={(e)=>setSenha(e.target.value)} required />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}