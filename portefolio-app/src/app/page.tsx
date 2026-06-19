import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Proof from "@/components/Proof";
import Work from "@/components/Work";
import OS from "@/components/OS";
import Story from "@/components/Story";
import Principles from "@/components/Principles";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div id="top" style={{ position: "relative", overflow: "clip", minHeight: "100%" }}>
      <Nav />
      <Hero />
      <About />
      <Proof />
      <Work />
      <OS />
      <Story />
      <Principles />
      <Contact />
    </div>
  );
}
