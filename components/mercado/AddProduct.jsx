'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import CardProduct from '@/components/ui/card-product';

export default function AddProduct({ mercadoId, onProductAdded }) {
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    description: '',
    original_price: '',
    promotion_price: '',
    promotion: false,
    category: '',
    otherCategory: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    
    
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value,
    }));


    if (id === 'category') {
      if (value === 'Outro') {
        setShowOtherInput(true);
      } else {
        setShowOtherInput(false);
        setFormData((prev) => ({ ...prev, otherCategory: '' }));
      }
    }
  };

  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({ ...prev, promotion: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalCategory = formData.category;
    if (formData.category === 'Outro') {
      finalCategory = formData.otherCategory;
    }

    if (!formData.title || !formData.original_price || !finalCategory) {
      toast.error('Por favor, preencha os campos obrigatórios.');
      return;
    }

    if (formData.promotion && !formData.promotion_price) {
      toast.error('Informe o preço de promoção.');
      return;
    }

    setIsLoading(true);

    const productData = {
      mercadoId,
      titulo: formData.title,
      descricao: formData.description,
      preco_original: parseFloat(formData.original_price),
      preco_promocao: formData.promotion ? parseFloat(formData.promotion_price) : null,
      promocao: formData.promotion,
      categoria: finalCategory,
      img: formData.image,
    };

    try {
      const res = await fetch('/api/mercado/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        toast.success('Produto adicionado com sucesso!');
        setFormData({
          image: '',
          title: '',
          description: '',
          original_price: '',
          promotion_price: '',
          promotion: false,
          category: '',
          otherCategory: '',
        });
        setShowOtherInput(false);
        onProductAdded();
      } else {
        const errorData = await res.json();
        toast.error(`Erro: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Erro ao adicionar produto', err);
      toast.error('Ocorreu um erro ao adicionar o produto.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="image" className="block text-sm font-medium">
            URL da Imagem
          </Label>
          <Input
            id="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            placeholder="Ex: https://img.site.com/produto.jpg"
          />
        </div>
        <div>
          <Label htmlFor="title" className="block text-sm font-medium">
            Título do Produto <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Pão Bisnaguinha Tradicional"
            required
          />
        </div>
        <div>
          <Label htmlFor="description" className="block text-sm font-medium">
            Descrição (Opcional)
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ex: Embalagem de 300g"
          />
        </div>
        <div>
          <Label htmlFor="category" className="block text-sm font-medium">
            Categoria <span className="text-red-500">*</span>
          </Label>
          <select
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
          >
            <option value="" disabled>Selecione uma categoria</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Biscoitos">Biscoitos</option>
            <option value="Carnes">Carnes</option>
            <option value="Cereais e farinhas">Cereais e farinhas</option>
            <option value="Congelados">Congelados</option>
            <option value="Frios e laticínios">Frios e laticínios</option>
            <option value="Hortifruti">Hortifruti</option>
            <option value="Limpeza">Limpeza</option>
            <option value="Matinais e sobremesas">Matinais e sobremesas</option>
            <option value="Mercearia">Mercearia</option>
            <option value="Padaria">Padaria</option>
            <option value="Perfumaria e higiene">Perfumaria e higiene</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        
        {showOtherInput && (
          <div className="mt-4">
            <Label htmlFor="otherCategory" className="block text-sm font-medium">
              Qual? <span className="text-red-500">*</span>
            </Label>
            <Input
              id="otherCategory"
              type="text"
              value={formData.otherCategory}
              onChange={handleChange}
              placeholder="Ex: Utilidades domésticas"
              required
            />
          </div>
        )}

      </div>
      <div className="space-y-4">
        <div>
          <Label htmlFor="original_price" className="block text-sm font-medium">
            Preço Original <span className="text-red-500">*</span>
          </Label>
          <Input
            id="original_price"
            type="number"
            step="0.01"
            value={formData.original_price}
            onChange={handleChange}
            placeholder="Ex: 7.99"
            required
          />
        </div>
        <div className="flex items-center justify-between gap-4 py-2">
          <Label htmlFor="promotion" className="flex items-center gap-2 font-medium">
            <Switch
              id="promotion"
              checked={formData.promotion}
              onCheckedChange={handleSwitchChange}
            />
            Oferta em Promoção
          </Label>
        </div>
        {formData.promotion && (
          <div>
            <Label htmlFor="promotion_price" className="block text-sm font-medium">
              Preço de Promoção <span className="text-red-500">*</span>
            </Label>
            <Input
              id="promotion_price"
              type="number"
              step="0.01"
              value={formData.promotion_price}
              onChange={handleChange}
              placeholder="Ex: 6.99"
              required
            />
          </div>
        )}
        <div className="relative mt-4 p-4 border rounded-md bg-gray-50 flex flex-col items-center">
          <h4 className="font-semibold mb-2">Pré-visualização</h4>
          <CardProduct
            img={formData.image || 'https://via.placeholder.com/150'}
            title={formData.title || 'Nome do Produto'}
            price={parseFloat(formData.promotion ? formData.promotion_price : formData.original_price)}
            market={''}
            promotion={formData.promotion}
          />
          <small className="text-gray-500 mt-2">
            O nome do mercado será adicionado automaticamente.
          </small>
        </div>
      </div>
      <div className="md:col-span-2 flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Adicionando...' : 'Adicionar Oferta'}
        </Button>
      </div>
    </form>
  );
}
