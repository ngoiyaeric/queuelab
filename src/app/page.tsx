import SiteHeader from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { LogoTicker } from "@/components/logo-ticker";
import SiteFooter from "@/components/site-footer";
import dynamic from "next/dynamic";
import { EarthDayCountdown } from "@/components/earth-day-countdown";

// Dynamically import heavy sections below the fold
const Features = dynamic(() => import("@/components/features").then(mod => mod.Features));
const FramerCopilotSection = dynamic(() => import("@/components/framer-copilots-section").then(mod => mod.FramerCopilotSection));
const Testimonials = dynamic(() => import("@/components/testimonials").then(mod => mod.Testimonials));
const PricingSection = dynamic(() => import("@/components/pricing-section").then(mod => mod.PricingSection));
const CallToAction = dynamic(() => import("@/components/call-to-action"));
const GithubIndicator = dynamic(() => import("@/components/github-indicator").then(mod => mod.GithubIndicator));

export default function Home() {
    return (
        <>
            <EarthDayCountdown />
            <SiteHeader />
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
