import Link from "next/link";
import React from "react";

interface ActionButtonProps {
  label: string;
  href?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function ActionButton({ label, href, className, onClick }: ActionButtonProps) {
  const buttonContent = (
    <div className={"relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#1a1a1a] to-[#333333] shadow-[0px_0px_12px_#0000FF]"}>
      <div className={"absolute inset-0 rounded-lg"}>
        <div className={"absolute inset-0 border rounded-lg border-white/20 [mask-image:linear-gradient(to_bottom,black,transparent)]"} />
        <div className={"absolute inset-0 border rounded-lg border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]"} />
        <div className={"absolute inset-0 rounded-lg shadow-[0_0_10px_rgb(0,0,255,0.7)_inset]"} />
      </div>
      <span className={"text-[#7CFC00]"}>{label}</span>
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {buttonContent}
      </button>
    );
  }

  if (href) {
    return (
      <Link href={href} className={className}>
        {buttonContent}
      </Link>
    );
  }

  // Default or error case: Render a disabled button if neither href nor onClick is provided
  return (
    <button disabled className={className}>
      {buttonContent}
    </button>
  );
}
