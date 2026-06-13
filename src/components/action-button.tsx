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
        "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-2 font-medium transition-all shadow-md active:scale-95",
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
