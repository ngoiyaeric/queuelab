import SiteHeader from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { LogoTicker } from "@/components/logo-ticker";
import SiteFooter from "@/components/site-footer";
import  CallToAction  from "@/components/call-to-action";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { GithubIndicator } from "@/components/github-indicator";
import { PricingSection } from "@/components/pricing-section";
import { FramerCopilotSection } from "@/components/framer-copilots-section";
import { AnimatedText } from "@/components/animated-text";

export default function Home() {
    return (
        <>
            <SiteHeader />
            <AnimatedText />
            <HeroSection />
            <LogoTicker />
            <Features id="features" />
            <FramerCopilotSection />
            <Testimonials id = "testimonials"/>
            <PricingSection id="pricing" />
            <CallToAction id="call-to-action" />
            <GithubIndicator />
            <SiteFooter />
        </>
    );
}
