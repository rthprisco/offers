import RegisterFormMercado from '@/components/mercado/register-form';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CadastroMercadoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="w-full max-w-2xl mx-auto relative">
        <Link 
          href="/" 
          className="absolute -top-16 left-0 flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        
        <RegisterFormMercado />
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Cadastro do Mercado - Offers',
  description: 'Cadastre seu mercado na plataforma',
};

