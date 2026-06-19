import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ActionButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export const ActionButton = ({ label, className, onClick, href }: ActionButtonProps) => {
  const isGlassmorphic = label.toLowerCase() === "queue up" || label.toLowerCase() === "core";

  const content = (
    <Button
      variant={isGlassmorphic ? "outline" : "default"}
      className={cn(
        "rounded-full px-6 py-2 font-medium transition-all active:scale-95",
        isGlassmorphic
          ? "bg-white/40 backdrop-blur-md border-white/50 text-foreground shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:bg-white/60"
          : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md",
        className
      )}
      onClick={onClick}
    >
      {label}
    </Button>
  );

  if (href) {
    return (
      <Link href={href} target={href.startsWith('http') ? '_blank' : undefined} className="contents">
        {content}
      </Link>
    );
  }

  return content;
};
