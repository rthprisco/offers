import LoginFormMercado from '@/components/mercado/login-form';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LoginMercadoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md mx-auto relative">
        <Link 
          href="/" 
          className="absolute -top-16 left-0 flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        
        <LoginFormMercado />
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Login do Mercado - Offers',
  description: 'Faça login na sua conta de mercado',
};

