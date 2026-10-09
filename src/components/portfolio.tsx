"use client";
import { PortfolioProvider } from "./portfolio-provider";
import { ProjectDialog, PhotoDialog } from "./dialogs";
import { useReveal } from "@/hooks/use-browser";
import { Header } from "./header";
import { Hero } from "./hero";
import { Featured } from "./featured";
import { Work } from "./work";
import { Toolbox } from "./toolbox";
import { Skills } from "./skills";
import { Workflow } from "./workflow";
import { About } from "./about";
import { Contact } from "./contact";
import { Footer } from "./footer";

export function Portfolio() {
  useReveal();
  return (
    <PortfolioProvider>
      <a className="skip" href="#work">
        Skip to work
      </a>
      <Header />
      <main>
        <Hero />
        <Featured />
        <Work />
        <Toolbox />
        <Skills />
        <Workflow />
        <About />
        <Contact />
      </main>
      <Footer />
      <ProjectDialog />
      <PhotoDialog />
    </PortfolioProvider>
  );
}
