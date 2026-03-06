"use client";

import { useState, useRef, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const evaluationItems = [
  {
    number: "01",
    title: "Curation & Alignment",
    body: "We begin with a rigorous assessment of your objectives. We only move forward when we are confident that our influence and the local market conditions align with your long-term success.",
  },
  {
    number: "02",
    title: "Strategic Blueprinting",
    body: "A tailored proposal covering regulatory, financial, and operational workstreams is designed.",
  },
  {
    number: "03",
    title: "Synchronized Execution",
    body: "A dedicated project lead coordinates all local variables from legal registration to banking and customs ensuring a seamless deployment.",
  },
  {
    number: "04",
    title: "Active Partnership",
    body: "We remain engaged to scale operations, manage high-level government relations, and refine commercial strategy.",
  },
];

/* ─── Single evaluation card ─── */
function EvaluationCard({
  item,
}: {
  item: (typeof evaluationItems)[number];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex-shrink-0 w-[85vw] md:w-[calc(25%-18px)] flex flex-col p-6 sm:p-8 rounded-lg transition-colors duration-400 cursor-pointer ${
        hovered ? "bg-[#03b209]" : "bg-transparent"
      }`}
    >
      {/* Number */}
      <span
        className={`text-[16px] font-medium transition-colors duration-400 ${
          hovered ? "text-white" : "text-black/70"
        }`}
      >
        {item.number}
      </span>

      {/* Border line */}
      <div
        className={`w-full h-[2px] mt-3 mb-6 transition-colors duration-400 ${
          hovered ? "bg-white/50" : "bg-black/20"
        }`}
      />

      {/* Title */}
      <h3
        className={`text-[22px] sm:text-[24px] lg:text-[26px] font-bold leading-tight transition-colors duration-400 ${
          hovered ? "text-white" : "text-black"
        }`}
      >
        {item.title}
      </h3>

      {/* Body */}
      <p
        className={`mt-4 text-[14px] sm:text-[15px] leading-relaxed transition-colors duration-400 ${
          hovered ? "text-white/90" : "text-black/60"
        }`}
      >
        {item.body}
      </p>
    </div>
  );
}

/* ─── Main Evaluation Process Section ─── */
export default function EvaluationProcess() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.children[0]?.clientWidth ?? 300;
    const gap = 24;
    const amount = direction === "left" ? -(cardWidth + gap) : cardWidth + gap;
    carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  return (
    <section
      id="howitworks"
      className="w-full min-h-[75vh] flex flex-col justify-center bg-white py-12 sm:py-16 lg:py-20"
    >
      {/* Row 1: Heading */}
      <div className="px-6 sm:px-12 lg:px-20">
        <h2 className="text-black text-[32px] sm:text-[40px] lg:text-[48px] font-medium leading-tight max-w-[800px]">
          Bridge Partners operates through rigorous evaluation, tailored
          strategy, and coordinated execution.
        </h2>
      </div>

      {/* Row 2: Cards */}
      <div
        ref={carouselRef}
        className="flex gap-6 mt-10 sm:mt-14 px-6 sm:px-12 lg:px-20 overflow-x-auto md:overflow-x-visible scrollbar-hide"
      >
        {evaluationItems.map((item) => (
          <EvaluationCard key={item.number} item={item} />
        ))}
      </div>

      {/* Row 3: Mobile arrows */}
      <div className="flex md:hidden items-center gap-3 px-6 sm:px-12 mt-8">
        <button
          onClick={() => scroll("left")}
          className="w-9 h-9 rounded-full border border-black/30 flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Previous card"
        >
          <ArrowLeft className="size-4 text-black/70" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-9 h-9 rounded-full border border-black/30 flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer"
          aria-label="Next card"
        >
          <ArrowRight className="size-4 text-black/70" />
        </button>
      </div>
    </section>
  );
}
