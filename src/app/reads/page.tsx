import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { CallToAction } from "@/components/call-to-action";

export default function ReadsPage() {
    return (
        <>
            <SiteHeader />
            <section className="py-20 md:py-24">
                <div className="container">
                    <h2 className="text-5xl tracking-tighter text-center font-medium">
                        Our Research
                    </h2>
                    <div className="text-center text-lg md:text-xl text-white/70 tracking-tight px-4 mt-5">
                        <p>
                            We work on applied research in artificial intelligence on nature and computation.
                            Our patent-pending research and products.
                        </p>

                        <h2 className="text-xl md:text-2xl text-white font-bold mt-5">
                            Environment Aware Agents
                        </h2>
                        <p>
                            A highly concurrent multi-agent orchestration framework for extensive context switching
                            and context continuity, designed for automated natural science research and integration within our products.
                        </p>

                        <h2 className="text-xl md:text-2xl text-white font-bold mt-5">
                            Fluidity Index
                        </h2>
                        <p>
                            Next-generation multi-agent superintelligence benchmarks.
                        </p>
                    </div>
                    <div className="mt-8">
                        <div className="border border-muted p-6 rounded-xl mb-4">
                            <h3 className="text-2xl font-semibold">Article 1</h3>
                            <p className="text-lg mt-2">This is a brief description of the first article.</p>
                        </div>
                        <div className="border border-muted p-6 rounded-xl mb-4">
                            <h3 className="text-2xl font-semibold">Article 2</h3>
                            <p className="text-lg mt-2">This is a brief description of the second article.</p>
                        </div>
                        <div className="border border-muted p-6 rounded-xl mb-4">
                            <h3 className="text-2xl font-semibold">Article 3</h3>
                            <p className="text-lg mt-2">This is a brief description of the third article.</p>
                        </div>
                    </div>
                </div>
            </section>
            <CallToAction id="careers" />
            <SiteFooter />
        </>
    );
}
