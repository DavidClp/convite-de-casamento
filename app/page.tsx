import { HeroSection } from "@/components/wedding/hero-section"
import { CountdownSection } from "@/components/wedding/countdown-section"
import { EventInfoSection } from "@/components/wedding/event-info-section"
import { GallerySection } from "@/components/wedding/gallery-section"
import { InvitationTextSection } from "@/components/wedding/invitation-text-section"
import { TimelineSection } from "@/components/wedding/timeline-section"
import { MapSection } from "@/components/wedding/map-section"
import { RSVPSection } from "@/components/wedding/rsvp-section"
import { MusicPlayer } from "@/components/wedding/music-player"
import { FooterSection } from "@/components/wedding/footer-section"

export default function WeddingPage() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <CountdownSection />
      <InvitationTextSection />
      <EventInfoSection />
      <TimelineSection />
      <GallerySection />
      <MapSection />
      <RSVPSection />
      <FooterSection />
      <MusicPlayer />
    </main>
  )
}
