import Image from "next/image";

export default function CardProduct({
  img,
  title,
  price,
  promotionPrice, // preço promocional
  promotion, // boolean
  market,
  index,
}) {
  // garante que os valores sejam números válidos
  const displayPrice = !isNaN(Number(price)) ? Number(price) : 0;
  const displayPromotion = promotion && !isNaN(Number(promotionPrice)) ? Number(promotionPrice) : null;

  return (
    <div
      className="hover:text-primary-blue shadow-(--shadow-1) flex max-w-52 cursor-pointer flex-col items-center gap-2 rounded-lg bg-white p-4"
      key={index}
    >
      <Image
        src={img || "https://via.placeholder.com/120x120"}
        alt={title || "Produto"}
        width={120}
        height={120}
        className="mb-2 object-contain"
      />
      <h3 className="line-clamp-2 text-center">{title || "Nome do Produto"}</h3>
      <div className="flex w-full flex-col items-start">
        {displayPromotion ? (
          <>
            <span className="text-xs text-gray-500 line-through">
              R$ {displayPrice.toFixed(2)}
            </span>
            <span className="bg-primary-red rounded px-2 py-0 text-xl font-bold text-white">
              R$ {displayPromotion.toFixed(2)}
            </span>
          </>
        ) : (
          <span className="text-xl font-bold">R$ {displayPrice.toFixed(2)}</span>
        )}
      </div>
      <div>
        <span className="text-xs text-gray-500">{market || ""}</span>
      </div>
    </div>
  );
}
