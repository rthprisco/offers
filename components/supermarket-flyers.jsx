import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function SupermarketFlyers() {
  return (
    <div className="container mx-auto px-4 py-6 sm:py-10">
      <header className="mb-6 text-center sm:mb-10 sm:text-left">
        <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
          <ShoppingBag className="text-primary h-6 w-6" />
          <h1 className="text-2xl font-bold sm:text-4xl">
            Encartes de Supermercados
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl text-sm sm:text-base">
          Encontre as melhores ofertas e promoções dos supermercados da sua
          região
        </p>
      </header>
      <div className="grid grid-cols-2 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {supermarkets.map((supermarket) => (
          <SupermarketCard key={supermarket.id} supermarket={supermarket} />
        ))}
      </div>
    </div>
  );
}

function SupermarketCard({ supermarket }) {
  return (
    <Card className="group border-muted flex h-full flex-col overflow-hidden transition-all hover:shadow-md">
      <CardContent className="flex h-full flex-col p-0">
        <Link
          href={`/supermarket-flyers/${supermarket.id}`}
          className="flex flex-1 flex-col"
        >
          <div className="bg-muted/30 relative flex h-40 w-full items-center justify-center overflow-hidden sm:h-48">
            <div className="relative h-full w-full">
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
            <div className="absolute top-2 right-2"></div>
          </div>
          <div className="flex flex-1 flex-col p-3 sm:p-4">
            <h3 className="mb-1 line-clamp-1 text-base font-bold sm:text-lg">
              {supermarket.name}
            </h3>
            <div className="mb-3 flex items-center gap-1">
              <MapPin className="text-muted-foreground h-3 w-3" />
              <p className="text-muted-foreground line-clamp-1 text-xs">
                {supermarket.location}
              </p>
            </div>

            <div className="mt-auto flex flex-col items-center justify-between md:flex-row">
              <div className="text-muted-foreground flex items-center text-xs">
                <CalendarDays className="mr-1 h-3 w-3" />
                <span>Válido até {supermarket.validUntil}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary-red hover:text-primary-foreground hover:border-primary-red mt-4 h-auto px-3 py-1 text-xs font-medium md:mt-0"
              >
                Ver Encarte
              </Button>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
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
];
