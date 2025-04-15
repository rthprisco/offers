"use client";

import HomeCarousel from "@/components/carousel";
import Categorias from "@/components/categorias";
import CardProduct from "@/components/ui/card-product";

import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/produtos.json");
        if (!response.ok) {
          throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="bg-background flex flex-col items-center gap-6 md:gap-11 px-4 py-6 md:px-24 md:py-12">
      <HomeCarousel />
      <Categorias
        categorias={[
          { icon: "CupSoda", title: "Bebidas" },
          { icon: "Cookie", title: "Biscoitos" },
          { icon: "Beef", title: "Carnes" },
          { icon: "Wheat", title: "Cereais e farinhas" },
          { icon: "Snowflake", title: "Congelados" },
          { icon: "Milk", title: "Frios e laticínios" },
          { icon: "Apple", title: "Hortifruti" },
          { icon: "Pickaxe", title: "Limpeza" },
          { icon: "CakeSlice", title: "Matinais e sobremesas" },
          { icon: "Pizza", title: "Mercearia" },
          { icon: "Croissant", title: "Padaria" },
          { icon: "SprayCan", title: "Perfumaria e higiene" },
        ]}
      />

      <h2 className="text-2xl font-bold">Ofertas da semana!</h2>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 lg:gap-5 xl:grid-cols-6">
        {products.map((product, index) => (
          <CardProduct
            img={product.img}
            title={product.titulo}
            price={product.preco_original}
            promotion={product.promocao}
            market={product.mercado}
            key={index + 1}
          />
        ))}
      </div>
    </div>
  );
}
