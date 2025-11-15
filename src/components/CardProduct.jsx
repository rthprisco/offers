export default function CardProduct({
  img,
  title,
  price,
  promotion,
  market,
  index,
}) {
  return (
    <div
      className="hover:text-blue-600 shadow-sm flex max-w-52 cursor-pointer flex-col items-center gap-2 rounded-lg bg-white p-4 border border-gray-200 hover:shadow-md transition-all"
      key={index}
    >
      <img
        src={img || "/placeholder.svg"}
        alt={title}
        width={120}
        height={120}
        className="mb-2 object-contain h-20"
      />
      <h3 className="line-clamp-2 text-center text-sm font-medium">{title}</h3>
      <div className="flex w-full flex-col items-start gap-1">
        <span className="text-xs text-gray-500 line-through">
          R$ {parseFloat(price).toFixed(2)}
        </span>
        <span className="bg-red-600 rounded px-2 py-1 text-lg font-bold text-white">
          R$ {parseFloat(promotion).toFixed(2)}
        </span>
      </div>
      <div>
        <span className="text-xs text-gray-600">{market}</span>
      </div>
    </div>
  );
}
