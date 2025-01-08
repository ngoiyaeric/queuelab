import SiteHeader from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { LogoTicker } from "@/components/logo-ticker";
import SiteFooter from "@/components/site-footer";
import { CallToAction } from "@/components/call-to-action";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { GithubIndicator } from "@/components/github-indicator";
import { PricingSection } from "@/components/pricing-section";
import EmailPopup from "@/components/email-popup"; // P0ec3

export default function Home() {
    return (
        <>
            <SiteHeader />
            <HeroSection />
            <LogoTicker />
            <Features id="features" />
            <Testimonials />
            <PricingSection id="pricing" />
            <CallToAction id="careers" />
            <GithubIndicator />
            <SiteFooter />
            <EmailPopup /> {/* P97bd */}
        </>
    );
}
