// "use client";

// import { Package, Tag, Calendar, ShoppingCart, Percent } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Image from "next/image";

// export default function OfferPreview({ oferta }) {
//   const { nomeProduto, categoria, descricao, precoNormal, precoOferta, imagemUrl, dataInicio, dataFim, quantidade } = oferta;

//   const desconto = precoNormal && precoOferta ? (((parseFloat(precoNormal) - parseFloat(precoOferta)) / parseFloat(precoNormal)) * 100).toFixed(0) : 0;

//   return (
//     <Card className="h-fit sticky top-4">
//       <CardHeader>
//         <CardTitle className="text-xl">Prévia da Oferta</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="relative w-full h-48 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
//           {imagemUrl ? (
//             <Image 
//               src={imagemUrl}
//               alt={nomeProduto || "Imagem do Produto"}
//               layout="fill"
//               objectFit="cover"
//               className="object-center"
//             />
//           ) : (
//             <Package size={48} className="text-gray-400" />
//           )}
//         </div>

//         <h3 className="text-2xl font-bold text-gray-800">{nomeProduto || "Nome do Produto"}</h3>
        
//         <div className="flex items-center gap-2">
//           {categoria && (
//             <Badge className="bg-blue-100 text-blue-800 flex items-center gap-1">
//               <Tag size={12} />
//               {categoria}
//             </Badge>
//           )}
//           {desconto > 0 && (
//             <Badge className="bg-purple-100 text-purple-800 flex items-center gap-1">
//               <Percent size={12} />
//               {desconto}% OFF
//             </Badge>
//           )}
//         </div>

//         <p className="text-gray-600 text-sm">{descricao || "Descrição detalhada da oferta..."}</p>

//         <div className="flex items-baseline gap-2">
//           {precoNormal && (
//             <span className="text-lg text-gray-500 line-through">
//               R$ {parseFloat(precoNormal).toFixed(2)}
//             </span>
//           )}
//           {precoOferta && (
//             <span className="text-3xl font-bold text-green-600">
//               R$ {parseFloat(precoOferta).toFixed(2)}
//             </span>
//           )}
//           {!precoNormal && !precoOferta && (
//             <span className="text-3xl font-bold text-green-600">R$ 0,00</span>
//           )}
//         </div>

//         <div className="text-sm text-gray-500 space-y-1">
//           {(dataInicio || dataFim) && (
//             <div className="flex items-center gap-1">
//               <Calendar size={14} />
//               <span>
//                 Válido de {dataInicio || "DD/MM/AAAA"} a {dataFim || "DD/MM/AAAA"}
//               </span>
//             </div>
//           )}
//           {quantidade && (
//             <div className="flex items-center gap-1">
//               <ShoppingCart size={14} />
//               <span>{quantidade} unidades disponíveis</span>
//             </div>
//           )}
//         </div>

//         <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
//           Aproveitar Oferta
//         </button>
//       </CardContent>
//     </Card>
//   );
// }


