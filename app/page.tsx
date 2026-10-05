import Hero from "@/components/Hero";
import ProjectsList from "@/components/ProjectsList";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProjectsList />
      <About />
      <Footer />
    </main>
  );
}
