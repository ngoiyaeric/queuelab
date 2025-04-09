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
            <Link href="#features" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                <Feather className="size-6" />
                Products
            </Link>
            <Link href="#pricing" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                <Wallet2 className="size-6" />
                Pricing
            </Link>
            <Link href="#careers" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                <Newspaper className="size-6" />
                Research
            </Link>
            <Link href="/reads" className="flex items-center gap-3 text-white/70 hover:text-white transition">
                <Newspaper className="size-6" />
                Reads
            </Link>
        </nav>
    </div>
</SheetContent>
