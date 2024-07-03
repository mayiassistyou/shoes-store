"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  name: string;
  onClick?: () => void;
};

function NavLink({ href, name, onClick }: NavLinkProps): JSX.Element {
  const pathname = usePathname();

  return (
    <li
      className={cn(
        "pt-3 text-sm font-medium uppercase hover:text-primary",
        pathname === href && "text-primary",
      )}
    >
      <Link href={href} onClick={onClick}>
        {name}
      </Link>
    </li>
  );
}

export default NavLink;
