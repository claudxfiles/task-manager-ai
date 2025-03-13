import { HeroSection } from "@/components/landing/hero/hero-section";
import { HowItWorks } from "@/components/landing/features/how-it-works";
import { FeaturesSection } from "@/components/landing/features/features-section";
import { TestimonialsSection } from "@/components/landing/testimonials/testimonials-section";
import { PricingSection } from "@/components/landing/pricing/pricing-section";
import { FaqSection } from "@/components/landing/faq/faq-section";
import { CTASection } from "@/components/landing/cta/cta-section";
import { Footer } from "@/components/landing/footer/footer";
import { Navbar } from "@/components/landing/navbar/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <HowItWorks />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
