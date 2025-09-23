export const runtime = "nodejs"
import Link from "next/link"
import Image from "next/image"

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
      // Sample highlights data
      { id: 1, title: "Product 1", image: "/encartes/1.png", price: 10.99, originalPrice: 19.99, discount: 45 },
      { id: 2, title: "Product 2", image: "/encartes/2.png", price: 5.49, discount: 20 },
    ],
    name: "Sample Supermarket",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Link
            href="/supermarket-flyers"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <span className="mr-2">←</span>
            Voltar para todos os encartes
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-gray-600 mb-8 text-center">{supermarket.description}</p>

          <Tabs defaultValue="pages" className="mb-8">
            <TabsContent value="pages" className="mt-6">
              <div className="grid grid-cols-2 gap-4 sm:gap-6 justify-items-center max-w-4xl mx-auto">
                {supermarket.pages.map((page, index) => (
                  <div
                    key={index}
                    className="relative aspect-[3/4] w-full max-w-[320px] sm:max-w-[380px] rounded-lg overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 bg-white"
                  >
                    <Image
                      src={page || "/encartes/1.png"}
                      alt={`Página ${index + 1} do encarte ${supermarket.name}`}
                      fill
                      className="object-contain bg-white"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      Página {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="highlights" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
                {supermarket.highlights.map((offer) => (
                  <div
                    key={offer.id}
                    className="border rounded-lg overflow-hidden w-full max-w-[240px] shadow-sm hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="relative h-32 w-full">
                      <Image src={offer.image || "/encartes/1.png"} alt={offer.title} fill className="object-cover" />
                      {offer.discount && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md font-bold text-xs">
                          -{offer.discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm line-clamp-1">{offer.title}</h3>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-base font-bold text-green-600">R$ {offer.price.toFixed(2)}</span>
                        {offer.originalPrice && (
                          <span className="text-xs text-gray-500 line-through">
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
      </div>
    </div>
  )
}
