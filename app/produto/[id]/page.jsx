import { notFound } from 'next/navigation';
import DetalhesProduto from '@/components/produto-individual/detalhes-produto';

export default async function ProductPage({ params }) {
  const { id } = await params;
  const idAsNumber = parseInt(id);

  const res = await fetch(`http://localhost:3000/produtos.json`);
  const allProducts = await res.json();
  const product = allProducts[idAsNumber];

  if (!product) {
    notFound();
  }

  const productData = {
    id: idAsNumber,
    name: product.titulo,
    image: product.img,
    oldPrice: product.preco_original,
    price: product.promocao,
  };

  return (
    <DetalhesProduto product={productData} />
  );
}