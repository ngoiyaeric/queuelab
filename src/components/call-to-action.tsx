"use client"

import Link from "next/link";
import SiteLogo from "@/assets/logo.svg"
import { Feather, MenuIcon, Newspaper, Wallet2, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react";
import { ActionButton } from "@/components/action-button";

export default function SiteHeader() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <header className={"py-4 border-b max-md:backdrop-blur md:border-none sticky top-0 z-10"}>
                <div className={"container max-md:px-4"}>
                    <div className={"flex items-center justify-between md:border md:p-2.5 md:rounded-xl max-w-2xl mx-auto md:backdrop-blur "}>
                        <Link href={"/"}>
                            <div className={"border size-10 rounded-lg inline-flex items-center justify-center"}>
                                <SiteLogo className={"size-8 h-auto"} />
                            </div>
                        </Link>
                        <section className={"max-md:hidden"}>
                            <nav className={"flex gap-8 items-center text-sm"}>
                                <div className="relative group">
                                    <Link 
                                        href={"#features"}
                                        className="flex items-center gap-1 text-white/70 hover:text-white transition"
                                    >
                                        Products
                                        <ChevronDown className="size-4" />
                                    </Link>
                                    <div className="absolute top-full left-0 mt-2 bg-black text-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <Link 
                                            href="https://planet.queue.cx" 
                                            className="block px-4 py-2 hover:bg-gray-800"
                                        >
                                            Planet
                                        </Link>
                                        <Link 
                                            href="https://ea.queue.cx" 
                                            className="block px-4 py-2 hover:bg-gray-800"
                                        >
                                            Agents
                                        </Link>
                                    </div>
                                </div>
                                <Link href={"#pricing"} className={"text-white/70 hover:text-white transition"}>Pricing</Link>
                                <Link href={"#careers"} className={"text-white/70 hover:text-white transition"}>Research</Link>
                            </nav>
                        </section>
                        <section className={"flex max-md:gap-4 items-center"}>
                            <ActionButton label={"Get Started"} href={"https://tally.so/r/wkWqkd"} />
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger>
                                    <MenuIcon className={"size-9 md:hidden hover:text-white/70 transition"}/>
                                </SheetTrigger>
                                <SheetContent side={"top"} className={"p-8"}>
                                    <div className={"inline-flex items-center center gap-3"}>
                                        <div className={"border size-8 rounded-lg inline-flex items-center justify-center"}>
                                            <SiteLogo className={"size-6 h-auto"}/>
                                        </div>
                                        <p className={"font-bold"}>QCX</p>
                                    </div>
                                    <div className={"mt-8 mb-4"}>
                                        <nav className={"grid gap-4 items-center text-lg"}>
                                            <div>
                                                <Link href={"#features"} className={"flex items-center gap-3 text-white/70 hover:text-white transition"}>
                                                    <Feather className={"size-6"} />
                                                    Products
                                                </Link>
                                                <div className="ml-9 mt-2 grid gap-2">
                                                    <Link href="https://planet.queue.cx" className="text-white/70 hover:text-white transition">
                                                        Planet
                                                    </Link>
                                                    <Link href="https://ea.queue.cx" className="text-white/70 hover:text-white transition">
                                                        Agents
                                                    </Link>
                                                </div>
                                            </div>
                                            <Link href={"#pricing"} className={"flex items-center gap-3 text-white/70 hover:text-white transition"}>
                                                <Wallet2 className={"size-6"} />
                                                Pricing
                                            </Link>
                                            <Link href={"#careers"} className={"flex items-center gap-3 text-white/70 hover:text-white transition"}>
                                                <Newspaper className={"size-6"} />
                                                Research
                                            </Link>
                                        </nav>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </section>
                    </div>
                </div>
            </header>
        </>
    )
}
