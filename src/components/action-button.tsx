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
  const content = (
    <Button
      variant="default"
      className={cn(
        "bg-white/20 backdrop-blur-md border border-white/40 text-foreground hover:bg-white/35 rounded-full px-6 py-2 font-semibold transition-all shadow-[0_4px_24px_rgba(0,0,0,0.08)] active:scale-95",
        className
      )}
      onClick={onClick}

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
