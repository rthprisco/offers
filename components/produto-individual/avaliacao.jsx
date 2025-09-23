"use client";
import { useState, useEffect } from "react";

export function Avaliacao({ productId }) {
  const [rating, setRating] = useState(0);
  const [media, setMedia] = useState(0);
  const [isSending, setIsSending] = useState(false); 

  useEffect(() => {
    fetch(`/api/avaliacao?productId=${productId}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          const avg = data.reduce((acc, item) => acc + item.rating, 0) / data.length;
          setMedia(avg.toFixed(1));
        }
      });
  }, [productId]);

  const enviarAvaliacao = async (valor) => {
    const novoRating = valor === rating ? 0 : valor;
    
    setRating(novoRating);
    setIsSending(true); 

    try {
      await fetch("/api/avaliacao", {
        method: "POST",
        body: JSON.stringify({ productId, rating: novoRating }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
    } finally {
      setIsSending(false); 
    }
  };

  return (
    <div className="my-4">
      <h2 className="font-semibold mb-2">Avalie este produto:</h2>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => enviarAvaliacao(star)}
            className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
            disabled={isSending} 
          >
            ★
          </button>
        ))}
      </div>
      {media > 0 && <p className="mt-2 text-sm">Média: {media} estrelas</p>}
    </div>
  );
}