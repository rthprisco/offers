'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Eye, EyeOff, Store } from 'lucide-react';

export default function LoginFormMercado() {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Buscar mercado no localStorage
      const existingMercados = JSON.parse(localStorage.getItem('mercados') || '[]');
      const mercado = existingMercados.find(m => m.email === formData.email);
      
      if (!mercado) {
        toast.error('Credenciais inválidas');
        setIsLoading(false);
        return;
      }
      
      // Verificar senha
      const encoder = new TextEncoder();
      const data = encoder.encode(formData.senha);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashedPassword = Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      if (hashedPassword !== mercado.senha) {
        toast.error('Credenciais inválidas');
        setIsLoading(false);
        return;
      }
      
      // Salvar dados do mercado na sessão
      const { senha, ...mercadoWithoutPassword } = mercado;
      localStorage.setItem('mercado_data', JSON.stringify(mercadoWithoutPassword));
      localStorage.setItem('user_type', 'mercado');
      localStorage.setItem('mercado_token', `mercado_${mercado.id}_${Date.now()}`);
      
      toast.success('Login realizado com sucesso!');
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Erro ao processar login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Store className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Login do Mercado</CardTitle>
          <CardDescription className="text-center">
            Entre com suas credenciais para acessar o painel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <div className="relative">
                <Input
                  id="senha"
                  name="senha"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{' '}
              <button
                onClick={() => router.push('/mercado/cadastro')}
                className="text-blue-600 hover:underline font-medium"
                disabled={isLoading}
              >
                Cadastre-se aqui
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
  );
}

