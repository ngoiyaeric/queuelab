"use client"

import Link from "next/link";
import Image from "next/image";
import SiteLogo from "@/assets/logo.svg";
import QIcon from "@/assets/logo-q-icon.png";
import { Home, MenuIcon, Newspaper, Wallet2, BookOpen, Calendar, Globe, CloudSun, LayoutDashboard } from "lucide-react";
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
    const { user, initializing: authLoading, signOut } = useAuth(); // Get auth state

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
                            <div className="border size-10 rounded-lg inline-flex items-center justify-center block">
                                <Image src={QIcon} alt="QCX Logo" width={32} height={32} className="size-8 h-auto" />
                            </div>
                        </Link>
                        <section className="max-md:hidden">
                            <nav className="flex gap-8 items-center text-sm">
                                {user && <Link href="/dashboard" className="text-white/70 hover:text-white transition">Dashboard</Link>}
                                <Link href="/#features" className="text-white/70 hover:text-white transition">Products</Link>
                                <Link href="/#pricing" className="text-white/70 hover:text-white transition">Pricing</Link>
                                <Link href="/careers" className="text-white/70 hover:text-white transition">Careers</Link>
                                <Link href="/rd" className="text-white/70 hover:text-white transition">
                                  R&D {rdCount && rdCount > 0 ? `(${rdCount})` : ''}
                                </Link>
                                <Link href="https://climate.stripe.com/3OeWSf" className="text-white/70 hover:text-white transition" target="_blank">Climate</Link>
                            </nav>
                        </section>
                        <section className="flex max-md:gap-4 items-center">
                            {authLoading ? (
                                <Button variant="default" size="sm" className="book-demo-button" disabled>
                                    Loading...
                                </Button>
                            ) : user ? (
                                <>
                                    {user.user_metadata.avatar_url && (
                                        <Image
                                            src={user.user_metadata.avatar_url}
                                            alt="User avatar"
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                    )}
                                    <Link href="/dashboard">
                                        <Button variant="ghost" size="sm">
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <Button variant="outline" size="sm" onClick={signOut} className="logout-button">
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <Modal open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen}>
                                    <ModalTrigger asChild>
                                        <ActionButton label="Queue Up" href="https://www.qcx.world" target="_blank" className="book-demo-button" onClick={(e) => {
                                            e.preventDefault();
                                            setIsDemoModalOpen(true);
                                        }} />
                                    </ModalTrigger>
                                    <ModalContent className="bg-black/60 backdrop-blur-lg border border-white/20 text-white p-0">
                                        <AuthForm />
                                    </ModalContent>
                                </Modal>
                            )}
                            <div className="flex items-center gap-2">
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
                                            <Image src={QIcon} alt="QCX Logo" width={24} height={24} className="size-6 h-auto" />
                                        </div>
                                        <p className="font-bold">QCX</p>
                                    </div>
                                    {user && (
                                        <div className="mt-4 flex items-center gap-3">
                                            {user.user_metadata.avatar_url && (
                                                <Image
                                                    src={user.user_metadata.avatar_url}
                                                    alt="User avatar"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full"
                                                />
                                            )}
                                            <div>
                                                <p className="font-semibold">{user.user_metadata.full_name}</p>
                                                <p className="text-sm text-white/70">{user.email}</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="mt-8 mb-4">
                                        <nav className="grid gap-4 items-center text-lg">
                                            <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-3 text-white/70 hover:text-white transition">
                                                {user ? <LayoutDashboard className="size-6" /> : <Home className="size-6" />}
                                                {user ? "Dashboard" : "Home"}
                                            </Link>
                                            <Link href="/#features" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                                                <Globe className="size-6" />
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
                                            <Link href="/rd" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                                                <BookOpen className="size-6" />
                                                R&D
                                            </Link>
                                            <Link href="https://climate.stripe.com/3OeWSf" className="flex items-center gap-3 text-white/70 hover:text-white transition" target="_blank">
                                                <CloudSun className="size-6" />
                                                Climate
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
