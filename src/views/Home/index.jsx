import { useEffect, useState } from "react";
import HomeCarousel from '../../components/Carousel';
import Categorias from '../../components/Categorias';
import CardProduct from '../../components/CardProduct';
import Pagination from "../../components/Pagination";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const itemsPerPage = 12;

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

  const categoriasList = [
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
  ];

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoria === selectedCategory)
    : products;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleSelectCategory = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setCurrentPage(1);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white flex flex-col items-center gap-6 md:gap-8 lg:gap-10 px-3 sm:px-4 md:px-6 lg:px-12 xl:px-24 py-6 md:py-10 lg:py-12 min-h-screen">
      <HomeCarousel />
      <Categorias
        categorias={categoriasList}
        onSelectCategory={handleSelectCategory}
        selectedCategory={selectedCategory}
      />

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">Ofertas da semana!</h2>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 lg:gap-5 xl:grid-cols-6 w-full auto-rows-max">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product, index) => (
            <CardProduct
              img={product.img}
              title={product.titulo}
              price={product.preco_original}
              promotionPrice={product.preco_promocional}
              promotion={product.promocao}
              market={product.mercado}
              key={`${currentPage}-${index}`}
              index={index}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </div>

      {filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
