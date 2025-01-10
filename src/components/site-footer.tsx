import SiteLogo from "@/assets/logo.svg";
import Link from "next/link";

export default function SiteFooter() {
    return (
        <>
            <footer className="py-6 md:px-8 md:py-0 border-t-2">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">

                    <section className={"flex items-center gap-3"}>
                        <div className={"border size-8 rounded-lg inline-flex items-center justify-center"}>
                            <SiteLogo className={"size-6 h-auto"}/>
                        </div>
                        <p className={"font-medium"}>QCX</p>
                    </section>

                    <Link href="https://tally.so/r/wADZ4o" className="text-sm text-muted-foreground hover:underline">
                        Privacy and Terms
                    </Link>

                    <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                        ©️ 2024 QCX, All rights reserved. Built by <a
                        href={"https://discord.gg/NqGY9EWjWj"}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        QueueLab
                    </a>
                        .
                    </p>
                </div>
            </footer>
        </>
    )
}
