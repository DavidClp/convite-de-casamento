"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, Heart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface FormData {
  name: string
  guests: string
  phone: string
  message: string
}

const MIN_GUESTS = 1
const MAX_GUESTS = 10

export function RSVPSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    guests: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Por favor, informe seu nome"
    }

    const guestsCount = parseInt(formData.guests, 10)
    if (!formData.guests || isNaN(guestsCount) || guestsCount < MIN_GUESTS) {
      newErrors.guests = "Por favor, informe a quantidade total de pessoas"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch("/api/extra/casamento-confirmacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.name.trim(),
          quantidade_pessoas: parseInt(formData.guests, 10),
          observacao: formData.message.trim() || undefined,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(
          (typeof data.error === "string" && data.error) ||
            "Não foi possível confirmar sua presença. Tente novamente."
        )
      }

      setIsSubmitted(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Não foi possível confirmar sua presença. Tente novamente."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const setGuests = (value: string) => {
    setFormData((prev) => ({ ...prev, guests: value }))
    if (errors.guests) {
      setErrors((prev) => ({ ...prev, guests: undefined }))
    }
  }

  const guestsCount =
    formData.guests === "" ? null : parseInt(formData.guests, 10)

  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value === "") {
      setGuests("")
      return
    }
    const num = parseInt(value, 10)
    if (num <= MAX_GUESTS) {
      setGuests(String(num))
    }
  }

  const decrementGuests = () => {
    if (guestsCount === null || guestsCount <= MIN_GUESTS) {
      setGuests("")
    } else {
      setGuests(String(guestsCount - 1))
    }
  }

  const incrementGuests = () => {
    const current = guestsCount ?? 0
    if (current < MAX_GUESTS) {
      setGuests(String(current + 1))
    }
  }

  return (
    <section id="rsvp" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4 font-light">
            Confirmação
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-4">
            Confirme sua Presença
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Sua presença é o melhor presente que poderíamos receber.
            Confirme até 30 de Junho de 2026.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <Card className="border-border/50 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground">
                        Nome Completo *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Digite seu nome completo"
                        className={`bg-background border-input ${errors.name ? "border-destructive" : ""}`}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="guests" className="text-foreground">
                        Quantidade total de pessoas
                      </Label>
                      <InputGroup
                        className={`bg-background ${errors.guests ? "border-destructive" : ""}`}
                      >
                        <InputGroupAddon align="inline-start">
                          <InputGroupButton
                            type="button"
                            size="icon-sm"
                            onClick={decrementGuests}
                            disabled={guestsCount === null}
                            aria-label="Remover pessoa"
                          >
                            <Minus />
                          </InputGroupButton>
                        </InputGroupAddon>
                        <InputGroupInput
                          id="guests"
                          name="guests"
                          type="text"
                          inputMode="numeric"
                          value={formData.guests}
                          onChange={handleGuestsChange}
                          placeholder=""
                          className="text-center"
                          aria-invalid={!!errors.guests}
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            type="button"
                            size="icon-sm"
                            onClick={incrementGuests}
                            disabled={guestsCount !== null && guestsCount >= MAX_GUESTS}
                            aria-label="Adicionar pessoa"
                          >
                            <Plus />
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                      {errors.guests && (
                        <p className="text-xs text-destructive">{errors.guests}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-foreground">
                        Mensagem (opcional)
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Deixe uma mensagem para os noivos..."
                        rows={4}
                        className="bg-background border-input resize-none"
                      />
                    </div>

                    {submitError && (
                      <p className="text-sm text-destructive text-center">
                        {submitError}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          Enviando...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Confirmar Presença
                        </span>
                      )}
                    </Button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center"
                    >
                      <CheckCircle className="w-10 h-10 text-accent" />
                    </motion.div>
                    <h3 className="font-serif text-2xl text-foreground mb-3">
                      Presença Confirmada!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Obrigado por confirmar, {formData.name.split(" ")[0]}!
                      <br />
                      Estamos ansiosos para celebrar com você.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <Heart className="w-4 h-4" fill="currentColor" />
                      <span className="font-serif">Nathalia & David</span>
                      <Heart className="w-4 h-4" fill="currentColor" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
