import Link from "next/link";

export function ActionButton({ label, href, className }: { label: string; href: string; className?: string }) {
  return (
    <Link href={href} className={className}>
      <button className={"relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#1a1a1a] to-[#333333] shadow-[0px_0px_12px_#0000FF]"}>
        <div className={"absolute inset-0 rounded-lg"}>
          <div className={"absolute inset-0 border rounded-lg border-white/20 [mask-image:linear-gradient(to_bottom,black,transparent)]"} />
          <div className={"absolute inset-0 border rounded-lg border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]"} />
          <div className={"absolute inset-0 rounded-lg shadow-[0_0_10px_rgb(0,0,255,0.7)_inset]"} />
        </div>
        <span className={"text-[#7CFC00]"}>{label}</span>
      </button>
    </Link>
  );
}
