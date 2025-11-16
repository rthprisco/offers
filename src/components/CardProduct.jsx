import { Heart, ShoppingCart } from 'lucide-react';
import { useState } from "react";

export default function CardProduct({
  img,
  title,
  price,
  promotionPrice,
  promotion,
  market,
  index,
}) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const displayPrice = !isNaN(Number(price)) ? Number(price) : 0;
  const displayPromotion = promotion && !isNaN(Number(promotionPrice)) ? Number(promotionPrice) : null;
  const discount = displayPromotion ? Math.round(((displayPrice - displayPromotion) / displayPrice) * 100) : 0;

  return (
    <div
      className="flex flex-col items-center gap-2 rounded-xl bg-white p-3 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full"
      key={index}
    >
      <div className="relative w-full">
        <img
          src={img || "https://via.placeholder.com/120x120"}
          alt={title || "Produto"}
          className="w-full h-24 sm:h-28 object-contain"
        />
        {discount > 0 && (
          <div className="absolute top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
            -{discount}%
          </div>
        )}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-1 left-1 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Adicionar aos favoritos"
        >
          <Heart
            size={16}
            className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        </button>
      </div>

      <h3 className="line-clamp-2 text-center text-xs sm:text-sm font-medium text-gray-800 w-full">
        {title || "Nome do Produto"}
      </h3>

      <div className="flex flex-col items-center gap-1 w-full">
        {displayPromotion ? (
          <>
            <span className="text-xs text-gray-400 line-through">
              R$ {displayPrice.toFixed(2)}
            </span>
            <span className="text-base sm:text-lg font-bold text-red-600">
              R$ {displayPromotion.toFixed(2)}
            </span>
          </>
        ) : (
          <span className="text-base sm:text-lg font-bold text-gray-900">
            R$ {displayPrice.toFixed(2)}
          </span>
        )}
      </div>

      {market && (
        <span className="text-xs text-gray-500 text-center line-clamp-1">{market}</span>
      )}

      <button className="w-full mt-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm py-2 rounded-lg transition-colors font-medium">
        <ShoppingCart size={16} />
        Adicionar
      </button>
    </div>
  );
}
