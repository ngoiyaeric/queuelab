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
}

export function AddFunds({ className }: AddFundsProps) {
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

  return (
    <div className={cn("relative overflow-hidden rounded-[2rem] border border-white/40 shadow-xl bg-white/20 backdrop-blur-md p-8", className)}>
      <h3 className="text-xl font-semibold text-foreground/70 mb-6">Add Funds</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {PRESET_AMOUNTS.map((val) => (
          <Button
            key={val}
            variant="outline"
            className="bg-white/30 border-white/40 hover:bg-white/50"
            onClick={() => handlePresetClick(val)}
          >
            ${val}
          </Button>
        ))}
      </div>

      <form onSubmit={handleCheckout} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="custom-amount" className="text-foreground/60 text-sm">Custom Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 font-medium">$</span>
            <Input
              id="custom-amount"
              type="number"
              min="1"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-7 bg-white/30 border-white/40"
              disabled={isLoading}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading || !amount || parseFloat(amount) <= 0}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Preparing...
            </>
          ) : (
            "Continue to Checkout"
          )}
        </Button>
      </form>
    </div>
  );
}
