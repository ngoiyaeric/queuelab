"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface BalanceDisplayProps {
  className?: string;
  variant?: "card" | "inline";
}

export function BalanceDisplay({ className, variant = "card" }: BalanceDisplayProps) {
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const checkoutStatus = searchParams.get("checkout");

  const fetchBalance = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/stripe/balance");
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  // Automatically refresh if redirected back after a successful checkout
  useEffect(() => {
    if (checkoutStatus === "success") {
      fetchBalance();
    }
  }, [checkoutStatus, fetchBalance]);

  if (variant === "inline") {
    return (
      <div className={cn("flex flex-col", className)}>
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Available Balance</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              fetchBalance();
            }}
            disabled={isLoading}
            className="p-1.5 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={cn("w-4 h-4 text-foreground/40", isLoading && "animate-spin")} />
          </button>
        </div>
        <div className="mt-1">
          {isLoading && balance === null ? (
            <div className="h-8 w-24 bg-foreground/10 animate-pulse rounded-md" />
          ) : (
            <span className="text-3xl font-bold text-foreground tracking-tight">
              ${balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-[2rem] border border-white/40 shadow-xl bg-white/20 backdrop-blur-md p-8 flex flex-col justify-center min-h-[160px]", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground/70">Available Balance</h3>
        <button
          onClick={fetchBalance}
          disabled={isLoading}
          className="p-2 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
          title="Refresh balance"
        >
          <RefreshCw className={cn("w-5 h-5 text-foreground/60", isLoading && "animate-spin")} />
        </button>
      </div>
      <div className="mt-4">
        {isLoading && balance === null ? (
          <div className="h-10 w-32 bg-foreground/10 animate-pulse rounded-md" />
        ) : (
          <span className="text-4xl md:text-5xl font-bold text-foreground">
            ${balance?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}
          </span>
        )}
      </div>
    </div>
  );
}
