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
      className="w-full max-w-full px-4 sm:max-w-[1200px] mx-auto"
      plugins={[plugin.current]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="ml-0">
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="pl-0">
            <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[1200/340] overflow-hidden rounded-lg mx-2 sm:mx-0">
              <Image
                src={slide || "/placeholder.svg"}
                fill
                className="object-cover"
                alt={`Slide ${index + 1}`}
                priority={index === 0}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
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