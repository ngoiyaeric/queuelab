import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { CallToAction } from "@/components/call-to-action";

export default function ReadsPage() {
    return (
        <>
            <SiteHeader />
            <section className="py-20 md:py-24">
                <div className="container">
                    <details className="mb-8">
                        <summary className="text-5xl tracking-tighter text-center font-medium cursor-pointer">
                            Queue CX
                        </summary>
                        <div className="text-center text-sm text-white/50 mt-2">
                            April 09, 2025
                        </div>
                        <div className="text-center text-lg md:text-xl text-white/70 tracking-tight px-4 mt-5">
                            <p>
                                We’re an applied research artificial intelligence startup working at the intersection of nature and computation.
                            </p>
                            <p>
                                Inspired by the queue—a fundamental data structure reflecting the natural flow of life and entropy—our systems thinking is rooted in this concept, driving us to prioritize quality throughout our ecosystem. Quality forms the core of our value proposition, delivering exceptional customer experiences across our computational platforms. We pioneer innovative technologies grounded in nature’s first principles to power our cutting-edge systems.
                            </p>
                        </div>
                    </details>

                    <details className="mb-8">
                        <summary className="text-5xl tracking-tighter text-center font-medium cursor-pointer">
                            Environment Aware
                        </summary>
                        <div className="text-center text-sm text-white/50 mt-2">
                            April 09, 2025
                        </div>
                        <div className="text-center text-lg md:text-xl text-white/70 tracking-tight px-4 mt-5">
                            <p>
                                Our human species has been organizing itself in groups for a millennium to enable streamlined coordination and communication for goal planning to ensure survival. We’ve created top-down scales of hierarchies spanning from family units to villages to entire countries and even groups of countries to carry out large-scale long-horizon plans to streamline resource utilization and improve our experience on this planet.
                            </p>
                            <p>
                                This collective awareness of our environment ensures prompt error correction and predictions of potential threats through extensive inter-agent communication and context switching between sparse knowledge to identify root causes and plan for long-term mitigation for the context continuity and survival of our species.
                            </p>
                            <p>
                                Our collective intelligence is crucial and paramount to enhancing our individual experience, and we’ve innovated and evolved since then to better propagate and disseminate distributed knowledge. Often, societies that have failed to connect sparse pieces of information to garner knowledge, create oversight on root causes as well as have foresight, have or will perish. This is merely not a matter of collective agreement but propagation of information efficiently enough for conjecture and error correction to influence large-scale and long-horizon solutions.
                            </p>
                            <p>
                                Replenishing seems to be a central recurring indicator for flourishing societies, as the knowledge of depleting resources propagated with enough throughput onto the geographically distributed group of people as a result of being environment aware.
                            </p>
                            <p>
                                As we continue to evolve into our digital environment, we diverge further from our physical one—spending increasing amounts of time indoors on our devices and having decreasing access and oversight on our physical environment - this is fluidity overload. Democratizing and integrating access to environment forecasts and digital replenishing into our explorative systems is a great start to enhancing our experience as we become increasingly interconnected at the digital layer.
                            </p>
                        </div>
                    </details>
                </div>
            </section>
            <SiteFooter />
        </>
    );
}
