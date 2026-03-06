"use client";

import { useState, useRef, useCallback, FormEvent } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import blackLogo from "@/public/assets/bridge-partners-black-logo.png";

/* ───────────────────────────────────────────
   Market card data
   ─────────────────────────────────────────── */
const marketItems = [
  {
    number: "01",
    title: "Mining & Resources",
    body: "Navigating heavy regulatory frameworks and facilitating partnerships that respect local content requirements while protecting foreign assets.",
  },
  {
    number: "02",
    title: "Energy & Infrastructure",
    body: "Sourcing financing and managing complex government interactions for large-scale utility projects to address the massive electricity deficit.",
  },
  {
    number: "03",
    title: "Agriculture",
    body: "Managing administrative navigation and time-sensitive logistics essential for large-scale projects requiring strong government interaction.",
  },
  {
    number: "04",
    title: "Professional Services",
    body: "Providing the bridge to decision-makers for agile, mid-sized companies with high-level technical skills in health, security, and the public sector.",
  },
  {
    number: "05",
    title: "Import & Export",
    body: "Connecting Congolese demand for industrial inputs with global supply chains, ensuring quality control in Oil & Gas, Power, and Manufacturing.",
  },
];

/* ─── Single market card ─── */
function MarketCard({ item }: { item: (typeof marketItems)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex-shrink-0 w-[85vw] md:w-auto flex flex-col p-5 sm:p-6 rounded-lg transition-colors duration-400 cursor-pointer border border-transparent ${
        hovered ? "bg-[#03b209] border-[#03b209]" : "bg-transparent"
      }`}
    >
      <span
        className={`text-[14px] font-medium transition-colors duration-400 ${
          hovered ? "text-white" : "text-black/60"
        }`}
      >
        {item.number}
      </span>

      <div
        className={`w-full h-[1.5px] mt-2 mb-4 transition-colors duration-400 ${
          hovered ? "bg-white/50" : "bg-black/15"
        }`}
      />

      <h3
        className={`text-[18px] sm:text-[20px] font-bold leading-tight transition-colors duration-400 ${
          hovered ? "text-white" : "text-black"
        }`}
      >
        {item.title}
      </h3>

      <p
        className={`mt-3 text-[13px] sm:text-[14px] leading-relaxed transition-colors duration-400 ${
          hovered ? "text-white/90" : "text-black/60"
        }`}
      >
        {item.body}
      </p>
    </div>
  );
}

/* ─── Contact Form ─── */
function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!accepted) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      });

      if (res.ok) {
        setStatus("sent");
        setFirstName("");
        setEmail("");
        setAccepted(false);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-10 sm:p-14 flex flex-col items-center">
      {/* Logo */}
      <div className="relative h-[60px] w-[160px] mb-6">
        <Image
          src={blackLogo}
          alt="Bridge Partners Logo"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Paragraph */}
      <p className="text-center text-black/70 text-[14px] leading-relaxed mb-10 max-w-[360px]">
        Bridge Partners supports clients from market entry and deal sourcing to
        execution and long-term growth.
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-6"
      >
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full bg-[#f5f5f5] text-black text-[15px] px-5 py-4 rounded-md outline-none placeholder:text-black/50 focus:ring-2 focus:ring-[#03b209]/30 transition"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-[#f5f5f5] text-black text-[15px] px-5 py-4 rounded-md outline-none placeholder:text-black/50 focus:ring-2 focus:ring-[#03b209]/30 transition"
        />

        {/* Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer mt-2 self-center">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-[#03b209] cursor-pointer"
          />
          <span className="text-[13px] text-black/70 leading-snug">
            I accept the terms of service and privacy policy
          </span>
        </label>

        {/* Submit */}
        <Button
          type="submit"
          disabled={!accepted || status === "sending"}
          className="mt-2 w-fit self-center bg-[#03b209] hover:bg-[#02a008] text-white text-[14px] font-normal tracking-wide uppercase px-8 py-5 rounded-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending..." : "Get Started Today"}
        </Button>

        {status === "sent" && (
          <p className="text-[#03b209] text-[13px] font-medium">
            Thank you! We&apos;ll be in touch soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-500 text-[13px] font-medium">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}

/* ─── Main Markets Section ─── */
export default function Markets() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback((direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const cardWidth = carouselRef.current.children[0]?.clientWidth ?? 300;
    const gap = 16;
    const amount = direction === "left" ? -(cardWidth + gap) : cardWidth + gap;
    carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  return (
    <section
      id="contact"
      className="w-full bg-white py-12 sm:py-16 lg:py-20 border-t border-[#03b209]"
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 px-6 sm:px-12 lg:px-20">
        {/* Column 1: Title + Market Cards */}
        <div className="w-full lg:w-1/2">
          {/* H2 */}
          <h2 className="text-black text-[32px] sm:text-[40px] lg:text-[44px] font-medium leading-tight max-w-[520px]">
            Bridge Partners works across mining, energy, agriculture, trade, and
            infrastructure.
          </h2>

          {/* Desktop: 2-col grid */}
          <div className="hidden md:grid grid-cols-2 gap-4 mt-10">
            {marketItems.map((item) => (
              <MarketCard key={item.number} item={item} />
            ))}
          </div>

          {/* Mobile: carousel */}
          <div
            ref={carouselRef}
            className="flex md:hidden gap-4 mt-8 overflow-x-auto scrollbar-hide"
          >
            {marketItems.map((item) => (
              <MarketCard key={item.number} item={item} />
            ))}
          </div>

          {/* Mobile arrows */}
          <div className="flex md:hidden items-center gap-3 mt-6">
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
        </div>

        {/* Column 2: Contact Form */}
        <div className="w-full lg:w-1/2 flex items-start justify-center">
          <div className="w-full max-w-[500px]">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
