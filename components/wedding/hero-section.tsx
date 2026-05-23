"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Heart } from "lucide-react"
import { IconHandFinger } from "@tabler/icons-react"
import { EnvelopeIntro } from "@/components/wedding/envelope-intro"
import { EnvelopeIntro2 } from "./envelope-intro-2"
import confetti from "canvas-confetti"

/** Aba superior abre (~1.35s) + pausa antes do fade */
const OPEN_MS = 100

export function HeroSection() {
  const [letterOpen, setLetterOpen] = useState(false)
  const [overlayGone, setOverlayGone] = useState(false)

  const handleOpenLetter = () => {
    if (letterOpen) return
    setLetterOpen(true)
    window.setTimeout(() => {
      setOverlayGone(true)
      /*       shootHearts() */
    }, OPEN_MS)
  }

  const revealSite = letterOpen && overlayGone

  const shootHearts = () => {
    const heart = confetti.shapeFromPath({
      path: "M167 72c19-38 37-48 58-48 50 0 74 54 74 87 0 78-72 111-132 167C107 222 35 189 35 111c0-33 24-87 74-87 21 0 39 10 58 48z",
    })

    confetti({
      origin: {
        x: 0.5,
        y: 0.3, // topo
      },
      particleCount: 300,
      spread: 350,
      startVelocity: 25,
      scalar: 2,
      shapes: [heart],
      colors: ["#9a9f00", "#00c354", "#636B2F"],
    })
  }

  return (
    <section className="relative min-h-[calc(100vh-70px)] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      {/* <button
        onClick={shootHearts}
        className="px-4 py-2 rounded bg-pink-500 text-white z-50"
      >
        Soltar corações
      </button> */}

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/photos/main.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      </div>

      {/* Content */}
      <div className="text-white flex flex-col z-50 items-center">{/* relative z-10 text-white px-4  max-w-4xl mx-auto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={
            revealSite
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 24 }
          }
          transition={{ duration: 1, delay: revealSite ? 0.15 : 0 }}
          className="space-y-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={revealSite ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: revealSite ? 0.35 : 0 }}
            className="text-sm md:text-base tracking-[0.3em] uppercase font-sans font-light mt-[90px] mb-[280px]"
          >
            Vamos nos casar
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={
            revealSite
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 24 }
          }
          transition={{ duration: 1, delay: revealSite ? 0.15 : 0 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={
              revealSite ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }
            }
            transition={{ duration: 0.8, delay: revealSite ? 0.5 : 0 }}
            className="text-center"
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide">
              Nathalia
            </h1>
            <div className="flex items-center justify-center gap-4 my-1">
              <span className="w-16 md:w-24 h-px bg-white/60" />
              <Heart className="w-5 h-5 text-white/80" fill="currentColor" />
              <span className="w-16 md:w-24 h-px bg-white/60" />
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide">
              David
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={revealSite ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, delay: revealSite ? 0.65 : 0 }}
            className="space-y-3 "
          >
            <p className="text-xl md:text-2xl font-serif italic font-light">
              {"\"O início do nosso para sempre\""}
            </p>
            <p className="text-lg md:text-xl tracking-[0.2em] font-light">
              18 de Julho de 2026
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {revealSite && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2 md:bottom-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-start justify-center rounded-full border-2 border-white/50 p-2"
          >
            <IconHandFinger stroke={2} className="text-white/70" />
          </motion.div>
        </motion.div>
      )}

      {/* Envelope — tela inicial */}
      <AnimatePresence>
        {!overlayGone && (
          <motion.div
            key="letter"
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <EnvelopeIntro2 onOpen={handleOpenLetter} /* letterOpen={letterOpen} onOpen={handleOpenLetter} */ />
          </motion.div>
        )}
      </AnimatePresence>
      {/*     <AnimatePresence>
        {!overlayGone && (
          <motion.div
            key="letter"
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-neutral-950 px-3"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="pointer-events-none max-w-xs text-center font-sans text-[11px] font-light uppercase tracking-[0.35em] text-neutral-400 md:text-xs">
              Toque no selo para abrir
            </p>

            <EnvelopeIntro letterOpen={letterOpen} onOpen={handleOpenLetter} />
          </motion.div>
        )}
      </AnimatePresence> */}
    </section>
  )
}
