import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 150 50"
    {...props}
  >
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D946EF" />
        <stop offset="100%" stopColor="#A855F7" />
      </linearGradient>
    </defs>
    <text
      x="10"
      y="45"
      fontFamily="serif"
      fontSize="50"
      fontWeight="bold"
      fill="url(#grad)"
    >
      I
    </text>
    <text
      x="45"
      y="42"
      fontFamily="cursive"
      fontSize="30"
      fill="currentColor"
    >
      vish
    </text>
  </svg>
);

export default Logo;
