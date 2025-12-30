"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface DropdownMenuSeparatorProps {
  className?: string;
}

const DropdownMenuContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  );
}

export function DropdownMenuTrigger({
  children,
  asChild,
}: DropdownMenuTriggerProps) {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext);
  const triggerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
      {children}
    </div>
  );
}

export function DropdownMenuContent({
  children,
  align = "end",
  className,
}: DropdownMenuContentProps) {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext);

  if (!isOpen) return null;

  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  };

  return (
    <div
      className={cn(
        "absolute z-50 mt-2 min-w-[12rem] overflow-hidden rounded-md border border-white/10 bg-gray-900/95 backdrop-blur-lg p-1 shadow-lg",
        alignmentClasses[align],
        className
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  onClick,
  className,
}: DropdownMenuItemProps) {
  const { setIsOpen } = React.useContext(DropdownMenuContext);

  const handleClick = () => {
    onClick?.();
    setIsOpen(false);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none transition-colors hover:bg-white/10 focus:bg-white/10 focus:text-white",
        className
      )}
    >
      {children}
    </button>
  );
}

export function DropdownMenuSeparator({
  className,
}: DropdownMenuSeparatorProps) {
  return (
    <div
      className={cn("my-1 h-px bg-white/10", className)}
      role="separator"
      aria-orientation="horizontal"
    />
  );
}
