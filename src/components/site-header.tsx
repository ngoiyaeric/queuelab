"use client"

import Link from "next/link";
import SiteLogo from "@/assets/logo.svg";
import { Feather, MenuIcon, Newspaper, Wallet2, BookOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react"; // useEffect Added
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalTrigger } from "@/components/ui/modal";
import { useAuth } from '@/components/auth-provider'; // New import
import { AuthForm } from '@/components/auth-form';   // New import
import { ActionButton } from '@/components/action-button';

interface SiteHeaderProps {
  readsCount?: number;
}

export default function SiteHeader({ readsCount }: SiteHeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
    const { user, loading: authLoading, signOut } = useAuth(); // Get auth state

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
                                <Link href="/#careers" className="text-white/70 hover:text-white transition">Research</Link>
                                <Link href="/reads" className="text-white/70 hover:text-white transition">
                                  Reads {readsCount && readsCount > 0 ? `(${readsCount})` : ''}
                                </Link>
                            </nav>
                        </section>
                        <section className="flex max-md:gap-4 items-center">
                            {authLoading ? (
                                <Button variant="default" size="sm" className="book-demo-button" disabled>
                                    Loading...
                                </Button>
                            ) : user ? (
                                <Button variant="outline" size="sm" onClick={signOut} className="logout-button">
                                    Logout
                                </Button>
                            ) : (
                                <Modal open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen}>
                                    <ModalTrigger asChild>
                                        <ActionButton label="Queue-In/Up" href="#" className="book-demo-button" />
                                    </ModalTrigger>
                                    <ModalContent className="bg-black/60 backdrop-blur-lg border border-white/20 text-white p-0">
                                        <AuthForm /> {/* Replace InterestForm with AuthForm */}
                                    </ModalContent>
                                </Modal>
                            )}
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
                                            <Link href="/#careers" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                                                <Newspaper className="size-6" />
                                                Research
                                            </Link>
                                            <Link href="/reads" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                                                <Newspaper className="size-6" />
                                                Reads {readsCount && readsCount > 0 ? `(${readsCount})` : ''}
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
