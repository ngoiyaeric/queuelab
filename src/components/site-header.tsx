"use client"

import Link from "next/link";
import Image from "next/image";
import QIcon from "@/assets/q-logo.png";
import { Home, MenuIcon, Newspaper, Wallet2, BookOpen, Calendar, Globe, CloudSun } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ActionButton } from '@/components/action-button';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

interface SiteHeaderProps {
  rdCount?: number;
}

export default function SiteHeader({ rdCount }: SiteHeaderProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="py-4 border-b max-md:backdrop-blur md:border-none sticky top-0 z-50">
                <div className="container max-md:px-4">
                    <div className="flex items-center justify-between md:border md:p-2.5 md:rounded-xl max-w-3xl mx-auto md:backdrop-blur">
                        {/* Mobile: logo on the left */}
                        <Link href="/" className="md:hidden">
                            <div className="inline-flex items-center justify-center p-2 rounded-xl bg-white/50 backdrop-blur-md border border-black/5 hover:bg-white/80 transition shadow-sm">
                                <Image src={QIcon} alt="QCX Logo" width={56} height={56} className="h-auto" />
                            </div>
                        </Link>
                        {/* Desktop: left nav items */}
                        <section className="max-md:hidden">
                            <nav className="flex gap-8 items-center text-sm">
                                <Link href="/#features" className="text-muted-foreground hover:text-foreground transition">Products</Link>
                                <Link href="/#pricing" className="text-muted-foreground hover:text-foreground transition">Pricing</Link>
                                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition">Careers</Link>
                            </nav>
                        </section>
                        {/* Desktop: center logo between Careers and Reads */}
                        <Link href="/" className="max-md:hidden">
                            <div className="inline-flex items-center justify-center p-2 rounded-xl bg-white/50 backdrop-blur-md border border-black/5 hover:bg-white/80 transition shadow-sm">
                                <Image src={QIcon} alt="QCX Logo" width={56} height={56} className="h-auto" />
                            </div>
                        </Link>
                        <section className="flex items-center gap-4">
                            {/* Desktop: right nav items */}
                            <nav className="max-md:hidden flex gap-8 items-center text-sm">
                                <Link href="/rd" className="text-muted-foreground hover:text-foreground transition">
                                  Reads {rdCount && rdCount > 0 ? `(${rdCount})` : ''}
                                </Link>
                                <Link href="https://climate.stripe.com/3OeWSf" className="text-muted-foreground hover:text-foreground transition" target="_blank">Environment</Link>
                            </nav>

                            <div className="flex items-center gap-4">
                                <SignedOut>
                                    <SignUpButton mode="modal">
                                        <ActionButton label="Queue Up" className="book-demo-button" />
                                    </SignUpButton>

                                <SignedIn>
                                    <Button variant="outline" size="sm" className="dashboard-button" asChild>
                                        <Link href="/dashboard">Dashboard</Link>
                                    </Button>
                                    <UserButton />
                                </SignedIn>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link href="https://cal.com/ericngoiya" target="_blank">
                                    <Calendar className="size-9 p-2 border rounded-lg hover:text-muted-foreground transition" />
                                </Link>
                            </div>
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger>
                                    <MenuIcon className="size-9 md:hidden hover:text-muted-foreground transition" />
                                </SheetTrigger>
                                <SheetContent side="top" className="p-8">
                                    <div className="inline-flex items-center center gap-3">
                                        <div className="inline-flex items-center justify-center">
                                            <Image src={QIcon} alt="QCX Logo" width={32} height={32} className="h-auto" />
                                        </div>
                                        <p className="font-bold">QCX</p>
                                    </div>
                                    <div className="mt-8 mb-4">
                                        <nav className="grid gap-4 items-center text-lg">
                                            <Link href="/" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition">
                                                <Home className="size-6" />
                                                Home
                                            </Link>
                                            <Link href="/#features" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition">
                                                <Globe className="size-6" />
                                                Products
                                            </Link>
                                            <Link href="/#pricing" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition">
                                                <Wallet2 className="size-6" />
                                                Pricing
                                            </Link>
                                            <Link href="/careers" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition">
                                                <Newspaper className="size-6" />
                                                Careers
                                            </Link>
                                            <Link href="/rd" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition">
                                                <BookOpen className="size-6" />
                                                Reads
                                            </Link>
                                            <Link href="https://climate.stripe.com/3OeWSf" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition" target="_blank">
                                                <CloudSun className="size-6" />
                                                Environment
                                            </Link>
                                            <SignedOut>
                                                <SignInButton mode="modal">
                                                    <Button variant="outline" className="w-full">Sign In</Button>
                                                </SignInButton>
                                                <SignUpButton mode="modal">
                                                    <Button className="w-full">Sign Up</Button>
                                                </SignUpButton>
                                            </SignedOut>
                                            <SignedIn>
                                                <Link href="/dashboard" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition">
                                                    Dashboard
                                                </Link>
                                                <div className="flex items-center gap-3">
                                                    <UserButton />
                                                    <span className="text-muted-foreground">Profile</span>
                                                </div>
                                            </SignedIn>
                                        </nav>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </section>
                    </div>
                </div>
            </header>
        </>
    );
}
