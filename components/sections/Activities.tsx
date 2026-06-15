import { activities } from "@/content/activities";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { AnimatedHeading } from "@/components/primitives/AnimatedHeading";
import { SmartImage } from "@/components/media/SmartImage";
import { PlaceholderFrame } from "@/components/media/PlaceholderFrame";
import { EnquireLink } from "@/components/booking/EnquireLink";
import { cn } from "@/lib/utils";

/**
 * Activities showcase (§5.4 merchandised experiences). Editorial alternating
 * rows — oversized index numerals, locked-ratio image slots, restrained copy.
 * Photos drop into each activity's `image` field with zero layout shift.
 */
export function Activities() {
  return (
    <Section id="activities" className="bg-ivory">
      <Container>
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-brass-600">
            Things to do
          </p>
          <AnimatedHeading
            as="h2"
            text="The days are yours to fill."
            className="mt-5 font-display text-display font-medium leading-[1.02] tracking-[-0.025em] text-forest-900"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
              From dawn safaris in Corbett to a zip-line across the river —
              adventure when you want it, the long quiet of the Kosi when you
              don&apos;t.
            </p>
          </Reveal>
        </div>

        {/* Alternating editorial rows */}
        <div className="mt-20 space-y-24 md:mt-28 md:space-y-36">
          {activities.map((activity, i) => {
            const flip = i % 2 === 1;
            const index = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={activity.slug}>
                <article className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
                  {/* Image slot */}
                  <div className={cn(flip && "md:order-2")}>
                    {activity.image ? (
                      <SmartImage
                        src={activity.image}
                        alt={activity.name}
                        ratio={activity.ratio}
                        hover
                        frameClassName="rounded-sm shadow-soft"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    ) : (
                      <PlaceholderFrame index={index} ratio={activity.ratio} />
                    )}
                  </div>

                  {/* Text */}
                  <div className={cn(flip && "md:order-1")}>
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-3xl leading-none text-brass/70">
                        {index}
                      </span>
                      <span className="h-px flex-1 bg-ink/15" />
                    </div>
                    <h3 className="mt-5 font-display text-title font-medium leading-[1.05] tracking-[-0.02em] text-forest-900">
                      {activity.name}
                    </h3>
                    <p className="mt-4 max-w-md text-lg leading-relaxed text-ink-muted">
                      {activity.blurb}
                    </p>
                    <p className="mt-5 text-[0.7rem] uppercase tracking-[0.24em] text-ink-muted/80">
                      {activity.meta}
                    </p>
                    <EnquireLink
                      className="mt-7"
                      source={`activity_${activity.slug}`}
                      message={`Hello Bel-la Monde, I'd like to know more about ${activity.name}.`}
                    />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
