"use client";

import { useState } from "react";
import Navbar from "@/components/navbar/navbar";
import OffersSidebar from "@/components/mercado/offers-sidebar";
import CriarOfertaForm from "@/components/mercado/criar-oferta-form";
import OfferPreview from "@/components/mercado/offer-preview";

export default function CriarOfertasPage() {
  const [oferta, setOferta] = useState({
    nomeProduto: "",
    categoria: "",
    descricao: "",
    precoNormal: "",
    precoOferta: "",
    imagemUrl: "",
    dataInicio: "",
    dataFim: "",
    quantidade: "",
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <OffersSidebar />
        <main className="flex-1 p-6">
          <div className="flex grap-2">
            <CriarOfertaForm oferta={oferta} setOferta={setOferta} />
            {/* <OfferPreview oferta={oferta} /> */}
          </div>
        </main>
      </div>
    </div>
  );
}

