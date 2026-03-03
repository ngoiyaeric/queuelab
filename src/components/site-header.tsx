"use client"

import Link from "next/link";
import Image from "next/image";
import SiteLogo from "@/assets/logo.svg";
import QIcon from "@/assets/new-logo.png";
import { Home, MenuIcon, Newspaper, Wallet2, BookOpen, Calendar, Globe, CloudSun } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react"; // useEffect Added
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalTrigger } from "@/components/ui/modal";
import { useAuth } from '@/components/auth-provider'; // New import
import { AuthForm } from '@/components/auth-form';   // New import
import { ActionButton } from '@/components/action-button';

interface SiteHeaderProps {
  rdCount?: number;
}

export default function SiteHeader({ rdCount }: SiteHeaderProps) {
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
            <header className="py-4 border-b max-md:backdrop-blur md:border-none sticky top-0 z-50">
                <div className="container max-md:px-4">
                    <div className="flex items-center justify-between md:border md:p-2.5 md:rounded-xl max-w-2xl mx-auto md:backdrop-blur">
                        <Link href="/">
                            <div className="inline-flex items-center justify-center p-2 rounded-xl bg-white/50 backdrop-blur-md border border-black/5 hover:bg-white/80 transition shadow-sm">
                                <Image src={QIcon} alt="QCX Logo" width={56} height={56} className="h-auto" />
                            </div>
                        </Link>
                        <section className="max-md:hidden">
                            <nav className="flex gap-8 items-center text-sm">
                                <Link href="/#features" className="text-muted-foreground hover:text-foreground transition">Products</Link>
                                <Link href="/#pricing" className="text-muted-foreground hover:text-foreground transition">Pricing</Link>
                                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition">Careers</Link>
                                <Link href="/rd" className="text-muted-foreground hover:text-foreground transition">
                                  Reads {rdCount && rdCount > 0 ? `(${rdCount})` : ''}
                                </Link>
                                <Link href="https://climate.stripe.com/3OeWSf" className="text-muted-foreground hover:text-foreground transition" target="_blank">Environment</Link>
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
                                        <ActionButton label="Queue Up" href="https://www.qcx.world" target="_blank" className="book-demo-button" onClick={(e) => {
                                            e.preventDefault();
                                            setIsDemoModalOpen(true);
                                        }} />
                                    </ModalTrigger>
                                    <ModalContent className="bg-background/80 backdrop-blur-lg border border-border text-foreground p-0">
                                        <AuthForm />
                                    </ModalContent>
                                </Modal>
                            )}
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
