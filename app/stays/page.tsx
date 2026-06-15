import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/primitives/Section";
import { Container } from "@/components/primitives/Container";
import { RoomCard } from "@/components/sections/RoomCard";
import { rooms } from "@/content/rooms";

export const metadata: Metadata = {
  title: "Stays",
  description:
    "Five room types on the Kosi River — from the Mango Tree Rooms to the Tiger Den Suites with private pools.",
};

export default function StaysPage() {
  const [anchor, ...rest] = rooms;
  return (
    <>
      <PageHero
        eyebrow="Stays"
        title="Five rooms, one river."
        sub="From easygoing rooms under the mango trees to suites with a private pool on the deck — each looks out at the river, the garden or the hills."
      />
      <Section className="bg-ivory">
        <Container>
          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
            <RoomCard room={anchor} featured />
            {rest.map((room) => (
              <RoomCard key={room.slug} room={room} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
