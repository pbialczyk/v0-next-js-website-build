'use client';

import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  href?: string;
  variant?: 'color' | 'light';
}

export function Logo({ className = '', href, variant = 'color' }: LogoProps) {
  const logoSrc = variant === 'light' 
    ? '/logo/lockit-logo-light-360.webp'
    : '/logo/lockit-logo-color-360.webp';

  const logoImage = (
    <Image
      src={logoSrc}
      alt="LOCKIT Self Storage"
      width={180}
      height={48}
      className={`h-8 sm:h-10 w-auto ${className}`}
      priority
    />
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center shrink-0">
        {logoImage}
      </Link>
    );
  }

  return logoImage;
}

export default Logo;
