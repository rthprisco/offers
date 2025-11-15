'use client';

import HomeCarousel from '../../components/Carousel';
import Categorias from '../../components/Categorias';
import CardProduct from '../../components/CardProduct';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/produtos.json');
        if (!response.ok) {
          throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    }

    fetchProducts();
  }, []);

  const categorias = [
    { icon: 'CupSoda', title: 'Bebidas' },
    { icon: 'Cookie', title: 'Biscoitos' },
    { icon: 'Beef', title: 'Carnes' },
    { icon: 'Wheat', title: 'Cereais e farinhas' },
    { icon: 'Snowflake', title: 'Congelados' },
    { icon: 'Milk', title: 'Frios e laticínios' },
    { icon: 'Apple', title: 'Hortifruti' },
    { icon: 'Pickaxe', title: 'Limpeza' },
    { icon: 'CakeSlice', title: 'Matinais e sobremesas' },
    { icon: 'Pizza', title: 'Mercearia' },
    { icon: 'Croissant', title: 'Padaria' },
    { icon: 'SprayCan', title: 'Perfumaria e higiene' },
  ];

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoria === selectedCategory)
    : products;

  return (
    <div className="bg-white flex flex-col items-center gap-11 px-4 py-6 md:px-24 md:py-12">
      <HomeCarousel />
      <Categorias
        categorias={categorias}
        onCategorySelect={setSelectedCategory}
      />

      <h2 className="text-2xl font-bold">
        {selectedCategory ? `${selectedCategory}` : 'Ofertas da semana!'}
      </h2>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 lg:gap-5 xl:grid-cols-6 w-full">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <CardProduct
              img={product.img}
              title={product.titulo}
              price={product.preco_original}
              promotion={product.promocao}
              market={product.mercado}
              key={index}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p className="text-lg">Nenhum produto encontrado nesta categoria</p>
          </div>
        )}
      </div>
    </div>
  );
}
