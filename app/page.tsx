import { ScrollExpandHero } from "@/components/sections/ScrollExpandHero";
import { BookingInvite } from "@/components/sections/BookingInvite";
import { RoomsCarousel } from "@/components/sections/RoomsCarousel";
import { ExperienceTiles } from "@/components/sections/ExperienceTiles";
import { WildlifeReveal } from "@/components/sections/WildlifeReveal";
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
      {/* Stock photos (Pexels, free licence) standing in until the resort's own
          wildlife shoot — see CONTENT-TODO.md. */}
      <WildlifeReveal
        before={{
          src: "https://images.pexels.com/photos/145939/pexels-photo-145939.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=900",
          alt: "A Bengal tiger wading through water",
          name: "Tiger",
          tag: "Royal Bengal · Corbett",
        }}
        after={{
          src: "https://images.pexels.com/photos/5373904/pexels-photo-5373904.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1600&h=900",
          alt: "An elephant bathing in a river",
          name: "Elephant",
          tag: "Asiatic · Corbett",
        }}
      />
      <Activities />
      <DayOnKosi />
      <Testimonials />
      <OfferStrip />
    </>
  );
}
