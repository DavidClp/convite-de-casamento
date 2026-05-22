"use client"

import { useState, useRef, useEffect, useId } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Music, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

const WEDDING_VIDEO_ID = "buPMuhzQwJI"

type YTPlayerInstance = {
  playVideo: () => void
  pauseVideo: () => void
  setVolume: (volume: number) => void
  destroy: () => void
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLElement | string,
        options: {
          height?: string | number
          width?: string | number
          videoId?: string
          playerVars?: Record<string, string | number>
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void
            onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void
          }
        }
      ) => YTPlayerInstance
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

function ensureYouTubeIframeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve()

  if (window.YT?.Player) return Promise.resolve()

  return new Promise((resolve) => {
    const done = () => resolve()
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      done()
    }

    if (document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      return
    }

    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    document.head.appendChild(tag)
  })
}

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTooltip, setShowTooltip] = useState(true)
  const playerRef = useRef<YTPlayerInstance | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const playerReadyRef = useRef(false)
  const containerId = useId().replace(/:/g, "")

  useEffect(() => {
    let cancelled = false
    const container = containerRef.current
    if (!container) return

    void ensureYouTubeIframeApi().then(() => {
      if (cancelled || !containerRef.current || !window.YT?.Player) return

      const player = new window.YT.Player(container, {
        videoId: WEDDING_VIDEO_ID,
        width: 1,
        height: 1,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: WEDDING_VIDEO_ID,
        },
        events: {
          onReady: (e) => {
            if (cancelled) return
            playerRef.current = e.target
            e.target.setVolume(90)
            playerReadyRef.current = true
          },
          onStateChange: (e) => {
            if (cancelled) return
            // YT.PlayerState.PLAYING === 1, PAUSED === 2, ENDED === 0
            if (e.data === 1) setIsPlaying(true)
            if (e.data === 2 || e.data === 0) setIsPlaying(false)
          },
        },
      })
    })

    const timer = setTimeout(() => setShowTooltip(false), 5000)

    return () => {
      cancelled = true
      clearTimeout(timer)
      playerReadyRef.current = false
      try {
        playerRef.current?.destroy()
      } catch {
        /* ignore */
      }
      playerRef.current = null
    }
  }, [])

  const toggleMusic = () => {
    const player = playerRef.current
    if (!player || !playerReadyRef.current) return

    if (isPlaying) {
      player.pauseVideo()
    } else {
      player.playVideo()
    }
    setShowTooltip(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        ref={containerRef}
        id={`yt-player-${containerId}`}
        className="pointer-events-none fixed left-[-9999px] top-0 h-px w-px overflow-hidden opacity-0"
        aria-hidden
      />

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
        className={`w-14 h-14 rounded-full z-999 shadow-lg transition-all duration-300 ${
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
