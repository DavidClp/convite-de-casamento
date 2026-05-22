"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

const timelineEvents = [
  {
    year: "Julho de 2022",
    title: "Inicio da amizade",
    description:
      "Inicio de uma amizade por meio de um amizade em comum.",
  },
  {
    year: "Agosto de 2022",
    title: "O Primeiro Rolê",
    description:
      "Uma rolé entre amigos em uma sorveteria",
  },
  {
    year: "Agosto de 2022",
    title: "O Primeiro Beijo",
    description:
      "Em uma noite da festa junina da escola, trocamos nosso primeiro beijo.",
  },
  {
    year: "Setembro de 2022",
    title: "Pedido de namoro",
    description:
      "Em uma noite da festa junina da escola, David pediu Nathalia em namoro.",
  },
  {
    year: "2023",
    title: "O Pedido",
    description:
      "Em Paris, diante da Torre Eiffel, David pediu Nathalia em casamento.",
  },
  {
    year: "Julho de 2026",
    title: "O Grande Dia",
    description:
      "Finalmente, o dia de celebrar nosso amor com todos que amamos.",
  },
]

export function TimelineSection() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-light">
            Nossa Jornada
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Nossa História de Amor
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:hidden" />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
            >
              {/* Mobile Layout */}
              <div className="md:hidden flex items-start gap-6 w-full">
                <div className="relative z-10">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Heart className="w-4 h-4 text-primary-foreground" fill="currentColor" />
                  </div>
                </div>
                <div className="flex-1 pb-8">
                  <span className="text-sm font-medium text-primary">{event.year}</span>
                  <h3 className="font-serif text-xl text-foreground mt-1 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Desktop Layout */}
              <div
                className={`hidden md:block flex-1 ${index % 2 === 0 ? "text-right pr-12" : "text-left pl-12"
                  }`}
              >
                <span className="text-sm font-medium text-primary">{event.year}</span>
                <h3 className="font-serif text-xl text-foreground mt-1 mb-2">
                  {event.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Center Icon - Desktop */}
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 z-10">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                  <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
                </div>
              </div>

              {/* Empty Space - Desktop */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
