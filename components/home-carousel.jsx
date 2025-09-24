"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import { useRef } from "react"
import Autoplay from "embla-carousel-autoplay"

export default function HomeCarousel() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))

  const slides = [
    "/slides/banner-principal.png",
    "/slides/slide-01.jpg",
    "/slides/slide-02.jpg",
    "/slides/slide-03.jpg",
    "/slides/slide-04.webp",
  ]

  return (
    <Carousel
      className="w-full max-w-[1200px] mx-auto"
      plugins={[plugin.current]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4">
            <div className="relative aspect-[16/9] md:aspect-[1200/340] overflow-hidden rounded-lg">
              <Image
                src={slide || "/placeholder.svg"}
                fill
                className="object-cover"
                alt={`Slide ${index + 1}`}
                priority={index === 0}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex -left-4 md:-left-6" />
      <CarouselNext className="hidden sm:flex -right-4 md:-right-6" />
    </Carousel>
  )
}
