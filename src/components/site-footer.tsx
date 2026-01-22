import SiteLogo from "@/assets/logo.svg";
import Link from "next/link";

export default function SiteFooter() {
    return (
        <>
            <footer className="py-6 md:px-8 md:py-0 border-t-2 border-foreground/20 bg-background">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">

                    <section className={"flex items-center gap-3"}>
                        <div className={"border border-foreground/20 size-8 rounded-lg inline-flex items-center justify-center"}>
                            <SiteLogo className={"size-6 h-auto brightness-0"}/>
                        </div>
                        <p className={"font-medium text-foreground"}>QCX</p>
                    </section>

                    <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2 md:items-baseline">
                        <Link href="https://tally.so/r/wADZ4o" className="text-sm text-foreground/70 hover:underline">
                            Privacy and Terms
                        </Link>

                        <p className="text-balance text-center text-sm leading-loose text-foreground/70 md:text-left">
                            ©️ 2025 QueueCX, Inc. All rights reserved. Built by <a
                            href={"https://discord.gg/NqGY9EWjWj"}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4 text-foreground"
                        >
                            QueueLab
                        </a>
                            .
                        </p>
                    </div>
                    <p className="text-sm text-foreground/70">CLASSIFIED RESEARCH</p>
                </div>
            </footer>
        </>
    )
}
