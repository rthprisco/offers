'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMercadoToken, getMercadoData } from '@/lib/mercado-auth';

export default function ProtectedRouteMercado({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getMercadoToken();
    const mercadoData = getMercadoData();

    if (!token || !mercadoData) {
      router.push('/mercado/login');
      return;
    }

    setIsAuthenticated(true);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}

