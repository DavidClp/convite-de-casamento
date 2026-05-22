"use client"

import { motion } from "framer-motion"

const PAPER = "#d4c9bb"

const foldShadow = {
  bottom:
    "inset 0 14px 28px rgba(0,0,0,0.11), inset 14px 0 18px rgba(0,0,0,0.05), inset -14px 0 18px rgba(0,0,0,0.05)",
  left: "inset 14px 0 24px rgba(0,0,0,0.1), inset 0 12px 16px rgba(0,0,0,0.04), inset 0 -12px 16px rgba(0,0,0,0.04)",
  right:
    "inset -14px 0 24px rgba(0,0,0,0.1), inset 0 12px 16px rgba(0,0,0,0.04), inset 0 -12px 16px rgba(0,0,0,0.04)",
  top: "inset 0 -14px 28px rgba(0,0,0,0.11), inset 14px 0 18px rgba(0,0,0,0.05), inset -14px 0 18px rgba(0,0,0,0.05)",
}

const PAPER_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`

type EnvelopeIntroProps = {
  letterOpen: boolean
  onOpen: () => void
}

export function EnvelopeIntro({ letterOpen, onOpen }: EnvelopeIntroProps) {
  return (
    <motion.div
      className="relative w-[min(96vw,720px)] shrink-0 [perspective:1200px]"
      style={{ aspectRatio: "500 / 360" }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-md shadow-[0_28px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
        {/* Base */}
        <div
          className="absolute inset-0 rounded-md"
          style={{ backgroundColor: PAPER }}
          aria-hidden
        />

        {/* Textura */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-md opacity-[0.4] mix-blend-multiply"
          style={{ backgroundImage: PAPER_TEXTURE }}
          aria-hidden
        />

        {/* Aba inferior */}
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{
            backgroundColor: PAPER,
            clipPath: "polygon(0% 100%, 50% 50%, 100% 100%)",
            boxShadow: foldShadow.bottom,
          }}
          aria-hidden
        />

        {/* Aba esquerda */}
        <motion.div
          className="absolute inset-0 z-[2]"
          style={{
            backgroundColor: PAPER,
            clipPath: "polygon(0% 0%, 0% 100%, 50% 50%)",
            boxShadow: foldShadow.left,
          }}
          aria-hidden
        />

        {/* Aba direita */}
        <motion.div
          className="absolute inset-0 z-[3]"
          style={{
            backgroundColor: PAPER,
            clipPath: "polygon(100% 0%, 100% 100%, 50% 50%)",
            boxShadow: foldShadow.right,
          }}
          aria-hidden
        />

        {/* Dobras em X */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[4]"
          style={{
            background: `
              linear-gradient(135deg, transparent calc(50% - 0.5px), rgba(0,0,0,0.14) 50%, transparent calc(50% + 0.5px)),
              linear-gradient(45deg, transparent calc(50% - 0.5px), rgba(0,0,0,0.14) 50%, transparent calc(50% + 0.5px))
            `,
          }}
          aria-hidden
        />

        {/* Aba superior — única que abre */}
        <motion.div
          role="button"
          tabIndex={0}
          aria-label="Abrir convite"
          onClick={onOpen}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              onOpen()
            }
          }}
          className={`absolute inset-0 z-[5] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-red-800/40 focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950 ${letterOpen ? "pointer-events-none" : ""}`}
          style={{
            transformOrigin: "50% 0%",
            transformStyle: "preserve-3d",
          }}
          initial={false}
          animate={{ rotateX: letterOpen ? -168 : 0 }}
          transition={{
            duration: 1.35,
            ease: [0.33, 1, 0.38, 1],
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: PAPER,
              clipPath: "polygon(0% 0%, 100% 0%, 50% 50%)",
              backfaceVisibility: "hidden",
              boxShadow: foldShadow.top,
            }}
            aria-hidden
          />

          {/* Selo — sobe com a aba */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2">
            <span
              className="flex h-[6.5rem] w-[6.5rem] items-center justify-center md:h-28 md:w-28"
              style={{
                borderRadius: "48% 52% 47% 53% / 52% 48% 52% 48%",
                background:
                  "radial-gradient(ellipse 80% 70% at 32% 28%, #d42a2a 0%, #a81818 42%, #7a0f0f 100%)",
                boxShadow:
                  "0 12px 32px rgba(0,0,0,0.45), 0 2px 8px rgba(0,0,0,0.25), inset 0 3px 8px rgba(255,255,255,0.25), inset 0 -8px 18px rgba(0,0,0,0.35), inset 0 0 0 3px rgba(120,15,15,0.5), inset 0 0 0 6px rgba(180,30,30,0.2)",
              }}
            >
              <span
                className="absolute inset-[11px] rounded-full border border-white/20"
                aria-hidden
              />
              <span className="relative flex items-baseline gap-1.5 font-serif text-2xl font-medium tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] md:text-[1.65rem]">
                <span>N</span>
                <span className="text-lg font-normal opacity-95 md:text-xl">&</span>
                <span>D</span>
              </span>
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
