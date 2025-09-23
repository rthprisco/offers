"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function SavedProductsPage() {
  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];
      setSavedProducts(storedProducts);
    }
  }, []);

  const handleRemoveProduct = (productId) => {
    const updatedProducts = savedProducts.filter(p => p.id !== productId);
    
    setSavedProducts(updatedProducts);
    localStorage.setItem('savedProducts', JSON.stringify(updatedProducts));
    alert('Produto removido com sucesso!');
  };

  return (
    <div className="bg-white min-h-screen font-sans text-black p-6">
      <main className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Meus Produtos Salvos</h1>
        
        {savedProducts.length === 0 ? (
          <p className="text-center text-gray-500">Você ainda não salvou nenhum produto.</p>
        ) : (
          <div className="space-y-4">
            {savedProducts.map((product) => (
              <Card key={product.id} className="flex items-center p-4 shadow-md">
                <Link href={product.url || '#'}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-20 h-20 object-contain mr-4"
                  />
                </Link>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  {product.url && (
                    <Link href={product.url} className="text-sm text-blue-600 hover:underline">
                      Ver produto
                    </Link>
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  title="Remover produto"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
