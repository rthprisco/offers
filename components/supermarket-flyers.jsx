import Link from "next/link"
import Image from "next/image"
import { CalendarDays, MapPin, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SupermarketFlyers() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <header className="mb-6 sm:mb-10 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <h1 className="text-2xl sm:text-4xl font-bold">Encartes de Supermercados</h1>
        </div>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
          Encontre as melhores ofertas e promoções dos supermercados da sua região
        </p>
      </header>
      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {supermarkets.map((supermarket) => (
          <SupermarketCard key={supermarket.id} supermarket={supermarket} />
        ))}
      </div>
    </div>
  )
}

function SupermarketCard({ supermarket }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group border-muted h-full flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
        <Link href={`/supermarket-flyers/${supermarket.id}`} className="block flex-1 flex flex-col">
          <div className="relative h-40 sm:h-48 w-full bg-muted/30 flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={supermarket.image || "/placeholder.svg"}
                alt={supermarket.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain"
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                }}
              />
            </div>
            <div className="absolute top-2 right-2">
            </div>
          </div>
          <div className="p-3 sm:p-4 flex-1 flex flex-col">
            <h3 className="text-base sm:text-lg font-bold line-clamp-1 mb-1">{supermarket.name}</h3>
            <div className="flex items-center gap-1 mb-3">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <p className="text-xs text-muted-foreground line-clamp-1">{supermarket.location}</p>
            </div>

            <div className="flex justify-between items-center mt-auto">
              <div className="flex items-center text-xs text-muted-foreground">
                <CalendarDays className="h-3 w-3 mr-1" />
                <span>Válido até {supermarket.validUntil}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-medium px-3 py-1 h-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Ver Encarte
              </Button>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  )
}

const supermarkets = [
  {
    id: 1,
    name: "Brand SuperMarket",
    image: "/logos/1.avif?height=300&width=400",
    validUntil: "15/04/2025",
    location: "Barra Mansa, RJ",
  },
  {
    id: 2,
    name: "Family Supermarket",
    image: "/logos/2.avif?height=300&width=400",
    validUntil: "20/04/2025",
    location: "Barra Mansa, RJ",
  },
  {
    id: 3,
    name: "Supermarket",
    image: "/logos/3.avif?height=300&width=400",
    validUntil: "18/04/2025",
    location: "Barra Mansa, RJ",
  },
  {
    id: 4,
    name: "Vegan Supermarket",
    image: "/logos/4.avif?height=300&width=400",
    validUntil: "25/04/2025",
    location: "Barra Mansa, RJ",
  },
  {
    id: 5,
    name: "Bestmarket",
    image: "/logos/5.avif?height=300&width=400",
    validUntil: "12/04/2025",
    location: "Barra Mansa, RJ",
  },
  {
    id: 6,
    name: "Newmarket",
    image: "/logos/6.avif?height=300&width=400",
    validUntil: "30/04/2025",
    location: "Barra Mansa, RJ",
  },
  {
    id: 7,
    name: "Freshmarket",
    image: "/logos/7.avif?height=300&width=400",
    validUntil: "22/04/2025",
    location: "Barra Mansa, RJ",
  },
  {
    id: 8,
    name: "Supermarket Aidi",
    image: "/logos/8.avif?height=300&width=400",
    validUntil: "16/04/2025",
    location: "Barra Mansa, RJ",
  },
]
