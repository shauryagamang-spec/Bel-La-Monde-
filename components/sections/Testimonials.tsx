import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { ScrollReelTestimonials } from "@/components/sections/ScrollReelTestimonials";
import { testimonials } from "@/content/testimonials";

/** Guest-words band — the scroll-reel testimonials (§2.6, near the offer CTA). */
export function Testimonials() {
  return (
    <Section className="bg-ivory">
      <Container>
        <SectionHeading
          eyebrow="Guest words"
          title="From the riverbank."
          align="center"
        />
        <div className="mt-12 flex justify-center">
          <ScrollReelTestimonials testimonials={testimonials} />
        </div>
      </Container>
    </Section>
  );
}
