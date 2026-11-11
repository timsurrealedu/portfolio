import { SiteHeader } from "@/components/site-header";
import { Motion } from "@/components/motion";
import { About, Certificates, Contact, Footer, Hero, Log, Work } from "@/components/sections";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main" className="shell">
        <Hero />
        <Work />
        <Log />
        <Certificates />
        <About />
        <Contact />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
