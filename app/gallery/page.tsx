import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { PlaceholderFrame } from "@/components/media/PlaceholderFrame";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "The river, the rooms and the jungle at Bel-la Monde Riverside — a visual tour.",
};

// Editorial masonry. Real photographs drop straight into these frames.
const ratios = ["4/3", "3/4", "1/1", "4/5", "3/2", "4/3", "3/4", "1/1", "4/5", "3/2", "4/3", "3/4"];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The place, in pictures."
        sub="Photography is on its way — the real shoot drops straight into these frames."
      />
      <Section className="bg-ivory">
        <Container>
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {ratios.map((r, i) => (
              <PlaceholderFrame
                key={i}
                ratio={r}
                bare
                className="break-inside-avoid"
              />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
