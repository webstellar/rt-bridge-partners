"use client";

import { useState } from "react";
import Image from "next/image";
import whiteLogo from "@/public/assets/bridge-partners-white-logo.png";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const navItems = [
  { label: "Home", sectionId: "home" },
  { label: "Pillars", sectionId: "pillars" },
  { label: "Why us", sectionId: "whyus" },
  { label: "How it works", sectionId: "howitworks" },
];

export default function DesktopHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50">
        <nav className="w-full px-6 sm:px-12 lg:px-20 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 items-center">
            {/* Column 1: Logo */}
            <div className="flex items-center">
              <div className="relative h-[40px] w-[120px]">
                <Image
                  alt="Bridge Partners Logo"
                  src={whiteLogo}
                  fill
                  style={{ objectFit: "contain", objectPosition: "left" }}
                  priority
                />
              </div>
            </div>

            {/* Column 2: Navigation Menu (Desktop) */}
            <div className="hidden lg:flex justify-center">
              <NavigationMenu viewport={false}>
                <NavigationMenuList className="gap-2">
                  {navItems.map((item) => (
                    <NavigationMenuItem key={item.sectionId}>
                      <NavigationMenuLink
                        className="bg-transparent text-white text-[16px] font-medium px-4 py-2 rounded-md hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                        onClick={() => scrollToSection(item.sectionId)}
                      >
                        {item.label}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Column 3: CTA (Desktop) + Menu Button (Mobile) */}
            <div className="flex justify-end items-center">
              {/* Desktop CTA */}
              <Button
                onClick={() => scrollToSection("contact")}
                className="hidden lg:inline-flex bg-[#03b209] hover:bg-[#02a008] text-white text-[14px] font-normal tracking-wide uppercase px-8 py-5 rounded-none cursor-pointer"
              >
                GET IN TOUCH
              </Button>

              {/* Mobile Menu Button */}
              <Button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden bg-[#03b209] hover:bg-[#02a008] text-white text-[14px] font-normal tracking-wide uppercase px-8 py-5 rounded-full cursor-pointer"
              >
                MENU
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Full-Screen Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-[#002200] flex flex-col lg:hidden">
          {/* Overlay Header — matches main header layout */}
          <div className="w-full px-6 sm:px-12 py-6">
            <div className="grid grid-cols-2 items-center">
              {/* Logo */}
              <div className="flex items-center">
                <div className="relative h-[40px] w-[120px]">
                  <Image
                    alt="Bridge Partners Logo"
                    src={whiteLogo}
                    fill
                    style={{ objectFit: "contain", objectPosition: "left" }}
                    priority
                  />
                </div>
              </div>
              {/* Close Button */}
              <div className="flex justify-end">
                <Button
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-[#03b209] hover:bg-[#02a008] text-white text-[14px] font-normal tracking-wide uppercase px-8 py-5 rounded-full cursor-pointer"
                >
                  CLOSE
                </Button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/20" />

          {/* Nav Items — pushed to lower portion */}
          <div className="flex flex-col justify-end flex-1 px-6 sm:px-12 pb-8">
            <div className="flex flex-col gap-2 mb-8">
              {navItems.map((item) => (
                <Button
                  key={item.sectionId}
                  variant="ghost"
                  onClick={() => scrollToSection(item.sectionId)}
                  className="justify-start text-white text-[36px] sm:text-[42px] font-bold h-auto py-2 px-0 hover:bg-transparent hover:text-white/80 cursor-pointer"
                >
                  {item.label}
                </Button>
              ))}
            </div>

            {/* GET IN TOUCH CTA */}
            <Button
              onClick={() => scrollToSection("contact")}
              className="w-full sm:w-auto sm:max-w-[400px] bg-[#03b209] hover:bg-[#02a008] text-white text-[14px] font-normal tracking-wide uppercase px-8 py-5 rounded-none cursor-pointer"
            >
              GET IN TOUCH
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
