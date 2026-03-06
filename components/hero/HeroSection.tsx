"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowRight, Mouse } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ───────────────────────────────────────────
   Slide images — add more entries here later
   ─────────────────────────────────────────── */
const slides = [
  { src: "/assets/bridge_optimized.jpg", alt: "Bridge over water" },
  { src: "/assets/bridge2.jpg", alt: "Bridge over water" },
  // { src: "/assets/another-image.jpg", alt: "Description" },
];

const AUTO_PLAY_MS = 6000;

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /* ── auto-play ── */
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(nextSlide, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative w-full h-[50vh] md:h-[66vh] lg:h-screen overflow-hidden"
    >
      {/* ── Background slides ── */}
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover grayscale brightness-[0.45]"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* ── Green accent line (below header area) ── */}
      <div className="absolute top-[88px] sm:top-[90px] left-0 right-0 h-[3px] bg-[#03b209] z-10" />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col justify-between h-full px-6 sm:px-12 lg:px-20 pt-[120px] pb-8">
        {/* Main content — centered vertically in remaining space */}
        <div className="flex-1 flex flex-col justify-center max-w-[720px]">
          {/* H1 — light weight */}
          <h1 className="text-white text-[48px] sm:text-[46px] lg:text-[68px] font-light leading-tight">
            Bridge Partners
          </h1>

          {/* H2 — bold, tight line-height with H1 */}
          <h2 className="text-white text-[48px] sm:text-[46px] lg:text-[68px] font-bold leading-tight -mt-1">
            Strategic Gateway to the DRC
          </h2>

          {/* Paragraph */}
          <p className="text-white/85 text-[15px] sm:text-[17px] lg:text-[20px] font-light leading-relaxed mt-6 max-w-[600px]">
            We provide high-level access, proprietary market insight, and
            execution support to turn complex market entry into scalable
            success.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-8">
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-[#03b209] hover:bg-[#02a008] text-white text-[14px] font-normal tracking-wide uppercase px-8 py-5 rounded-none cursor-pointer"
            >
              Start Your Journey
            </Button>

            <button
              onClick={() => scrollToSection("pillars")}
              className="group flex items-center gap-2 text-white text-[13px] sm:text-[14px] font-semibold tracking-wide uppercase cursor-pointer hover:opacity-80 transition-opacity"
            >
              Learn More
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* ── Bottom bar: pagination + scroll indicator ── */}
        <div className="flex items-center justify-between w-full">
          {/* Spacer (left) */}
          <div className="flex-1" />

          {/* Pagination dots (center) */}
          <div className="flex items-center justify-center gap-2 flex-1">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentSlide
                    ? "w-[10px] h-[10px] bg-white"
                    : "w-[8px] h-[8px] bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Scroll indicator (right, desktop/tablet only) */}
          <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
            <div className="animate-bounce">
              <Mouse className="size-5 text-white/80" />
            </div>
            <span className="text-white/80 text-[12px] font-medium tracking-widest uppercase">
              Scroll to Explore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
