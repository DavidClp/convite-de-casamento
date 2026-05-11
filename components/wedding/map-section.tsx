"use client"

import { motion } from "framer-motion"
import { MapPin, Navigation, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const VENUE_ADDRESS = "Fazenda Vila Rica, Estrada Municipal, Km 12 - Campinas, SP"
const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29333.13144913098!2d-47.064252!3d-22.905856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8c8f6e8b5b5b5%3A0x8e8e8e8e8e8e8e8e!2sCampinas%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1699999999999!5m2!1spt-BR!2sbr"
const MAPS_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Fazenda+Vila+Rica+Campinas+SP"

export function MapSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-light">
            Localização
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground">
            Como Chegar
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="overflow-hidden border-border/50">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  {/* Map */}
                  <div className="lg:col-span-2 h-64 md:h-80 lg:h-96">
                    <iframe
                      src={MAPS_EMBED_URL}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Localização do evento"
                      className="w-full h-full"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-6 md:p-8 bg-card flex flex-col justify-center">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl text-foreground mb-2">
                          Fazenda Vila Rica
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {VENUE_ADDRESS}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Button
                        asChild
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <a
                          href={MAPS_DIRECTIONS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Navigation className="w-4 h-4 mr-2" />
                          Abrir Rota no Maps
                        </a>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-border hover:bg-muted"
                      >
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_ADDRESS)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Ver no Google Maps
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
