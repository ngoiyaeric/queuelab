"use client"

import Link from "next/link";
import SiteLogo from "@/assets/logo.svg";
import { Feather, MenuIcon, Newspaper, Wallet2, BookOpen, Calendar } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalTrigger } from "@/components/ui/modal";
import { useAuth } from '@/components/auth-provider';
import { AuthForm } from '@/components/auth-form';
import { ActionButton } from '@/components/action-button';

interface SiteHeaderProps {
  researchCount?: number;
}

export default function SiteHeader({ researchCount }: SiteHeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
    const [researchClicked, setResearchClicked] = useState(false);
    const { user, loading: authLoading, signOut } = useAuth();

    // Load the clicked state from localStorage on mount
    useEffect(() => {
        const clicked = localStorage.getItem('researchClicked') === 'true';
        setResearchClicked(clicked);
    }, []);

    // Handle Research link click
    const handleResearchClick = () => {
        localStorage.setItem('researchClicked', 'true');
        setResearchClicked(true);
    };

    useEffect(() => {
        if (user && isDemoModalOpen) {
            setIsDemoModalOpen(false);
        }
    }, [user, isDemoModalOpen, setIsDemoModalOpen]);

    return (
        <>
            <header className="py-4 border-b max-md:backdrop-blur md:border-none sticky top-0 z-10">
                <div className="container max-md:px-4">
                    <div className="flex items-center justify-between md:border md:p-2.5 md:rounded-xl max-w-2xl mx-auto md:backdrop-blur">
                        <Link href="/">
                            <div className="border size-10 rounded-lg inline-flex items-center justify-center block">
                                <SiteLogo className="size-8 h-auto" />
                            </div>
                        </Link>
                        <section className="max-md:hidden">
                            <nav className="flex gap-8 items-center text-sm">
                                <Link href="/#features" className="text-white/70 hover:text-white transition">Products</Link>
                                <Link href="/#pricing" className="text-white/70 hover:text-white transition">Pricing</Link>
                                <Link href="/careers" className="text-white/70 hover:text-white transition">Careers</Link>
                                <Link href="/research" onClick={handleResearchClick} className="text-white/70 hover:text-white transition">
                                  Research {researchCount && researchCount > 0 ? `(${researchCount}${!researchClicked ? '*' : ''})` : ''}
                                </Link>
                            </nav>
                        </section>
                        <section className="flex max-md:gap-4 items-center">
                            <div className="flex items-center gap-2">
                                <ActionButton label="Queue Up" href="https://www.qcx.world" className="book-demo-button" />
                                <Link href="https://cal.com/ericngoiya" target="_blank">
                                    <Calendar className="size-9 p-2 border rounded-lg hover:text-white/70 transition" />
                                </Link>
                            </div>
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger>
                                    <MenuIcon className="size-9 md:hidden hover:text-white/70 transition" />
                                </SheetTrigger>
                                <SheetContent side="top" className="p-8">
                                    <div className="inline-flex items-center center gap-3">
                                        <div className="border size-8 rounded-lg inline-flex items-center justify-center">
                                            <SiteLogo className="size-6 h-auto" />
                                        </div>
                                        <p className="font-bold">QCX</p>
                                    </div>
                                    <div className="mt-8 mb-4">
                                        <nav className="grid gap-4 items-center text-lg">
                                            <Link href="/" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                                                <Feather className="size-6" />
                                                Home
                                            </Link>
                                            <Link href="/#features" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                                                <Feather className="size-6" />
                                                Products
                                            </Link>
                                            <Link href="/#pricing" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                                                <Wallet2 className="size-6" />
                                                Pricing
                                            </Link>
                                            <Link href="/careers" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                                                <Newspaper className="size-6" />
                                                Careers
                                            </Link>
                                            <Link href="/research" onClick={handleResearchClick} className="flex items-center gap-3 text-white/70 hover:text-white transition">
                                                <Newspaper className="size-6" />
                                                Research {researchCount && researchCount > 0 ? `(${researchCount}${!researchClicked ? '*' : ''})` : ''}
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
    );
}
