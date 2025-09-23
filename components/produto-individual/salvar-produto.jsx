"use client";
import { useState } from "react";

export function SalvarProduto({ userId, productId }) {
  const [favoriteId, setFavoriteId] = useState(null);

  const salvar = async () => {
    const res = await fetch("/api/favorites", {
      method: "POST",
      body: JSON.stringify({ userId, productId }),
      headers: { "Content-Type": "application/json" },
    });
    const fav = await res.json();
    setFavoriteId(fav.id);
  };

  const remover = async () => {
    await fetch(`/api/favorites?id=${favoriteId}`, { method: "DELETE" });
    setFavoriteId(null);
  };

  return (
    <div>
      {favoriteId ? (
        <button onClick={remover} className="bg-red-500 text-white px-4 py-2 rounded">
          Remover dos Favoritos
        </button>
      ) : (
        <button onClick={salvar} className="bg-green-500 text-white px-4 py-2 rounded">
          Salvar Produto
        </button>
      )}
    </div>
  );
}
