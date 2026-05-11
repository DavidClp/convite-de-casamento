"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Music, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    )
    audioRef.current.loop = true
    audioRef.current.volume = 0.3

    // Hide tooltip after 5 seconds
    const timer = setTimeout(() => {
      setShowTooltip(false)
    }, 5000)

    return () => {
      clearTimeout(timer)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay was prevented
        console.log("Autoplay prevented")
      })
    }
    setIsPlaying(!isPlaying)
    setShowTooltip(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-card border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap"
          >
            <p className="text-xs text-foreground flex items-center gap-2">
              <Music className="w-3 h-3 text-primary" />
              Toque para ouvir nossa música
            </p>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
              <div className="border-8 border-transparent border-l-card" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={toggleMusic}
        size="icon"
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isPlaying
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-card text-foreground border border-border hover:bg-muted"
        }`}
      >
        <motion.div
          animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </motion.div>
      </Button>
    </div>
  )
}
