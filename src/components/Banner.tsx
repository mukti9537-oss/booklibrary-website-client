import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, BookOpen, Heart, Sparkles, Users, Zap, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES: { icon: LucideIcon; title: string; desc?: string }[] = [
  { icon: BookOpen, title: "Huge Collection", desc: "of Books" },
  { icon: Zap, title: "Instant Access" },
  { icon: Heart, title: "Personalized", desc: "Recommendations" },
];

export default function Banner() {
  return (
    <section className="relative isolate overflow-hidden bg-[radial-gradient(120%_120%_at_0%_0%,#fdf9f1_0%,#f8efdf_45%,#f1e4cd_100%)]">
      {/* Soft light/shadow blobs echoing the reference's sunlit wall */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 size-80 rounded-full bg-[#efdcc0]/70 blur-3xl" />
        <div className="absolute right-1/4 top-12 size-64 rounded-full bg-[#faf1e2]/80 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 size-96 rounded-full bg-[#eee0c4]/70 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14 lg:px-8 lg:py-16">
        {/* Copy */}
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-deep sm:text-sm">
            <Sparkles className="size-4 shrink-0" />
            Read &middot; Learn &middot; Grow
          </p>

          <h1 className="mt-5 font-heading text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl xl:text-7xl">
            Your Personal
            <br />
            Book Library
          </h1>

          <p className="mt-4 font-heading-italic text-3xl font-semibold text-leaf sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Read Anytime, Anywhere
          </p>

          <p className="mt-5 max-w-xl text-base leading-7 text-ink/70 sm:text-lg">
            Discover thousands of books, from timeless classics to the latest
            releases. Find your next favorite read!
          </p>

          {/* CTA + social proof */}
          <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-6">
            <Button
              render={<Link href="/all-books" />}
              className="group h-12 rounded-full bg-brand px-7 text-base font-semibold text-cream shadow-lg shadow-brand/20 hover:bg-brand-deep"
            >
              Explore Books
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </Button>

            <span aria-hidden className="hidden h-10 w-px bg-ink/15 sm:block" />

            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-brand/10 text-brand">
                <Users className="size-5" />
              </span>
              <span className="text-sm leading-tight">
                <strong className="block text-base font-bold text-ink">
                  Join 50K+
                </strong>
                <span className="text-ink/60">Book Lovers</span>
              </span>
            </div>
          </div>

          {/* Feature strip */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            {FEATURES.map((feature, index) => (
              <Fragment key={feature.title}>
                {index > 0 && (
                  <span
                    aria-hidden
                    className="hidden h-9 w-px bg-ink/15 sm:block"
                  />
                )}
                <div className="flex items-center gap-3">
                  <feature.icon className="size-5 shrink-0 text-brand" />
                  <span className="text-sm leading-tight text-ink/60">
                    <strong className="block font-semibold text-ink">
                      {feature.title}
                    </strong>
                    {feature.desc}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        {/* Hero image — swap public/images/hero.jpg to change the photo */}
        <div className="relative mt-10 h-72 w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/15 ring-8 ring-white/60 sm:h-96 lg:mt-0 lg:h-136">
          <Image
            src="/images/hero.jpg"
            alt="A cozy reading corner with books, a warm drink and a plant"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
