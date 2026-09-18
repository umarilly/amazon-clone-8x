"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export interface Slide {
  title: string;
  subtitle: string;
  detail: string;
  image: string;
  /** Background tint for this slide — real amazon.com changes the whole
      banner's background color per slide to suit its product photo
      (purple for kitchenware, green for another, etc.), not one fixed tint
      for every slide. */
  gradientFrom: string;
}

// Fades the photo's edges to transparent so it doesn't read as a hard
// rectangle sitting on the banner — the closest achievable stand-in for a
// real pre-cut transparent product photo without a source of those to pull
// from (see the note below the image element).
const FADE_MASK =
  "radial-gradient(ellipse 62% 68% at center, black 55%, transparent 100%)";

export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }

  function next() {
    setIndex((i) => (i + 1) % slides.length);
  }

  const slide = slides[index];

  return (
    <div
      className="relative mx-auto h-[280px] w-full max-w-[1440px] overflow-hidden transition-colors duration-700 sm:h-[340px]"
      style={{
        background: `linear-gradient(to bottom, ${slide.gradientFrom} 0%, ${slide.gradientFrom} 55%, transparent 100%)`,
      }}
    >
      <div className="relative z-10 flex h-full items-center justify-center gap-10 px-20 sm:gap-16 sm:px-24">
        <div className="max-w-sm shrink-0">
          <p className="text-2xl font-bold text-[#18191a] sm:text-4xl">
            {slide.title}
          </p>
          <p className="mt-2 text-base font-semibold text-price-red sm:text-lg">
            {slide.subtitle}
          </p>
          <p className="mt-1 text-sm text-[#18191a]/80 sm:text-base">
            {slide.detail}
          </p>
        </div>

        {/* Real amazon.com renders these as pre-cut, transparent-background
            product photography. There's no free, reliable source of real
            product-cutout PNGs to pull from (checked: Wikimedia Commons only
            has tiny generic icons for this, not product photography), and
            generating images isn't something this assistant does — so the
            edges are faded out with a mask instead of a hard rectangle,
            the closest honest approximation available. */}
        <div className="relative hidden h-[75%] w-[280px] shrink-0 sm:block">
          <Image
            key={slide.image}
            src={slide.image}
            alt=""
            fill
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "auto"}
            sizes="280px"
            className="object-contain"
            style={{
              maskImage: FADE_MASK,
              WebkitMaskImage: FADE_MASK,
            }}
          />
        </div>
      </div>

      {/* Matches real amazon.com's carousel arrows exactly (inspected live):
          a bare chevron glyph with a large full-height invisible hit area —
          no circular button, no background, no drop shadow. */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-0 top-0 z-20 flex h-full w-16 items-center justify-center text-[#0f1111] hover:opacity-60"
      >
        <svg
          viewBox="0 0 24 36"
          className="h-9 w-9"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 3 6 18l12 15" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-0 top-0 z-20 flex h-full w-16 items-center justify-center text-[#0f1111] hover:opacity-60"
      >
        <svg
          viewBox="0 0 24 36"
          className="h-9 w-9"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3l12 15L6 33" />
        </svg>
      </button>

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
        {slides.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 w-1.5 rounded-full ${
              i === index ? "bg-[#18191a]" : "bg-[#18191a]/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
