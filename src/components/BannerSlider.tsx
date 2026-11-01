"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Users } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";

type BannerSlide = {
  eyebrow: string;
  title: string;
  tagline: string;
  text: string;
  image: string;
  alt: string;
  /** Renders the "Join 50K+ Book Lovers" badge next to the button. */
  featured?: boolean;
};

const SLIDES: BannerSlide[] = [
  {
    eyebrow: "Read · Learn · Grow",
    title: "Your Personal Book Library",
    tagline: "Read Anytime, Anywhere",
    text: "Discover thousands of books, from timeless classics to the latest releases. Find your next favorite read!",
    image: "/images/hero.jpg",
    alt: "A cozy reading corner with books, a warm drink and a plant",
    featured: true,
  },
  {
    eyebrow: "New · Fresh · Curated",
    title: "Fresh Arrivals Every Week",
    tagline: "Be First to Read",
    text: "Be the first to pick up this week's most talked-about releases — bestsellers, debuts and hidden gems added to the shelf every Friday.",
    image: "/images/slide-fresh.jpg",
    alt: "An open art book resting on a stack of fresh releases",
  },
  {
    eyebrow: "Cozy · Calm · Timeless",
    title: "Cozy Corners, Timeless Tales",
    tagline: "Settle In & Get Lost",
    text: "From rainy-day classics to feel-good favorites — hand-picked collections that turn any quiet evening into a grand adventure.",
    image: "/images/slide-cozy.jpg",
    alt: "A warmly lit library aisle lined with shelves of books",
  },
];

export default function BannerSlider() {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div className="banner-slider">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true, el: ".banner-pagination" }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        speed={600}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="banner-swiper"
      >
        {SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              {/* Copy */}
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-deep sm:text-sm">
                  <span aria-hidden>✦</span>
                  {slide.eyebrow}
                </p>

                {index === 0 ? (
                  <h1 className="mt-5 font-heading text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl xl:text-7xl">
                    {slide.title}
                  </h1>
                ) : (
                  <h2 className="mt-5 font-heading text-4xl font-black leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl xl:text-7xl">
                    {slide.title}
                  </h2>
                )}

                <p className="mt-4 font-heading-italic text-3xl font-semibold text-leaf sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                  {slide.tagline}
                </p>

                <p className="mt-5 max-w-xl text-base leading-7 text-ink/70 sm:text-lg">
                  {slide.text}
                </p>

                {/* CTA (+ social proof on the first slide) */}
                <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-6">
                  <Button
                    nativeButton={false}
                    render={<Link href="/allbooks" />}
                    className="group h-12 rounded-full bg-brand px-7 text-base font-semibold text-cream shadow-lg shadow-brand/20 hover:bg-brand-deep"
                  >
                    Browse Books
                    <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>

                  {slide.featured && (
                    <>
                      <span
                        aria-hidden
                        className="hidden h-10 w-px bg-ink/15 sm:block"
                      />
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
                    </>
                  )}
                </div>
              </div>

              {/* Image */}
              <div className="relative h-72 w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-ink/15 ring-8 ring-white/60 sm:h-96 lg:h-128">
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls: bullets (rendered by Swiper) + prev/next */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="banner-pagination" />
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => swiperRef.current?.slidePrev()}
            className="grid size-11 place-items-center rounded-full border border-ink/15 bg-white/70 text-brand shadow-sm transition-colors hover:bg-brand hover:text-cream focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => swiperRef.current?.slideNext()}
            className="grid size-11 place-items-center rounded-full border border-ink/15 bg-white/70 text-brand shadow-sm transition-colors hover:bg-brand hover:text-cream focus-visible:ring-3 focus-visible:ring-brand/40 focus-visible:outline-none"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
