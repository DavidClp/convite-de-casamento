"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function InvitationTextSection() {
  return (
    <section className="pt-20 pb-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-16 h-px bg-primary/40" />
            <Heart className="w-5 h-5 text-primary" fill="currentColor" />
            <span className="w-16 h-px bg-primary/40" />
          </div>

          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8 font-light">
            Convite Especial
          </p>

          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed italic mb-8">
            {
              "Com alegria em nossos corações, convidamos você para celebrar este momento único ao nosso lado."
            }
          </blockquote>

          <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
            Após anos de amor, cumplicidade e sonhos compartilhados, decidimos
            unir nossas vidas em matrimônio. Seria uma honra ter você presente
            neste dia tão especial, para testemunhar o início dessa nova jornada
            que percorreremos juntos.
          </p>

          <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Que esse dia seja marcado pelo amor, pela alegria e por memórias que
            guardaremos para sempre em nossos corações.
          </p>

          <div className="mt-12 flex items-center justify-center gap-4">
            <span className="w-24 h-px bg-border" />
            <p className="font-serif text-xl text-primary">N & D</p>
            <span className="w-24 h-px bg-border" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
