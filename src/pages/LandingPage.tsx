import { Nav } from "../components/Nav";
import { Hero } from "../components/landing/Hero";
import { Features, Pricing, FAQ, Footer } from "../components/landing/Sections";

export function LandingPage() {
  return (
    <div>
      <Nav />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}
