"use client";

import SiteHeader from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { LogoTicker } from "@/components/logo-ticker";
import SiteFooter from "@/components/site-footer";
import CallToAction from "@/components/call-to-action";
import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { GithubIndicator } from "@/components/github-indicator";
import { PricingSection } from "@/components/pricing-section";
import { FramerCopilotSection } from "@/components/framer-copilots-section";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, initializing } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initializing && user) {
      router.push("/dashboard");
    }
  }, [user, initializing, router]);

  if (initializing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <>
      <SiteHeader />
      <div className="season-font">
        <Link
          href="https://arxiv.org/abs/2510.20636"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1>Artificial General Intelligence</h1>
        </Link>
      </div>
      <HeroSection />
      <LogoTicker />
      <Features id="features" />
      <FramerCopilotSection />
      <Testimonials id="testimonials" />
      <PricingSection id="pricing" />
      <CallToAction id="call-to-action" />
      <GithubIndicator />
      <SiteFooter />
    </>
  );
}
