"use client"

import Link from "next/link";
import Image from "next/image";
import SiteLogo from "@/assets/logo.svg";
import QIcon from "@/assets/logo-q-icon.png";
import { Home, MenuIcon, Newspaper, Wallet2, BookOpen, Calendar, Globe, CloudSun, LayoutDashboard, LogOut, Database } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalTrigger } from "@/components/ui/modal";
import { useAuth } from '@/components/auth-provider';
import { AuthForm } from '@/components/auth-form';
import { ActionButton } from '@/components/action-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SiteHeaderProps {
  rdCount?: number;
}

export default function SiteHeader({ rdCount }: SiteHeaderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
    const { user, initializing: authLoading, signOut } = useAuth();

    useEffect(() => {
        if (user && isDemoModalOpen) {
            setIsDemoModalOpen(false);
        }
    }, [user, isDemoModalOpen, setIsDemoModalOpen]);

    const handleSignOut = async () => {
        await signOut();
    };

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
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <div className="flex items-center gap-2 cursor-pointer group">
                                                {user.user_metadata?.avatar_url ? (
                                                    <Image
                                                        src={user.user_metadata.avatar_url}
                                                        alt="User avatar"
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full border-2 border-white/20 transition-all duration-300 group-hover:border-white/40 group-hover:shadow-lg group-hover:shadow-blue-500/50"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold border-2 border-white/20 transition-all duration-300 group-hover:border-white/40 group-hover:shadow-lg group-hover:shadow-purple-500/50">
                                                        {user.email?.[0]?.toUpperCase() || 'U'}
                                                    </div>
                                                )}
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            <div className="px-2 py-2">
                                                <p className="text-sm font-medium text-white">
                                                    {user.user_metadata?.full_name || user.email}
                                                </p>
                                                <p className="text-xs text-white/60 truncate">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => window.location.href = '/dashboard'}>
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                <span>Dashboard</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => window.location.href = '/base'}>
                                                <Database className="mr-2 h-4 w-4" />
                                                <span>base</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={handleSignOut} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200">
                                                <LogOut className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />
                                                <span className="font-medium">Queue Out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
                                            {user.user_metadata?.avatar_url ? (
                                                <Image
                                                    src={user.user_metadata.avatar_url}
                                                    alt="User avatar"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                                                    {user.email?.[0]?.toUpperCase() || 'U'}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold">{user.user_metadata?.full_name || user.email}</p>
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
                                            {user && (
                                                <>
                                                    <Link href="/base" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                                                        <Database className="size-6" />
                                                        base
                                                    </Link>
                                                    <button onClick={handleSignOut} className="flex items-center gap-3 text-red-400 hover:text-red-300 transition">
                                                        <LogOut className="size-6" />
                                                        Queue Out
                                                    </button>
                                                </>
                                            )}
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
