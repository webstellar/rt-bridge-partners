"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Industries() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-auto lg:h-[75vh] md:h-[75vh] flex flex-col md:flex-row bg-white overflow-hidden border-y border-[#03B209] "
    >
      {/* Column 2 (Image) — appears first on mobile via order */}
      <div className="relative w-full md:w-1/2 h-[50vh] md:h-full order-1 md:order-2">
        <Image
          src="/assets/man_looking.png"
          alt="Man looking into the distance"
          fill
          className="object-cover grayscale"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Column 1 (Text + Button) — appears second on mobile via order */}
      <div
        className={`flex flex-col justify-center w-full md:w-1/2 h-[50vh] md:h-full px-6 sm:px-12 lg:px-20 py-12 order-2 md:order-1 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <h2 className="text-black text-[32px] sm:text-[36px] lg:text-[56px] font-bold leading-tight font-medium">
          We select partners where our influence and expertise can guarantee a
          disproportionate market share.
        </h2>

        <Button className="mt-8 w-fit bg-[#03b209] hover:bg-[#02a008] text-white text-[14px] font-normal tracking-wide uppercase px-8 py-5 rounded-none cursor-pointer gap-2">
          Learn More
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  );
}
