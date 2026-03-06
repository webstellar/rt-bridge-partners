"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";

/* ───────────────────────────────────────────
   Carousel items — add more entries here
   ─────────────────────────────────────────── */
const processItems = [
  {
    number: "01",
    title: "Deal Origination & Commercial Strategy",
    body: "We identify and structure high-value trade and infrastructure opportunities, often aligning incentives through shared success models.",
    accentColor: "#0A2745",
    backgroundImage: "/assets/main_road.jpg",
  },
  {
    number: "02",
    title: "Market Entry Advisory",
    body: "We convert complex regulatory and operational terrain into a streamlined launch ecosystem.",
    accentColor: "#374005",
    backgroundImage: "/assets/man_woman_market.jpg",
  },
  {
    number: "03",
    title: "Public Sector Advisory",
    body: "We connect investors with government priorities to enable high-impact partnerships.",
    accentColor: "#762605",
    backgroundImage: "/assets/main_road.jpg",
  },
];

/* ─── Single carousel card ─── */
function ProcessCard({ item }: { item: (typeof processItems)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex-shrink-0 w-[85vw] md:w-[calc(40%-12px)] h-[420px] sm:h-[650px] rounded-xl overflow-hidden cursor-pointer select-none"
    >
      {/* Accent background (always visible) */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ backgroundColor: item.accentColor }}
      />

      {/* Background image (visible on hover) */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={item.backgroundImage}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 85vw, 50vw"
        />
        {/* Colour overlay on top of image */}
        <div
          className="absolute inset-0 opacity-70"
          style={{ backgroundColor: item.accentColor }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-8">
        {/* Number */}
        <span className="text-white text-[40px] sm:text-[48px] font-bold leading-none">
          {item.number}
        </span>

        {/* Bottom content — slides up on hover */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-[22px] sm:text-[36px] lg:text-[42px] font-bold leading-tight font-medium">
            {item.title}
          </h3>

          {/* Body + arrow — revealed on hover with slide-up */}
          <div
            className={`flex flex-col gap-4 transition-all duration-500 ease-out overflow-hidden ${
              hovered
                ? "max-h-[200px] opacity-100 translate-y-0"
                : "max-h-0 opacity-0 translate-y-4"
            }`}
          >
            <p className="text-white/90 text-[16px] sm:text-[16px] lg:text-[20px] leading-relaxed max-w-[600px]">
              {item.body}
            </p>
            <div className="w-9 h-9 rounded-full border border-white/60 flex items-center justify-center hover:bg-white/20 transition-colors">
              <ArrowRight className="size-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Process Section ─── */
export default function Process() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  /* Arrow navigation */
  const scroll = useCallback((direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.children[0]?.clientWidth ?? 400;
    const gap = 24;
    const amount = direction === "left" ? -(cardWidth + gap) : cardWidth + gap;
    carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  /* Drag handlers */
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft ?? 0));
    setScrollLeft(carouselRef.current?.scrollLeft ?? 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const endDrag = () => setIsDragging(false);

  /* Touch handlers */
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (carouselRef.current?.offsetLeft ?? 0));
    setScrollLeft(carouselRef.current?.scrollLeft ?? 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  /* Animated DRAG label offset */
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      setDragOffset((prev) => (prev >= 100 ? 0 : prev + 0.3));
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
      {/* Section 1: Heading */}
      <div className="px-6 sm:px-12 lg:px-20">
        <h2 className="text-black text-[32px] sm:text-[40px] lg:text-[56px] font-medium leading-tight max-w-[900px]">
          With Bridge Partners, uncertainty is replaced by opportunity. We
          transform the complexities of frontier markets into a structured path
          for growth.
        </h2>
      </div>

      {/* Section 2: Carousel controls */}
      <div className="px-6 sm:px-12 lg:px-20 mt-8 sm:mt-10 flex items-center gap-3">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="w-9 h-9 rounded-full border border-black/30 flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Previous slide"
        >
          <ArrowLeft className="size-4 text-black/70" />
        </button>
        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="w-9 h-9 rounded-full border border-black/30 flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Next slide"
        >
          <ArrowRight className="size-4 text-black/70" />
        </button>
        {/* DRAG indicator */}
        <div className="relative ml-2 border border-black/20 rounded-full px-5 py-1.5 overflow-hidden w-[80px] h-[34px]">
          <span
            className="absolute text-[12px] font-medium tracking-widest uppercase text-black/60 whitespace-nowrap"
            style={{
              left: `${dragOffset}%`,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            DRAG
          </span>
        </div>
      </div>

      {/* Section 3: Carousel */}
      <div
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={endDrag}
        className={`flex gap-6 mt-8 sm:mt-10 px-6 sm:px-12 lg:px-20 overflow-x-auto scrollbar-hide ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {processItems.map((item) => (
          <ProcessCard key={item.number} item={item} />
        ))}
      </div>
    </section>
  );
}
