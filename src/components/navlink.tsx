"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

type NavLinkProps = {
  href: string;
  name: string;
  pathname: string;
};

function NavLink({ href, name, pathname }: NavLinkProps): JSX.Element {
  return (
    <li
      className={cn(
        "pt-3 text-sm font-medium uppercase hover:text-primary",
        pathname === href && "text-primary",
      )}
    >
      <Link href={href}>{name}</Link>
    </li>
  );
}

export default NavLink;
