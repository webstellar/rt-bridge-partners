"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const choiceItems = [
  {
    title: "Exclusivity & Selection",
    body: "We do not seek a high volume of customers. We select partners where our influence and expertise can guarantee a disproportionate market share.",
  },
  {
    title: "Intellectual Rigor",
    body: "Our associates come from diverse, high-level backgrounds, ensuring that every strategy is tested against global standards of compliance and risk management.",
  },
  {
    title: "The \u201CWho\u201D over the \u201CWhat\u201D:",
    body: "In frontier markets, access to decision-makers is the ultimate shortcut. We provide the connections that save years of trial and error.",
  },
];

/* ─── Single choice card ─── */
function ChoiceCard({ item }: { item: (typeof choiceItems)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden border-t border-[#03b209]/30 py-16 sm:py-20 px-6 sm:px-8 cursor-pointer"
    >
      {/* Green hover background — slides from left */}
      <div
        className={`absolute inset-0 bg-[#03b209] transition-transform duration-500 ease-out origin-left ${
          hovered ? "translate-x-0" : "-translate-x-full"
        }`}
      />

      {/* Content */}
      <div className="relative z-10">
        <h3
          className={`text-[24px] sm:text-[28px] lg:text-[42px] font-medium leading-tight transition-colors duration-300 ${
            hovered ? "text-white" : "text-black"
          }`}
        >
          {item.title}
        </h3>

        <p
          className={`mt-3 text-[14px] sm:text-[15px] lg:text-[16px] leading-relaxed max-w-[500px] transition-colors duration-300 ${
            hovered ? "text-white/90" : "text-black/70"
          }`}
        >
          {item.body}
        </p>

        {/* Arrow — always visible; Read More text slides in on hover */}
        <div className="mt-6 flex items-center gap-2">
          <div
            className={`flex items-center gap-2 transition-all duration-500 ease-out ${
              hovered ? "opacity-100 translate-x-0" : "hidden opacity-0 -translate-x-4"
            }`}
          >
            <span className="text-white text-[13px] font-semibold tracking-wide uppercase">
              Read More
            </span>
          </div>
          <ArrowUpRight
            className={`size-5 transition-colors duration-300 ${
              hovered ? "text-white" : "text-black/70"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Main Choice Section ─── */
export default function Choice() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white border-y border-[#03B209]">
      <div className="flex flex-col lg:flex-row">
        {/* Column 1: Sticky text + button */}
        <div className="w-full lg:w-1/2 px-6 sm:px-12 lg:px-20 py-12 sm:py-16 lg:py-0 lg:border-r border-[#03B209]">
          <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-center">
            <h2 className="text-black text-[32px] sm:text-[40px] lg:text-[44px] font-medium leading-tight max-w-[500px]">
              Choose Bridge Partners for direct access, sharp strategy, and
              execution that turns opportunity into measurable results.
            </h2>

            <Button onClick={scrollToContact} className="mt-8 w-fit bg-[#03b209] hover:bg-[#02a008] text-white text-[14px] font-normal tracking-wide uppercase px-8 py-5 rounded-none cursor-pointer gap-2">
              Learn More
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>

        {/* Column 2: Stacked cards */}
        <div className="w-full lg:w-1/2">
          {choiceItems.map((item, index) => (
            <ChoiceCard key={index} item={item} />
          ))}
          {/* Bottom border on last card */}
          <div className="border-t border-[#03b209]/30" />
        </div>
      </div>
    </section>
  );
}
