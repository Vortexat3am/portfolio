import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ProjectsList from "@/components/ProjectsList";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <ProjectsList />
      <About />
      <Footer />
    </main>
  );
}
