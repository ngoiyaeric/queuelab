"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const PRESET_AMOUNTS = [10, 25, 50, 100];

interface AddFundsProps {
  className?: string;
  variant?: "card" | "inline";
}

export function AddFunds({ className, variant = "card" }: AddFundsProps) {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePresetClick = (val: number) => {
    setAmount(val.toString());
  };

  const handleCheckout = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: numAmount }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(false);
    }
  };

  const content = (
    <>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {PRESET_AMOUNTS.map((val) => (
          <Button
            key={val}
            type="button"
            variant="outline"
            className="bg-white/20 border-white/20 hover:bg-white/40 h-9 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              handlePresetClick(val);
            }}
          >
            ${val}
          </Button>
        ))}
      </div>

      <form
        onSubmit={handleCheckout}
        className="flex gap-2 items-end"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 space-y-1">
          <Label htmlFor="custom-amount" className="text-foreground/50 text-[10px] uppercase font-bold tracking-wider ml-1">Custom Amount</Label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-foreground/30 text-xs font-medium">$</span>
            <Input
              id="custom-amount"
              type="number"
              min="1"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-6 h-9 bg-white/20 border-white/20 text-sm focus:bg-white/30 transition-all"
              disabled={isLoading}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="h-9 px-4 text-xs font-bold bg-blue-600/80 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 transition-all shrink-0"
          disabled={isLoading || !amount || parseFloat(amount) <= 0}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Add Funds"
          )}
        </Button>
      </form>
    </>
  );

  if (variant === "inline") {
    return (
      <div className={cn("w-full", className)}>
        {content}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-[2rem] border border-white/40 shadow-xl bg-white/20 backdrop-blur-md p-8", className)}>
      <h3 className="text-xl font-semibold text-foreground/70 mb-6">Add Funds</h3>
      {content}
    </div>
  );
}
