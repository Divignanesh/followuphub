import { AIEngine } from "../sections/AIEngine";
import { Capabilities } from "../sections/Capabilities";
import { Comparison } from "../sections/Comparison";
import { Dashboard } from "../sections/Dashboard";
import { FAQ } from "../sections/FAQ";
import { FinalCTA } from "../sections/FinalCTA";
import { Hero } from "../sections/Hero";
import { Integrations } from "../sections/Integrations";
import { Platform } from "../sections/Platform";
import { Pricing } from "../sections/Pricing";
import { Results } from "../sections/Results";
import { Testimonials } from "../sections/Testimonials";
import { UseCases } from "../sections/UseCases";
import { WhatsIncluded } from "../sections/WhatsIncluded";
import { Workflow } from "../sections/Workflow";
import { FAQS } from "../lib/seo";

export function Home() {
  return (
    <>
      <Hero />
      <Results />
      <AIEngine />
      <Platform />
      <UseCases />
      <Capabilities />
      <Dashboard />
      <Workflow />
      <WhatsIncluded />
      <Testimonials />
      <Integrations />
      <Pricing />
      <Comparison />
      <FAQ faqs={FAQS} />
      <FinalCTA />
    </>
  );
}
