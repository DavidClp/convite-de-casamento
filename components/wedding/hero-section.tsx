"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToRSVP = () => {
    const element = document.getElementById("rsvp")
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-base tracking-[0.3em] uppercase font-sans font-light"
          >
            Vamos nos casar
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide">
              Marina
            </h1>
            <div className="flex items-center justify-center gap-4 my-4">
              <span className="w-16 md:w-24 h-px bg-white/60" />
              <Heart className="w-5 h-5 text-white/80" fill="currentColor" />
              <span className="w-16 md:w-24 h-px bg-white/60" />
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide">
              Rafael
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-4 pt-6"
          >
            <p className="text-xl md:text-2xl font-serif italic font-light">
              {"\"O amor é a poesia dos sentidos\""}
            </p>
            <p className="text-lg md:text-xl tracking-[0.2em] font-light">
              15 de Março de 2025
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pt-8"
          >
            <Button
              onClick={scrollToRSVP}
              size="lg"
              className="bg-white/20 backdrop-blur-sm border border-white/40 text-white hover:bg-white/30 hover:border-white/60 transition-all duration-300 px-8 py-6 text-sm tracking-[0.2em] uppercase font-light"
            >
              Confirmar Presença
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-white/70 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
