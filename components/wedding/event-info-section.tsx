"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Shirt, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const eventDetails = [
  {
    icon: Calendar,
    title: "Data",
    description: "18 de Julho de 2026",
    subtitle: "Sábado",
  },
  {
    icon: Clock,
    title: "Horário",
    description: "Cerimônia às 16h",
    subtitle: "",
  },
  {
    icon: MapPin,
    title: "Local",
    description: "Chácara Vida Mansa",
    subtitle: "Linha E, 4 km depois do Aeroporto, Cacoal - RO",
  },
 /*  {
    icon: Shirt,
    title: "Dress Code",
    description: "Traje Passeio Completo",
    subtitle: "",
  }, */
]

export function EventInfoSection() {
  return (    
    <section className="pb-15 pt-0 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-light">
            Informações
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Detalhes do Evento
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {eventDetails.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <detail.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2">
                    {detail.title}
                  </h3>
                  <p className="text-foreground font-medium mb-1">
                    {detail.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {detail.subtitle}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Note */}
       {/*  <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <Card className="bg-secondary/30 border-secondary">
            <CardContent className="p-6 flex items-start gap-4">
              <Info className="w-5 h-5 text-secondary-foreground mt-0.5 shrink-0" />
              <p className="text-sm text-secondary-foreground leading-relaxed">
                Pedimos gentilmente que não levem crianças para a cerimônia.
                Haverá estacionamento gratuito no local. Em caso de dúvidas,
                entre em contato conosco pelo telefone (11) 99999-9999.
              </p>
            </CardContent>
          </Card>
        </motion.div> */}
      </div>
    </section>
  )
}
