"use client";

import { Save, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avaliacao } from "@/components/produto-individual/avaliacao";
import { Feedback } from "@/components/produto-individual/feedback";
import { HistoricoPreco } from "@/components/produto-individual/historico-preco";

export default function DetalhesProduto({ product }) {
  const handleSaveProduct = () => {
    const savedProducts = JSON.parse(localStorage.getItem('savedProducts')) || [];

    const productToSave = {
      id: product.id,
      name: product.name,
      image: product.image,
      url: window.location.href, 
    };

    const isProductSaved = savedProducts.some(p => p.id === productToSave.id);

    if (!isProductSaved) {
      const updatedProducts = [...savedProducts, productToSave];
      localStorage.setItem('savedProducts', JSON.stringify(updatedProducts));
      alert('Produto salvo com sucesso!');
    } else {
      alert('Este produto já está salvo.');
    }
  };

  const handleShareProduct = () => {
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        alert(`Link do produto copiado! ${currentUrl}`);
      })
      .catch((err) => {
        console.error("Erro ao copiar URL: ", err);
        alert("Não foi possível copiar a URL.");
      });
  };

  return (
    <div className="bg-white min-h-screen font-sans text-black">
      <main className="max-w-xl mx-auto p-6">
        <div className="flex justify-end gap-2 mb-8">
          <Button 
            variant="outline" 
            size="icon" 
            title="Salvar Produto"
            onClick={handleSaveProduct}
          >
            <Save className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            title="Compartilhar"
            onClick={handleShareProduct}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-center mb-6">
          <Card>
            <CardContent className="p-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-w-[300px] h-auto"
              />
            </CardContent>
          </Card>
        </div>
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl line-through text-gray-400">R$ {product.oldPrice.toFixed(2)}</span>
            <span className="text-2xl font-bold text-white bg-red-500 py-1 px-4 rounded-md">R$ {product.price.toFixed(2)}</span>
          </div>
        </div>
        
        <section id="historico-preco" className="my-8">
          <h2 className="text-xl font-semibold mb-4"></h2>
          <HistoricoPreco productId={product.id} />
        </section>
        <section id="feedback" className="my-8">
          <Feedback productId={product.id} />
        </section>
      </main>
    </div>
  );
}
