import Image from "next/image";
import blackLogo from "@/public/assets/bridge-partners-black-logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-[#03b209] px-6 sm:px-12 lg:px-20 py-10 sm:py-12">
      {/* Row 1: Logo + Quote */}
      <div className="flex flex-col md:flex-row md:items-stretch lg:justify-between gap-8 md:gap-16">
        {/* Column 1: Logo */}
        <div className="relative h-[50px] w-[150px] flex-shrink-0">
          <Image
            src={blackLogo}
            alt="Bridge Partners Logo"
            fill
            style={{ objectFit: "contain", objectPosition: "left" }}
          />
        </div>

        {/* Column 2: Quote */}
        <div className="flex flex-col gap-2">
          <span className="text-black text-[13px] font-bold tracking-wider uppercase">
            WE BELIEVE
          </span>
          <p className="text-black/70 text-[14px] leading-relaxed italic max-w-[500px]">
            &ldquo;The key to building an authentic business is building an
            authentic life.&rdquo; — Brian Gardner
          </p>
        </div>
      </div>

      {/* Row 2: Copyright */}
      <div className="mt-10 pt-6">
        <p className="text-black/50 text-[13px]">
          {currentYear} Bridge Partner. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
