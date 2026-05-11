import Link from 'next/link';

interface LogoProps {
  className?: string;
  href?: string;
}

export default function Logo({ className = '', href }: LogoProps) {
  const logoSvg = (
    <svg
      className={`h-8 w-auto ${className}`}
      viewBox="0 0 120 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="LOCKIT self storage"
    >
      <rect x="0" y="0" width="32" height="32" rx="6" fill="url(#brand-gradient)" />
      <path
        d="M8 8h4v12h8v4H8V8z"
        fill="white"
      />
      <text
        x="40"
        y="22"
        fill="currentColor"
        fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
        fontWeight="800"
        fontSize="18"
      >
        LOCKIT
      </text>
      <defs>
        <linearGradient id="brand-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#88C22A" />
          <stop offset="1" stopColor="#6BA31E" />
        </linearGradient>
      </defs>
    </svg>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center">
        {logoSvg}
      </Link>
    );
  }

  return logoSvg;
}
