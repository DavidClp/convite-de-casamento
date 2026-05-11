"use client"

import { motion } from "framer-motion"
import { Heart, Instagram, Mail } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="py-16 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="w-5 h-5 text-primary" fill="currentColor" />
            <h2 className="font-serif text-3xl md:text-4xl">Nathalia & David</h2>
            <Heart className="w-5 h-5 text-primary" fill="currentColor" />
          </div>

          <p className="text-background/70 mb-8 max-w-md mx-auto">
            Obrigado por fazer parte da nossa história. Mal podemos esperar para
            celebrar com você!
          </p>

          <div className="flex items-center justify-center gap-6 mb-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="mailto:contato@NathaliaeDavid.com"
              className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <p className="text-xs text-background/50 tracking-wider uppercase">
            15 de Março de 2025 • Campinas, SP
          </p>

          <div className="mt-8 pt-8 border-t border-background/10">
            <p className="text-xs text-background/40">
              Feito com{" "}
              <Heart className="w-3 h-3 inline-block text-primary" fill="currentColor" />{" "}
              para nosso dia especial
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
