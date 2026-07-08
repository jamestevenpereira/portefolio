import Ambient from "@/components/Ambient";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Proof from "@/components/Proof";
import Work from "@/components/Work";
import OS from "@/components/OS";
import Story from "@/components/Story";
import Principles from "@/components/Principles";
import Packages from "@/components/Packages";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div id="top" style={{ position: "relative", overflow: "clip", minHeight: "100%" }}>
      <Ambient />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Proof />
        <Work />
        <OS />
        <Story />
        <Principles />
        <Packages />
        <FAQ />
        <Contact />
      </div>
    </div>
  );
}
