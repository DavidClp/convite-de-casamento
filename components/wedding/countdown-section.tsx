"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { IconHandFinger } from "@tabler/icons-react"

const WEDDING_DATE = new Date("2026-07-18T16:30:00")

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(): TimeLeft {
  const difference = WEDDING_DATE.getTime() - new Date().getTime()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function CountdownCard({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      <div className="w-18 h-18 md:w-28 md:h-28 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 flex items-center justify-center shadow-lg">
        <span className="text-3xl md:text-5xl font-serif text-foreground">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="mt-3 text-[10px] md:text-sm uppercase tracking-[0.2em] text-muted-foreground font-light">
        {label}
      </span>
    </motion.div>
  )
}

export function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section className="pt-20 pb-15 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-light">
            Contagem Regressiva
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Falta pouco para o grande dia
          </h2>
        </motion.div>
        <div className="flex justify-center gap-4 md:gap-8">
          <CountdownCard value={timeLeft.days} label="Dias" />
          <CountdownCard value={timeLeft.hours} label="Horas" />
          <CountdownCard value={timeLeft.minutes} label="Minutos" />
          <CountdownCard value={timeLeft.seconds} label="Segundos" />
        </div>
      </div>
    </section>
  )
}
