export const runtime = "nodejs";
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

import { Tabs, TabsContent } from "@/components/ui/tabs"

export default function SupermarketDetail({ params }) {

  const supermarket = {
    id: Number.parseInt(params.id),
    pages: [
      "/encartes/1.png?height=800&width=600",
      "/encartes/2.png?height=800&width=600",
      "/encartes/3.png?height=800&width=600",
      "/encartes/4.png?height=800&width=600",
    ],
    highlights: [
    ]
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="mb-3 sm:mb-6">
        <Link
          href="/supermarket-flyers"
          className="inline-flex items-center text-xs sm:text-sm font-medium">
          <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Voltar para todos os encartes
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mb-4 sm:mb-8">
        <div className="lg:col-span-2">
          
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-8">{supermarket.description}</p>

          <Tabs defaultValue="pages" className="mb-4 sm:mb-8">

            <TabsContent value="pages" className="mt-3 sm:mt-6">
              <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-2 sm:gap-4">
                {supermarket.pages.map((page, index) => (
                  <div
                    key={index}
                    className="relative aspect-[3/4] rounded-lg overflow-hidden border">
                    <Image
                      src={page || "/encartes/1.png"}
                      alt={`Página ${index + 1} do encarte ${supermarket.name}`}
                      fill
                      className="object-contain" />
                    <div
                      className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      Página {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="highlights" className="mt-3 sm:mt-6">
              <div
                className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                {supermarket.highlights.map((offer) => (
                  <div key={offer.id} className="border rounded-lg overflow-hidden">
                    <div className="relative h-32 sm:h-40 w-full">
                      <Image
                        src={offer.image || "/encartes/1.png"}
                        alt={offer.title}
                        fill
                        className="object-cover" />
                      {offer.discount && (
                        <div
                          className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md font-bold text-xs sm:text-sm">
                          -{offer.discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-medium text-sm sm:text-base line-clamp-1">{offer.title}</h3>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-base sm:text-lg font-bold text-green-600">
                          R$ {offer.price.toFixed(2)}
                        </span>
                        {offer.originalPrice && (
                          <span className="text-xs sm:text-sm text-muted-foreground line-through">
                            R$ {offer.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="lg:col-span-1">
        </div>
      </div>
    </div>
  );
}
