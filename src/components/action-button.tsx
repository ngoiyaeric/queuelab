import Link from "next/link";
import React from "react"; // Import React for JSX spread and ButtonHTMLAttributes

// Define props interface, making href optional and including ButtonHTMLAttributes
interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  href?: string;
  // className is part of ButtonHTMLAttributes but can be explicitly listed for clarity if needed
}

export function ActionButton({ label, href, className, type = "button", ...props }: ActionButtonProps) {
  // Internal classes for the button's consistent appearance
  const buttonInternalClass = "relative py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#1a1a1a] to-[#333333] shadow-[0px_0px_12px_#0000FF]";

  // JSX for the visual elements inside the button (icons, text, etc.)
  const buttonVisuals = (
    <>
      <div className={"absolute inset-0 rounded-lg"}>
        <div className={"absolute inset-0 border rounded-lg border-white/20 [mask-image:linear-gradient(to_bottom,black,transparent)]"} />
        <div className={"absolute inset-0 border rounded-lg border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]"} />
        <div className={"absolute inset-0 rounded-lg shadow-[0_0_10px_rgb(0,0,255,0.7)_inset]"} />
      </div>
      <span className={"text-[#7CFC00]"}>{label}</span>
    </>
  );

  // If href is provided and it's not "#", render as a Next.js Link wrapping a button.
  // This is for actual navigation.
  if (href && href !== "#") {
    return (
      <Link href={href} className={className} passHref>
        {/* passHref ensures the <a> tag gets the href, important for accessibility and SEO */}
        {/* The `className` from ActionButtonProps applies to the Link element */}
        <button className={buttonInternalClass} type={type} {...props}>
          {/* Inner button gets its fixed styling plus any other HTML button props passed down */}
          {buttonVisuals}
        </button>
      </Link>
    );
  } else {
    // If href is "#" or not provided, render as a standalone button.
    // This is for cases like modal triggers where button semantics are needed without navigation.
    // The `className` from ActionButtonProps is combined with internal button styling.
    // All other ButtonHTMLAttributes (like onClick, disabled, etc.) are spread here.
    return (
      <button
        className={className ? `${className} ${buttonInternalClass}` : buttonInternalClass}
        type={type} // Default type is "button" to prevent accidental form submissions
        {...props} // Spread other props like onClick, disabled, aria-* etc.
      >
        {buttonVisuals}
      </button>
    );
  }
}
