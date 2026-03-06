import DesktopHeader from "@/components/navigation/Header";
import HeroSection from "@/components/hero/HeroSection";
import ValueProposition from "@/components/value/ValueProposition";
import Industries from "@/components/industries/Industries";
import Process from "@/components/process/Process";
import Choice from "@/components/choice/Choice";
import EvaluationProcess from "@/components/evaluation/EvaluationProcess";
import Markets from "@/components/market/Markets";
import Footer from "@/components/navigation/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden overflow-y-auto">
      <DesktopHeader />
      <HeroSection />
      <ValueProposition />
      <Industries />
      <Process />
      <Choice />
      <EvaluationProcess />
      <Markets />
      <Footer />
    </div>
  );
}
