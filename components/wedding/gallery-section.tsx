"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const galleryImages = [
  {
    src: "/photos/gallery/1.webp",
    alt: "Casal em momento romântico",
  },
  {
    src: "/photos/gallery/2.webp",
    alt: "Casal no pôr do sol",
  },
  {
    src: "/photos/gallery/3.webp",
    alt: "Momento especial do casal",
  },
  {
    src: "/photos/gallery/4.webp",
    alt: "Casal feliz",
  },
  {
    src: "/photos/gallery/5.webp",
    alt: "Casal caminhando juntos",
  },
  {
    src: "/photos/gallery/6.webp",
    alt: "Casal caminhando juntos",
  },
  {
    src: "/photos/gallery/7.webp",
    alt: "Casal caminhando juntos",
  },
  {
    src: "/photos/gallery/8.webp",
    alt: "Casal caminhando juntos",
  },
  {
    src: "/photos/gallery/9.webp",
    alt: "Casal caminhando juntos",
  },
]

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2500, stopOnInteraction: false }),
  ])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      if (e.key === "Escape") setSelectedImage(null)
      if (e.key === "ArrowLeft")
        setSelectedImage((prev) =>
          prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
        )
      if (e.key === "ArrowRight")
        setSelectedImage((prev) =>
          prev !== null ? (prev + 1) % galleryImages.length : null
        )
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedImage])

  return (
    <section className="pb-20 md:py-32  bg-background"> {/* bg-muted/50 */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-light">
            Nosso pré-wedding
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Galeria do Casal
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-lg" ref={emblaRef}>
            <div className="flex">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-2"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer group"
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full shadow-lg"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full shadow-lg"
            onClick={scrollNext}
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(
                  (prev) =>
                    (prev! - 1 + galleryImages.length) % galleryImages.length
                )
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(
                  (prev) => (prev! + 1) % galleryImages.length
                )
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
