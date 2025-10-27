import Image from "next/image";

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
      className="hover:text-primary-blue shadow-(--shadow-1) flex max-w-52 cursor-pointer flex-col items-center gap-2 rounded-lg bg-white p-4"
      key={index}
    >
      <Image
        src={img}
        alt={title}
        width={120}
        height={20}
        className="mb-2 object-contain"
      />
<<<<<<< HEAD
      <h3 className="line-clamp-2 text-center" href="http://localhost:3000/produto/1">{title}</h3>
=======
      <h3 className="line-clamp-2 text-center">{title}</h3>
>>>>>>> marcello
      <div className="flex w-full flex-col items-start">
        <span className="text-xs text-gray-500 line-through">
          R$ {price.toFixed(2)}
        </span>
        <span className="bg-primary-red rounded px-2 py-0 text-xl font-bold text-white">
          R$ {promotion.toFixed(2)}
        </span>
      </div>
      <div>
        <span className="text-xs text-gray-500">{market}</span>
      </div>
    </div>
  );
}
