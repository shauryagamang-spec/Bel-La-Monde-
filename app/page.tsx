import { ScrollExpandHero } from "@/components/sections/ScrollExpandHero";
import { BookingInvite } from "@/components/sections/BookingInvite";
import { RoomsCarousel } from "@/components/sections/RoomsCarousel";
import { ExperienceTiles } from "@/components/sections/ExperienceTiles";
import { Activities } from "@/components/sections/Activities";
import { DayOnKosi } from "@/components/sections/DayOnKosi";
import { Testimonials } from "@/components/sections/Testimonials";
import { OfferStrip } from "@/components/sections/OfferStrip";

export default function HomePage() {
  return (
    <>
      {/* Drone film: add /media/hero.mp4 (+ /media/hero-poster.jpg) then pass
          videoSrc="/media/hero.mp4" posterSrc="/media/hero-poster.jpg" below. */}
      <ScrollExpandHero videoSrc="/media/BellaMond.mp4" />
      <BookingInvite />
      <RoomsCarousel />
      <ExperienceTiles />
      <Activities />
      <DayOnKosi />
      <Testimonials />
      <OfferStrip />
    </>
  );
}
